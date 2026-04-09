import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[600px] px-6 py-32 text-center">
      <p className="urdu text-3xl text-foreground/80 mb-4">صفحہ نہیں ملا</p>
      <h1 className="text-5xl font-bold text-foreground mb-4">404</h1>
      <p className="text-muted mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 h-10 px-5 text-[13px] font-medium rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity"
      >
        Go home
      </Link>
    </section>
  );
}
