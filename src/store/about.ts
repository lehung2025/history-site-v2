import { create } from "zustand";
import { getDomainLinks } from "@/client-components/sub/source-links";
import { Language } from "@/types/domain-links";

type Source = {
  label: string;
  url: string;
};

type AboutState = {
  imageSources: Source[];
  articleSources: Source[];
  language: Language;
  setLanguage: (language: Language) => void;
};

export const useAboutStore = create<AboutState>((set) => ({
  imageSources: getDomainLinks("Vietnamese").imageSources,
  articleSources: getDomainLinks("Vietnamese").articleSources,
  language: "Vietnamese",
  setLanguage: (language) => {
    const links = getDomainLinks(language);
    set({
      language,
      imageSources: links.imageSources,
      articleSources: links.articleSources,
    });
  },
}));