"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center pt-20">
      <div className="mx-auto max-w-md px-6 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Something went wrong
        </h1>
        <p className="text-muted text-lg mb-2">
          We encountered an unexpected error. Please try again.
        </p>
        {error.digest && (
          <p className="text-dimmed text-sm mb-8">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="h-10 px-5 text-[13px] font-medium rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center h-10 px-5 text-[13px] font-medium rounded-lg border border-border text-foreground hover:border-muted-foreground/30 transition-all"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
