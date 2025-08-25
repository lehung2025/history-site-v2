// src/types/vietGenerals.ts
export type General = {
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
    // Replace Vietnamese-specific characters
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    // Normalize to decompose diacritical marks
    .normalize("NFD")
    // Remove diacritical marks
    .replace(/[\u0300-\u036f]/g, "")
    // Replace spaces with hyphens and clean up
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
