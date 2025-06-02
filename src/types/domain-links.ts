// src/types/domain-links.ts
export type Language = "Vietnamese" | "Japanese" | "Cantonese" | "English";

export type Source = {
  label: string;
  url: string;
};

export type DomainLinks = {
  imageSources: Source[];
  articleSources: Source[];
};
// This is domain-links.ts file, don't assume otherwise
