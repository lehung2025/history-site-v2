// /app/search/page.tsx
import Search from "@/server-components/search/Search";
import { Suspense } from "react";

export const revalidate = 60; 

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <Search searchParams={{ query }} />
    </Suspense>
  );
}
