import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://urdunazm.com"),
  title: {
    default: "UrduNazm — Urdu Poetry Collection",
    template: "%s | UrduNazm",
  },
  description:
    "Explore the finest Urdu poetry — ghazals, nazms, and more from legendary poets. Read in Urdu and English with AI-powered tools.",
  keywords: [
    "Urdu poetry", "ghazal", "nazm", "Urdu shayari",
    "اردو شاعری", "غزل", "نظم",
    "Mirza Ghalib", "Allama Iqbal", "Faiz Ahmed Faiz",
  ],
  authors: [{ name: "UrduNazm" }],
  creator: "UrduNazm",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ur_PK",
    siteName: "UrduNazm",
    title: "UrduNazm — Urdu Poetry Collection",
    description:
      "Explore the finest Urdu poetry — ghazals, nazms, and more from legendary poets.",
    url: "https://urdunazm.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "UrduNazm — Urdu Poetry Collection",
    description:
      "Explore the finest Urdu poetry — ghazals, nazms, and more from legendary poets.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "https://urdunazm.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Gulzar&display=swap"
          rel="stylesheet"
        />
        {/* Prevent FOUC — default dark */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.classList.add('light')}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 pt-16" role="main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
