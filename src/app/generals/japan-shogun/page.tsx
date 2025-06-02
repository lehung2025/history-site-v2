// app/generals/japan-shogun/page.tsx
import { FC } from "react";
import JapaneseGenerals from "@/server-components/generals/JapaneseGenerals";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Japanese Generals | Chronicles of Heroes",
  description: "Explore the greatest generals of Japan",
};

type PageProps = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const JapaneseGeneralPage: FC<PageProps> = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams; // Await searchParams
  return <JapaneseGenerals searchParams={resolvedSearchParams} />;
};

export default JapaneseGeneralPage;
