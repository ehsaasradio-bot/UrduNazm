import Link from "next/link";
import { cms } from "@/lib/cms";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto" role="contentinfo">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5" aria-label="UrduNazm home">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#a78bfa] to-[#60a5fa] flex items-center justify-center" aria-hidden="true">
                <span className="text-white text-xs font-bold leading-none">N</span>
              </div>
              <span className="text-[15px] font-semibold text-foreground tracking-tight">{cms.site.name}</span>
            </Link>
            <p className="text-sm text-muted mt-5 max-w-[260px] leading-relaxed">
              {cms.footer.description}
            </p>
          </div>

          {cms.footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h4 className="text-sm font-medium text-foreground mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 pt-6 border-t border-border flex items-center justify-between">
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} {cms.site.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
