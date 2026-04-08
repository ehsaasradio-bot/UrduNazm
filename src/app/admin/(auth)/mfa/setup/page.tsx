"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function MFASetupPage() {
  const router = useRouter();
  const [qr, setQr] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [factorId, setFactorId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [enrolling, setEnrolling] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function enroll() {
      const supabase = createClient();
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: "UrduNazm Admin",
      });

      if (error) {
        setError(error.message);
      } else if (data) {
        setFactorId(data.id);
        setQr(data.totp.qr_code);
        setSecret(data.totp.secret);
      }
      setEnrolling(false);
    }
    enroll();
  }, []);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!factorId) return;
    setLoading(true);
    setError(null);

    const supabase = createClient();

    const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({ factorId });
    if (challengeError) {
      setError(challengeError.message);
      setLoading(false);
      return;
    }

    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.id,
      code: code.replace(/\s/g, ""),
    });

    if (verifyError) {
      setError("Invalid code. Please scan the QR code again and retry.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  if (enrolling) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#c8a96e] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#c8a96e]/5 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#c8a96e]/10 border border-[#c8a96e]/20 mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#c8a96e]">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Set Up 2FA</h1>
          <p className="text-sm text-white/40 mt-1">Secure your admin account with TOTP</p>
        </div>

        <div className="bg-[#111118] border border-white/8 rounded-2xl p-8 shadow-2xl shadow-black/50 space-y-6">
          {error && (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {error}
            </div>
          )}

          {/* Step 1: QR code */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-[#c8a96e] text-[#0a0a0f] text-xs font-bold flex items-center justify-center">1</span>
              <p className="text-sm text-white/80 font-medium">Scan with your authenticator app</p>
            </div>
            <p className="text-xs text-white/40 mb-4 ml-7">Use Google Authenticator, Authy, or 1Password.</p>
            {qr && (
              <div className="flex flex-col items-center gap-4">
                <div className="p-3 bg-white rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qr} alt="TOTP QR Code" width={160} height={160} className="block" />
                </div>
                {secret && (
                  <div className="w-full">
                    <p className="text-xs text-white/40 text-center mb-1.5">Or enter the key manually:</p>
                    <div className="px-3 py-2 bg-[#1a1a24] rounded-lg text-center">
                      <code className="text-xs text-[#c8a96e] tracking-widest break-all">{secret}</code>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Step 2: Verify code */}
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-5 h-5 rounded-full bg-[#c8a96e] text-[#0a0a0f] text-xs font-bold flex items-center justify-center">2</span>
                <p className="text-sm text-white/80 font-medium">Enter the 6-digit code to confirm</p>
              </div>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9 ]*"
                maxLength={7}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                placeholder="000 000"
                className="w-full px-4 py-3.5 rounded-xl bg-[#1a1a24] border border-white/8 text-white placeholder-white/20 text-xl tracking-[0.4em] text-center outline-none focus:border-[#c8a96e]/50 focus:ring-1 focus:ring-[#c8a96e]/20 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading || code.replace(/\s/g, "").length < 6}
              className="w-full py-3 rounded-xl bg-[#c8a96e] hover:bg-[#b8996e] text-[#0a0a0f] font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Activating…
                </>
              ) : (
                "Activate 2FA & Enter Admin"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
