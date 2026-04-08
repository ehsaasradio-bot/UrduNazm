"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function MFAVerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [factorId, setFactorId] = useState<string | null>(null);
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initChallenge() {
      const supabase = createClient();
      const { data: factors } = await supabase.auth.mfa.listFactors();
      const totp = factors?.totp?.find((f) => f.status === "verified");
      if (!totp) {
        router.push("/admin/mfa/setup");
        return;
      }
      setFactorId(totp.id);
      const { data: challenge, error } = await supabase.auth.mfa.challenge({ factorId: totp.id });
      if (error) setError(error.message);
      else setChallengeId(challenge?.id ?? null);
    }
    initChallenge();
  }, [router]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!factorId || !challengeId) return;
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.mfa.verify({
      factorId,
      challengeId,
      code: code.replace(/\s/g, ""),
    });

    if (error) {
      setError("Invalid code. Please try again.");
      setLoading(false);
      // Refresh challenge
      const { data: newChallenge } = await supabase.auth.mfa.challenge({ factorId });
      setChallengeId(newChallenge?.id ?? null);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#c8a96e]/5 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#c8a96e]/10 border border-[#c8a96e]/20 mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#c8a96e]">
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Two-Factor Auth</h1>
          <p className="text-sm text-white/40 mt-1">Enter the 6-digit code from your authenticator app</p>
        </div>

        <div className="bg-[#111118] border border-white/8 rounded-2xl p-8 shadow-2xl shadow-black/50">
          <form onSubmit={handleVerify} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-sm text-white/60 font-medium">Authenticator Code</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9 ]*"
                maxLength={7}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                placeholder="000 000"
                autoFocus
                className="w-full px-4 py-3.5 rounded-xl bg-[#1a1a24] border border-white/8 text-white placeholder-white/20 text-xl tracking-[0.4em] text-center outline-none focus:border-[#c8a96e]/50 focus:ring-1 focus:ring-[#c8a96e]/20 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !challengeId || code.replace(/\s/g, "").length < 6}
              className="w-full py-3 rounded-xl bg-[#c8a96e] hover:bg-[#b8996e] text-[#0a0a0f] font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Verifying…
                </>
              ) : (
                "Verify"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
