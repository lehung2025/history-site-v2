// src/client-components/main/AboutPage.tsx
"use client";
import Link from "next/link";
import { lazy, Suspense } from "react";
import { useAboutStore } from "@/store/about";
import { Language } from "@/types/domain-links";

const Info = lazy(() => import("@/client-components/sub/Info"));

export default function AboutPage() {
  const { language, setLanguage } = useAboutStore();

  const languages: { name: Language; flag: string }[] = [
    { name: "Vietnamese", flag: "🇻🇳" },
    { name: "Japanese", flag: "🇯🇵" },
    { name: "Cantonese", flag: "cant" },
    { name: "English", flag: "en" },
  ];

  type Translations = {
    [key in Language]: {
      title: string;
      description: string;
      languagesUsed: string;
      backToHome: string;
    };
  };

  const translations: Translations = {
    Vietnamese: {
      title: "Giới thiệu về Dự án",
      description:
        "Trang web này tập trung khám phá các nhân vật lịch sử, quốc gia và triều đại thời phong kiến. Nó cung cấp thông tin lịch sử, hình ảnh và dòng thời gian cho những ai quan tâm đến quá khứ.",
      languagesUsed: "Ngôn ngữ Sử dụng",
      backToHome: "← Quay về trang chủ",
    },
    Japanese: {
      title: "このプロジェクトについて",
      description:
        "このウェブサイトは、封建時代の歴史的人物、国家、朝を探索することに特化しています。過去に興味のある人のために、歴史的洞察、画像、タイムラインを提供します。",
      languagesUsed: "使用言語",
      backToHome: "← ホームページに戻る",
    },
    Cantonese: {
      title: "關於呢個項目",
      description:
        "呢個網站集中探索封建時代嘅歷史人物、國家同朝代。佢為有興趣知多啲關於過去嘅人提供歷史見解、圖像同時間線。",
      languagesUsed: "使用語言",
      backToHome: "← 返回主頁",
    },
    English: {
      title: "About This Project",
      description:
        "This website is dedicated to exploring historical figures, countries, and dynasties in feudal times. It provides historical insights, images, and timelines for those who are interested in learning about the past.",
      languagesUsed: "Languages Used",
      backToHome: "← Back to Home",
    },
  };

  const t = translations[language];

  return (
    <div className="flex flex-col items-center px-6 py-4 text-white">
      <div className="text-2xl sm:text-3xl bg-blue-700/50 sm:bg-gray-950/50 rounded-lg font-bold text-yellow-100 mb-6 px-4 py-2 hover:bg-gray-900/70 transition-all duration-300 whitespace-nowrap mt-2 mx-auto w-fit">
        {t.title}
      </div>
      <p className="border border-yellow-500/50 rounded-lg text-lg bg-gray-950/50 text-white max-w-3xl text-center mb-6 p-4 sm:p-6 shadow-xl hover:bg-gray-900/70 hover:shadow-2xl transition-all duration-300">
        {t.description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Suspense
          fallback={<div className="h-20 bg-gray-800 animate-pulse"></div>}
        >
          <Info title="Image Sources" language={language} />
        </Suspense>
        <Suspense
          fallback={<div className="h-20 bg-gray-800 animate-pulse"></div>}
        >
          <Info title="Article Sources" language={language} />
        </Suspense>
      </div>
      <div className="border border-blue-500/50 p-6 sm:p-8 rounded-lg bg-gray-950/50 mt-6 max-w-2xl w-full transition-transform hover:scale-102 hover:bg-gray-900/70 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-50 mb-2">
          {t.languagesUsed}
        </h2>
        <ul className="list-disc list-inside text-blue-300 mt-2">
          {languages.map((lang) => (
            <li
              key={lang.name}
              className={`cursor-pointer hover:text-amber-500 ${
                language === lang.name ? "text-amber-500 font-bold" : ""
              }`}
              onClick={() => setLanguage(lang.name)}
            >
              {lang.flag} {lang.name}
            </li>
          ))}
        </ul>
      </div>
      <Link
        href="/"
        className="mt-8 px-6 py-3 text-lg font-bold bg-slate-950/50 hover:bg-stone-600 active:bg-stone-700 text-yellow-100 transition-all duration-200 rounded-lg shadow-lg hover:scale-102 active:scale-102"
      >
        {t.backToHome}
      </Link>
    </div>
  );
}
