import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPoetBySlug, getPoemsByPoet } from "@/lib/supabase/queries";
import PoetProfile from "@/components/poets/PoetProfile";
import { poetSchema } from "@/lib/jsonld";

interface PoetPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PoetPageProps): Promise<Metadata> {
  const { slug } = await params;
  const poet = await getPoetBySlug(slug);

  if (!poet) {
    return { title: "Poet Not Found — UrduNazm" };
  }

  return {
    title: `${poet.name_en} (${poet.name_ur}) — UrduNazm`,
    description:
      poet.bio_en?.slice(0, 160) ||
      `Read poetry by ${poet.name_en} in Urdu and English on UrduNazm.`,
    openGraph: {
      title: `${poet.name_en} — UrduNazm`,
      description:
        poet.bio_en?.slice(0, 160) ||
        `Explore poetry by ${poet.name_en}.`,
    },
  };
}

export default async function PoetPage({ params }: PoetPageProps) {
  const { slug } = await params;
  const poet = await getPoetBySlug(slug);

  if (!poet) notFound();

  const poems = await getPoemsByPoet(poet.id);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(poetSchema(poet)) }}
      />
      <PoetProfile poet={poet} poems={poems} />
    </>
  );
}
