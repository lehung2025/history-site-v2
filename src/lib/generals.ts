// src/lib/generals.ts
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "@/lib/firebaseConfig";
import { General, toSlug } from "@/types/vietGenerals";
import { JapanGeneral, toJapanSlug } from "@/types/japanGenerals";
import { ChinaGeneral, toChinaSlug } from "@/types/chinaGenerals";

type GeneralType = General | JapanGeneral | ChinaGeneral;
type ToSlugFn = (name: string) => string;

async function getGeneralImages(
  prefix: string
): Promise<{ name: string; url: string }[]> {
  try {
    const storageRef = ref(storage, prefix);
    const imageRefs = await listAll(storageRef);
    console.log(
      `generals.ts - Files found: ${imageRefs.items.length} in ${prefix}`
    );

    const images = await Promise.all(
      imageRefs.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return { name: item.name, url };
      })
    );

    console.log(
      `generals.ts - Processed ${images.length} images for ${prefix}`
    );
    return images;
  } catch (error) {
    console.error(`generals.ts - Error fetching images for ${prefix}:`, error);
    return [];
  }
}

async function getGeneralsByPrefix<T extends GeneralType>(
  prefix: string,
  toSlugFn: ToSlugFn,
  page: number,
  limit: number,
  getAll: boolean = false
): Promise<{ generals: T[]; totalPages: number }> {
  try {
    const images = await getGeneralImages(prefix);

    const generals: T[] = images.map((image) => {
      const name = image.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return {
        id: toSlugFn(name),
        name,
        image: image.url,
      } as T;
    });

    console.log(
      `generals.ts - Total generals for ${prefix}: ${generals.length}`
    );

    const totalPages = limit > 0 ? Math.ceil(generals.length / limit) : 1;

    if (getAll) {
      return { generals, totalPages };
    }

    if (page < 1 || (limit > 0 && page > totalPages)) {
      console.log(
        `generals.ts - Invalid page ${page} for ${prefix}, returning empty`
      );
      return { generals: [], totalPages };
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedGenerals =
      limit > 0 ? generals.slice(startIndex, endIndex) : generals;

    console.log(
      `generals.ts - Paginated generals for ${prefix}, page ${page}: ${paginatedGenerals.length}`
    );
    return { generals: paginatedGenerals, totalPages };
  } catch (error) {
    console.error(
      `generals.ts - Error fetching generals for ${prefix}:`,
      error
    );
    return { generals: [], totalPages: 0 };
  }
}

export async function getGenerals(
  page: number,
  limit: number,
  getAll: boolean = false
): Promise<{ generals: General[]; totalPages: number }> {
  return getGeneralsByPrefix<General>(
    "vietnam-generals",
    toSlug,
    page,
    limit,
    getAll
  );
}

export async function getJapanGenerals(
  page: number,
  limit: number,
  getAll: boolean = false
): Promise<{ generals: JapanGeneral[]; totalPages: number }> {
  return getGeneralsByPrefix<JapanGeneral>(
    "nihon-generals",
    toJapanSlug,
    page,
    limit,
    getAll
  );
}

export async function getChinaGenerals(
  page: number,
  limit: number,
  getAll: boolean = false
): Promise<{ generals: ChinaGeneral[]; totalPages: number }> {
  return getGeneralsByPrefix<ChinaGeneral>(
    "zung-gwok-generals",
    toChinaSlug,
    page,
    limit,
    getAll
  );
}
