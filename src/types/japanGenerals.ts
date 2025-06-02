// src/types/japanGenerals.ts
export type JapanGeneral = {
  id: string;
  name: string;
  image: string;
};

export const toJapanSlug = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
