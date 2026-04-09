import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPoemBySlug, isBookmarked } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import PoemView from "@/components/poems/PoemView";
import { poemSchema } from "@/lib/jsonld";

interface PoemPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PoemPageProps): Promise<Metadata> {
  const { slug } = await params;
  const poem = await getPoemBySlug(slug);

  if (!poem) {
    return { title: "Poem Not Found — UrduNazm" };
  }

  const firstLine = poem.content_ur.split("\n").find((l) => l.trim()) || "";

  return {
    title: `${poem.title_en} — ${poem.poet.name_en} | UrduNazm`,
    description:
      poem.content_en?.slice(0, 160) ||
      `Read "${poem.title_en}" by ${poem.poet.name_en} in Urdu and English on UrduNazm.`,
    openGraph: {
      title: `${poem.title_en} — ${poem.poet.name_en}`,
      description: firstLine.slice(0, 120),
    },
  };
}

export default async function PoemPage({ params }: PoemPageProps) {
  const { slug } = await params;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const poem = await getPoemBySlug(slug);
  if (!poem) notFound();

  const bookmarked = user
    ? await isBookmarked(user.id, poem.id).catch(() => false)
    : false;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(poemSchema(poem)) }}
      />
      <PoemView
        poem={poem}
        userId={user?.id ?? null}
        initialBookmarked={bookmarked}
      />
    </>
  );
}
