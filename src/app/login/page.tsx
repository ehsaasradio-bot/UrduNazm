import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log In — UrduNazm",
  description: "Sign in with Google to save bookmarks and access personalized features.",
};

interface LoginPageProps {
  searchParams: Promise<{ error?: string; next?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error, next } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#a78bfa] to-[#60a5fa] flex items-center justify-center">
            <span className="text-white text-lg font-bold">N</span>
          </div>
          <h1 className="text-2xl font-bold tracking-[-0.02em] text-foreground mb-2">
            Welcome to UrduNazm
          </h1>
          <p className="text-[14px] text-muted leading-relaxed">
            Sign in to save bookmarks and access personalized features.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
            <p className="text-[13px] text-red-400">
              Authentication failed. Please try again.
            </p>
          </div>
        )}

        <LoginForm redirectTo={next} />

        {/* Terms */}
        <p className="text-[12px] text-muted-foreground text-center mt-8 leading-relaxed">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
