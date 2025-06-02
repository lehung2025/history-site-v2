// app/generals/zung-gwok-zeong-gwan/page.tsx
import { FC } from "react";
import ChineseGenerals from "@/server-components/generals/ChineseGenerals";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chinese Generals | Chronicles of Heroes",
  description: "Explore the greatest generals of China",
};

type PageProps = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const ChineseGeneralPage: FC<PageProps> = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams; // Await searchParams
  return <ChineseGenerals searchParams={resolvedSearchParams} />;
};

export default ChineseGeneralPage;
