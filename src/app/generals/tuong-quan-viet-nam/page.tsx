// app/generals/tuong-quan-viet-nam/page.tsx
import { FC } from "react";
import VietnameseGenerals from "@/server-components/generals/VietnameseGenerals";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tướng Quân Việt Nam | Biên niên sử các anh hùng",
  description: "Khám phá những vị anh hùng vĩ đại nhất của Việt Nam",
};

type PageProps = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const VietnameseGeneralPage: FC<PageProps> = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams; // Await searchParams
  return <VietnameseGenerals searchParams={resolvedSearchParams} />;
};

export default VietnameseGeneralPage;
