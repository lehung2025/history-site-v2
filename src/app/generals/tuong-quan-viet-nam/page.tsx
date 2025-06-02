// app/generals/tuong-quan-viet-nam/page.tsx
import { FC } from "react";
import VietnameseGenerals from "@/server-components/generals/VietnameseGenerals";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vietnamese Generals | Chronicles of Heroes",
  description: "Explore the greatest generals of Vietnam",
};

type PageProps = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const VietnameseGeneralPage: FC<PageProps> = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams; // Await searchParams
  return <VietnameseGenerals searchParams={resolvedSearchParams} />;
};

export default VietnameseGeneralPage;
