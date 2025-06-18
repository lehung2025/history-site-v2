// src/lib/cacheBios.ts
import { unstable_cache } from "next/cache";
import { GeneralBio } from "@/lib/generalBios";

type BioFetchFn = (slug: string) => Promise<GeneralBio | null>;

export function cacheGeneralBio(fetchFn: BioFetchFn, prefix: string) {
  return (slug: string) => {
    const cacheKey = [prefix, slug];
    return unstable_cache(
      async () => {
        console.log(`cacheBios.ts - Cache miss for ${prefix}, slug: ${slug}`);
        const result = await fetchFn(slug);
        console.log(`cacheBios.ts - Cached result for ${prefix}, slug: ${slug}`, {
          found: !!result,
          name: result?.name || "Not found",
        });
        return result;
      },
      cacheKey,
      { revalidate: 60 }
    )();
  };
}