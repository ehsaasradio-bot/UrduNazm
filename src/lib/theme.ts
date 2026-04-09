/**
 * UrduNazm Theme Package — Lovable.dev Inspired
 * ================================================
 * This file documents all design tokens extracted from lovable.dev
 * and adapted for UrduNazm. Use as reference for all future components.
 *
 * CSS variables are defined in globals.css
 * Editable text lives in cms.ts
 *
 * RULE: Every new component MUST use these tokens. No hardcoded colors.
 */

export const theme = {
  // ==================== COLORS (Dark mode — default) ====================
  colors: {
    background: "#0a0a0a",       // Page background
    foreground: "#fafafa",       // Primary text
    card: "#141414",             // Card / elevated surface
    surface: "#111111",          // Secondary surface
    surfaceHover: "#1a1a1a",     // Hover state for surfaces
    border: "#1e1e1e",           // Default border
    borderHover: "#2a2a2a",      // Border on hover
    muted: "#a1a1aa",            // Secondary text (descriptions)
    mutedForeground: "#71717a",  // Tertiary text (dates, meta)
    dimmed: "#52525b",           // Least prominent text

    // Primary — white CTA buttons on dark bg
    primary: "#ffffff",
    primaryForeground: "#0a0a0a",

    // Accent — UrduNazm gold identity
    accent: "#c8a96e",
    accentHover: "#d4b97e",
    accentSoft: "rgba(200, 169, 110, 0.12)",
    accentForeground: "#0a0a0a",

    // Blog category label — Lovable coral
    coral: "#f97066",
    coralSoft: "rgba(249, 112, 102, 0.12)",

    // Hero gradient mesh colors — LOCKED THEME
    heroBlue: "rgba(59, 130, 246, 0.30)",     // Top center
    heroPink: "rgba(236, 72, 153, 0.40)",     // Bottom left
    heroOrange: "rgba(249, 115, 22, 0.30)",   // Bottom right
    heroIndigo: "rgba(99, 102, 241, 0.15)",   // Top edge
  },

  // ==================== TYPOGRAPHY ====================
  fonts: {
    sans: '"Inter", -apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
    urdu: '"Gulzar", "Noto Nastaliq Urdu", serif',
    urduLatin: '"Gulzar", "Inter", sans-serif',
  },

  fontSize: {
    xs: "11px",       // Labels, tiny meta
    sm: "13px",       // Body small, nav links, button text
    base: "14px",     // Body default
    md: "15px",       // Blog body, descriptions
    lg: "18px",       // Section subheadings
    xl: "24px",       // Section headings
    "2xl": "32px",    // Urdu headings
    "3xl": "40px",    // Page titles
    "4xl": "48px",    // Hero heading mobile
    "5xl": "64px",    // Hero heading desktop
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  tracking: {
    tighter: "-0.04em",   // Hero headings
    tight: "-0.02em",     // Section headings
    normal: "0",
    wide: "0.15em",       // Uppercase labels
  },

  lineHeight: {
    tight: 1.05,          // Hero headings
    snug: 1.2,            // Card titles
    normal: 1.5,
    relaxed: 1.7,         // Body text
    loose: 1.8,           // Blog prose
    urdu: 2.4,            // Urdu text
  },

  // ==================== SPACING ====================
  spacing: {
    navHeight: "64px",
    heroGap: "30px",        // Gap between nav and hero
    containerMax: "1200px",
    containerPx: "24px",    // px-6
    sectionPy: "96px",      // py-24
    sectionPyLg: "128px",   // py-32
    cardPadding: "28px",    // p-7
  },

  // ==================== RADIUS ====================
  radius: {
    sm: "6px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    "2xl": "20px",     // Cards, hero search card
    "3xl": "24px",
    full: "9999px",    // Pills, badges
  },

  // ==================== SHADOWS ====================
  shadows: {
    card: "none",                                              // Cards use border, not shadow
    heroCard: "0 25px 50px -12px rgba(0, 0, 0, 0.40)",       // Hero search card
    glass: "0 1px 2px rgba(0, 0, 0, 0.1)",                   // Navbar on scroll
  },

  // ==================== NAVBAR ====================
  navbar: {
    height: "64px",
    bg: "transparent",
    bgScrolled: "rgba(10, 10, 10, 0.85)",   // glass
    blur: "20px",
    linkSize: "13px",
    linkColor: "#a1a1aa",
    linkHover: "#fafafa",
    loginBorder: "#1e1e1e",
    loginHoverBorder: "rgba(113, 113, 122, 0.3)",
    ctaBg: "#ffffff",
    ctaColor: "#0a0a0a",
  },

  // ==================== FOOTER ====================
  footer: {
    bg: "transparent",                       // Same as page bg
    borderTop: "#1e1e1e",
    headingColor: "#fafafa",
    linkColor: "#a1a1aa",
    linkHover: "#fafafa",
    copyColor: "#52525b",
    py: "64px",
  },

  // ==================== BLOG ====================
  blog: {
    categoryColor: "#f97066",                // Coral label
    titleColor: "#fafafa",
    titleSize: "18px",
    excerptColor: "#a1a1aa",
    metaColor: "#71717a",
    metaSize: "13px",
    cardImageRadius: "12px",
    cardImageAspect: "16/10",
    sidebarActiveColor: "#fafafa",
    sidebarInactiveColor: "#a1a1aa",
    sidebarFontSize: "14px",
    // Blog post prose
    proseColor: "#a1a1aa",
    proseFontSize: "15px",
    proseLineHeight: 1.8,
    proseHeadingColor: "#fafafa",
    proseLinkColor: "#c8a96e",
    proseCodeBg: "#111111",
  },

  // ==================== BUTTON VARIANTS ====================
  buttons: {
    primary: {
      bg: "#ffffff",
      color: "#0a0a0a",
      hover: "opacity 0.9",
      radius: "8px",
      height: "32px",         // h-8
      fontSize: "13px",
      fontWeight: 500,
    },
    secondary: {
      bg: "transparent",
      color: "#a1a1aa",
      border: "#1e1e1e",
      hoverBorder: "rgba(113, 113, 122, 0.3)",
      hoverColor: "#fafafa",
      radius: "8px",
      height: "32px",
      fontSize: "13px",
    },
    accent: {
      bg: "#c8a96e",
      color: "#0a0a0a",
      hover: "#d4b97e",
      radius: "8px",
      fontSize: "13px",
    },
  },
} as const;
