// src/types/vietGeneralsBio.ts
export type GeneralBio = {
  id: string;
  name: string;
  slug: string;
  bio: string;
  image: string;
  source: string;
};

export const toSlug = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
