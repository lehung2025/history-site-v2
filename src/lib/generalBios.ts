// src/lib/generalBios.ts
import { General } from "@/types/vietGenerals";
import { cacheGeneralBio } from "@/lib/cacheBios";
import generalsBiosData from "@/data/generalsBio.json";

export type GeneralBio = General & {
  slug: string;
  bio: string;
  source: string;
};

export async function getGeneralBioBySlug(slug: string): Promise<GeneralBio | null> {
  try {
    const general = generalsBiosData.vietnameseGeneralBios.find(g => g.slug === slug);
    if (!general) {
      console.log(`generalBios.ts - No bio found for slug: ${slug}`);
      return null;
    }
    console.log(`generalBios.ts - Found bio: ${general.name}`);
    return general;
  } catch (error) {
    console.error(`generalBios.ts - Error fetching bio for slug ${slug}:`, error);
    return null;
  }
}

export const cachedGetGeneralBioBySlug = cacheGeneralBio(
  getGeneralBioBySlug,
  "vietnam-general-bio"
);