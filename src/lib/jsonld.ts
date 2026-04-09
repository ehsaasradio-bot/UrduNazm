const BASE_URL = "https://urdunazm.com";

/** WebSite schema for the homepage — enables Google Sitelinks search box */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "UrduNazm",
    alternateName: "اردو نظم",
    url: BASE_URL,
    description:
      "Explore the finest Urdu poetry — ghazals, nazms, and more from legendary poets.",
    inLanguage: ["en", "ur"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Person schema for a poet page */
export function poetSchema(poet: {
  name_en: string;
  name_ur: string;
  bio_en?: string | null;
  born_year?: number | null;
  died_year?: number | null;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: poet.name_en,
    alternateName: poet.name_ur,
    url: `${BASE_URL}/poets/${poet.slug}`,
    description: poet.bio_en?.slice(0, 300) ?? undefined,
    ...(poet.born_year && {
      birthDate: String(poet.born_year),
    }),
    ...(poet.died_year && {
      deathDate: String(poet.died_year),
    }),
    jobTitle: "Poet",
    knowsAbout: "Urdu Poetry",
    knowsLanguage: ["Urdu", "Persian"],
    sameAs: [],
  };
}

/** CreativeWork schema for a poem page */
export function poemSchema(poem: {
  title_en: string;
  title_ur: string;
  content_ur: string;
  content_en?: string | null;
  slug: string;
  category?: string | null;
  created_at: string;
  poet: { name_en: string; name_ur: string; slug: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: poem.title_en,
    alternateName: poem.title_ur,
    url: `${BASE_URL}/poems/${poem.slug}`,
    inLanguage: "ur",
    genre: poem.category ?? "Urdu Poetry",
    datePublished: poem.created_at,
    text: poem.content_ur.slice(0, 500),
    author: {
      "@type": "Person",
      name: poem.poet.name_en,
      alternateName: poem.poet.name_ur,
      url: `${BASE_URL}/poets/${poem.poet.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: "UrduNazm",
      url: BASE_URL,
    },
    isPartOf: {
      "@type": "WebSite",
      name: "UrduNazm",
      url: BASE_URL,
    },
  };
}

/** BlogPosting schema for a blog detail page */
export function blogPostingSchema(blog: {
  title_en: string;
  excerpt_en?: string | null;
  slug: string;
  author_name?: string | null;
  published_at?: string | null;
  created_at: string;
  cover_image?: string | null;
  category?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title_en,
    url: `${BASE_URL}/blog/${blog.slug}`,
    description: blog.excerpt_en?.slice(0, 300) ?? undefined,
    datePublished: blog.published_at ?? blog.created_at,
    dateModified: blog.published_at ?? blog.created_at,
    inLanguage: "en",
    articleSection: blog.category ?? "Urdu Literature",
    ...(blog.cover_image && {
      image: {
        "@type": "ImageObject",
        url: blog.cover_image,
      },
    }),
    author: {
      "@type": "Person",
      name: blog.author_name ?? "UrduNazm",
    },
    publisher: {
      "@type": "Organization",
      name: "UrduNazm",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/og-image.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${blog.slug}`,
    },
  };
}
