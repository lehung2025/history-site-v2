// src/client-components/sub/domain-links.ts
import { DomainLinks, Language } from "@/types/domain-links";

type SourceTranslations = {
  [key in Language]: string;
};

type TranslatedSource = {
  label: SourceTranslations;
  url: string;
};

type TranslatedDomainLinks = {
  imageSources: TranslatedSource[];
  articleSources: TranslatedSource[];
};

const translatedDomainLinks: TranslatedDomainLinks = {
  imageSources: [
    {
      label: {
        Vietnamese: "Nguồn ảnh tướng Việt Nam",
        Japanese: "ベトナムの将軍の画像ソース",
        Cantonese: "越南將軍圖片來源",
        English: "Vietnam Generals Image Source",
      },
      url: "https://drive.google.com/drive/folders/1ndZhok50LHEek2dbu4hajY2A_5p2XIkq?dmr=1&ec=wgc-drive-globalnav-goto",
    },
    {
      label: {
        Vietnamese: "Nguồn ảnh tướng Nhật Bản",
        Japanese: "日本の将軍の画像ソース",
        Cantonese: "日本將軍圖片來源",
        English: "Japan Generals Image Source",
      },
      url: "https://www.nobuwiki.org/character/tokai",
    },
    {
      label: {
        Vietnamese: "Nguồn ảnh tướng Trung Quốc",
        Japanese: "中国の将軍の画像ソース",
        Cantonese: "中國將軍圖片來源",
        English: "China Generals Image Source",
      },
      url: "https://www.nobuwiki.org/san/character-san",
    },
  ],
  articleSources: [
    {
      label: {
        Vietnamese: "Nguồn bài viết tướng Việt Nam",
        Japanese: "ベトナムの将軍の記事ソース",
        Cantonese: "越南將軍文章來源",
        English: "Vietnam Generals Article Source",
      },
      url: "https://drive.google.com/drive/folders/1IbtnSslmfKfZSD2w-FKURECUfp0zAmtD?usp=drive_link",
    },
    {
      label: {
        Vietnamese: "Nguồn bài viết tướng Nhật Bản",
        Japanese: "日本の将軍の記事ソース",
        Cantonese: "日本將軍文章來源",
        English: "Japan Generals Article Source",
      },
      url: "https://drive.google.com/drive/folders/19Z-braF0fp1CnD7vX8JjXpDvPQZJ5kla",
    },
    {
      label: {
        Vietnamese: "Nguồn bài viết tướng Trung Quốc",
        Japanese: "中国の将軍の記事ソース",
        Cantonese: "中國將軍文章來源",
        English: "China Generals Article Source",
      },
      url: "https://drive.google.com/drive/folders/1ivgVbptFdCwIAQ44r1bijCTOhsSLmF6x",
    },
  ],
};

export const getDomainLinks = (language: Language): DomainLinks => {
  return {
    imageSources: translatedDomainLinks.imageSources.map((source) => ({
      label: source.label[language],
      url: source.url,
    })),
    articleSources: translatedDomainLinks.articleSources.map((source) => ({
      label: source.label[language],
      url: source.url,
    })),
  };
};

// This file has been changed to "source-links.ts"
