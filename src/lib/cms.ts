/**
 * CMS Configuration — Single source of truth for all editable site text.
 * Update any text, title, or label here. No need to touch components.
 *
 * TODO: Connect to Supabase CMS table in Phase 3 for admin panel editing.
 */

export const cms = {
  // ==================== SITE ====================
  site: {
    name: "UrduNazm",
    tagline_en: "The home of Urdu poetry",
    tagline_ur: "اردو شاعری کا گھر",
    description:
      "Explore the finest Urdu poetry — ghazals, nazms, and more from legendary poets. Read in Urdu and English.",
  },

  // ==================== HERO ====================
  // Set showUrdu to true to re-enable Urdu headlines across the site
  showUrdu: false,

  hero: {
    headline_ur: "اردو شاعری کی دنیا میں خوش آمدید",
    headline_en: "Discover timeless Urdu poetry",
    subtitle:
      "Read ghazals, nazms, and more from legendary poets. In Urdu and English, powered by AI.",
    search_placeholder: "Search poems, poets, or ask AI...",
    cta_primary: "Get started",
    cta_secondary: "Try AI Chat",
  },

  // ==================== CATEGORIES ====================
  categories: [
    { label: "Ghazal", ur: "غزل", slug: "ghazal" },
    { label: "Nazm", ur: "نظم", slug: "nazm" },
    { label: "Rubai", ur: "رباعی", slug: "rubai" },
    { label: "Qita", ur: "قطعہ", slug: "qita" },
    { label: "Marsiya", ur: "مرثیہ", slug: "marsiya" },
  ],

  // ==================== POET BAR ====================
  poetBar: {
    label: "Featuring poets from the last three centuries",
    poets: [
      "Mirza Ghalib",
      "Allama Iqbal",
      "Faiz Ahmed Faiz",
      "Mir Taqi Mir",
      "Ahmed Faraz",
      "Parveen Shakir",
    ],
  },

  // ==================== FEATURES ====================
  features: {
    heading: "Everything you need",
    subtitle:
      "A modern platform to read, discover, and understand Urdu poetry — with AI-powered tools.",
    items: [
      {
        title: "Bilingual Poetry",
        desc: "Every poem in Urdu and English with beautiful Nastaliq rendering and proper RTL layout.",
        icon: "book",
      },
      {
        title: "AI Poetry Chat",
        desc: "Ask AI to explain verses, translate couplets, or find poems by mood and theme.",
        icon: "sparkle",
      },
      {
        title: "Smart Search",
        desc: "Search across poems, poets, and blog. Find ghazals by a single remembered line.",
        icon: "search",
      },
      {
        title: "Legendary Poets",
        desc: "Profiles spanning three centuries — from Ghalib and Mir to Faiz and Parveen Shakir.",
        icon: "users",
      },
      {
        title: "Bookmarks",
        desc: "Save favorites and build a personal poetry collection you can access anytime.",
        icon: "heart",
      },
      {
        title: "Blog & Essays",
        desc: "Literary analysis, poet biographies, and deep dives into Urdu literature.",
        icon: "pen",
      },
    ],
  },

  // ==================== VERSE OF THE DAY ====================
  verse: {
    label: "Verse of the Day",
    line1: "ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے",
    line2: "بہت نکلے مرے ارمان لیکن پھر بھی کم نکلے",
    poet: "Mirza Ghalib",
  },

  // ==================== CTA ====================
  cta: {
    heading: "Start your journey",
    subtitle:
      "Explore centuries of Urdu poetry. Sign in with Google and start building your personal collection.",
    primary: "Get started",
    secondary: "Try AI Chat",
  },

  // ==================== NAV ====================
  nav: {
    links: [
      { href: "/poets", label: "Poets" },
      { href: "/poems", label: "Poems" },
      { href: "/blog", label: "Blog" },
      { href: "/chat", label: "AI Chat" },
    ],
    login: "Log in",
    cta: "Get started",
  },

  // ==================== BLOG ====================
  blog: {
    title: "Blog",
    subtitle: "Compiled notes on Urdu poetry and literature",
    categories: [
      "Latest",
      "Poetry Analysis",
      "Poet Biographies",
      "Urdu Literature",
      "Tutorials",
      "Announcements",
    ],
  },

  // ==================== FOOTER ====================
  footer: {
    description:
      "The home of Urdu poetry. Read ghazals, nazms, and more from legendary poets in Urdu and English.",
    columns: [
      {
        title: "Explore",
        links: [
          { href: "/poets", label: "Poets" },
          { href: "/poems", label: "Poems" },
          { href: "/poems?category=ghazal", label: "Ghazals" },
          { href: "/poems?category=nazm", label: "Nazms" },
        ],
      },
      {
        title: "Features",
        links: [
          { href: "/chat", label: "AI Chat" },
          { href: "/search", label: "Search" },
          { href: "/bookmarks", label: "Bookmarks" },
          { href: "/blog", label: "Blog" },
        ],
      },
      {
        title: "Legal",
        links: [
          { href: "/privacy", label: "Privacy Policy" },
          { href: "/terms", label: "Terms of Service" },
        ],
      },
    ],
  },
} as const;
