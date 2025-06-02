// src/types/chinaGenerals.ts
export type ChinaGeneral = {
  id: string;
  name: string;
  image: string;
};

export const toChinaSlug = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
