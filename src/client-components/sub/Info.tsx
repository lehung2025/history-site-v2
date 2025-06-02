"use client";
import { useAboutStore } from "@/store/about";
import { Language } from "@/types/domain-links";

type InfoProps = {
  title: "Image Sources" | "Article Sources";
  language: Language;
};

const Info: React.FC<InfoProps> = ({ title, language }) => {
  const { imageSources, articleSources } = useAboutStore();
  const items = title === "Image Sources" ? imageSources : articleSources;

  type Translations = {
    [key in Language]: {
      imageSources: string;
      articleSources: string;
    };
  };

  const translations: Translations = {
    Vietnamese: {
      imageSources: "Nguồn Hình ảnh",
      articleSources: "Nguồn Bài viết",
    },
    Japanese: {
      imageSources: "画像ソース",
      articleSources: "記事ソース",
    },
    Cantonese: {
      imageSources: "圖片來源",
      articleSources: "文章來源",
    },
    English: {
      imageSources: "Image Sources",
      articleSources: "Article Sources",
    },
  };

  const t = translations[language];
  const displayTitle =
    title === "Image Sources" ? t.imageSources : t.articleSources;

  return (
    <div className="border border-gray-700 p-6 sm:p-8 rounded-lg bg-gray-950/50 transition-transform hover:scale-105">
      <h2 className="text-2xl font-bold text-blue-50 mb-2">{displayTitle}</h2>
      <ul className="list-disc list-inside text-gray-300">
        {items.map(({ label, url }) => (
          <li key={url}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:underline"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Info;
