export type Dynasty = {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  founder: string;
  generals: { id: string; name: string }[];
};

export const toSlug = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
