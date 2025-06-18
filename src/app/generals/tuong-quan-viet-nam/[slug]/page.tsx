// src/app/generals/tuong-quan-viet-nam/[slug]/page.tsx
import { cachedGetGeneralBioBySlug } from "@/lib/generalBios";
import VietGeneralBio from "@/server-components/generals-bio/VietGeneralBio";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // Await params to get slug
  const general = await cachedGetGeneralBioBySlug(slug);
  if (!general) {
    return {
      title: "Không tìm thấy | Chronicles of Heroes",
      description: "Không tìm thấy tiểu sử nhân vật.",
    };
  }
  return {
    title: `${general.name} | Chronicles of Heroes`,
    description: general.bio.slice(0, 160),
  };
}

export default async function Bio({ params }: Props) {
  const { slug } = await params; // Await params to get slug
  const general = await cachedGetGeneralBioBySlug(slug);
  return (
    <>
      <VietGeneralBio general={general} />
    </>
  );
}