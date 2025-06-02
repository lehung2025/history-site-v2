// src/server-components/generals/ChineseGenerals.tsx
import { FC, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { QueryClient } from "@tanstack/react-query";
import { getChinaGenerals } from "@/lib/generals";
import { cacheGenerals } from "@/lib/cache";
import { ChinaGeneral, toChinaSlug } from "@/types/chinaGenerals";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

export const revalidate = 60;

const getPageRange = (
  currentPage: number,
  totalPages: number
): (number | string)[] => {
  const range: (number | string)[] = [];
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  range.push(1);
  if (currentPage > 3) {
    range.push("...");
  }
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  if (currentPage < totalPages - 2) {
    range.push("...");
  }
  if (totalPages > 1) {
    range.push(totalPages);
  }
  return range;
};

type ChineseGeneralsProps = {
  searchParams: { [key: string]: string | undefined };
};

const ChineseGenerals: FC<ChineseGeneralsProps> = async ({ searchParams }) => {
  const page = parseInt(searchParams.page ?? "1", 10) || 1;
  const limit = 8;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
      },
    },
  });

  console.log("ChineseGenerals.tsx - Fetching data for page:", page);
  try {
    await queryClient.prefetchQuery({
      queryKey: ["zung-gwok-generals", page, limit],
      queryFn: async () => {
        const result = await cacheGenerals(
          getChinaGenerals,
          "zung-gwok-generals",
          page,
          limit
        )();
        console.log("ChineseGenerals.tsx - Fetched page data:", {
          generalsCount: result.generals.length,
          totalPages: result.totalPages,
        });
        return result;
      },
    });

    await queryClient.prefetchQuery({
      queryKey: ["zung-gwok-generals", "all"],
      queryFn: async () => {
        const result = await cacheGenerals(
          getChinaGenerals,
          "zung-gwok-generals",
          1,
          0,
          true
        )();
        console.log("ChineseGenerals.tsx - Fetched all data:", {
          generalsCount: result.generals.length,
          totalPages: result.totalPages,
        });
        return result;
      },
    });
  } catch (error) {
    console.error("ChineseGenerals.tsx - Error prefetching data:", error);
  }

  const pageData = queryClient.getQueryData<{
    generals: ChinaGeneral[];
    totalPages: number;
  }>(["zung-gwok-generals", page, limit]) ?? { generals: [], totalPages: 0 };
  const allData = queryClient.getQueryData<{
    generals: ChinaGeneral[];
    totalPages: number;
  }>(["zung-gwok-generals", "all"]) ?? { generals: [], totalPages: 0 };

  const generals = Array.isArray(pageData.generals) ? pageData.generals : [];
  const allGenerals = Array.isArray(allData.generals) ? allData.generals : [];
  const totalPagesOverride =
    allGenerals.length > 0 ? Math.ceil(allGenerals.length / limit) : 0;

  console.log(
    "ChineseGenerals - Page:",
    page,
    "Limit:",
    limit,
    "Total generals:",
    allGenerals.length,
    "Total pages (override):",
    totalPagesOverride,
    "Generals displayed:",
    generals.map((g) => g.name)
  );

  if (page < totalPagesOverride) {
    try {
      console.log("ChineseGenerals.tsx - Prefetching next page:", page + 1);
      await queryClient.prefetchQuery({
        queryKey: ["zung-gwok-generals", page + 1, limit],
        queryFn: async () => {
          const result = await cacheGenerals(
            getChinaGenerals,
            "zung-gwok-generals",
            page + 1,
            limit
          )();
          console.log("ChineseGenerals.tsx - Fetched next page:", {
            generalsCount: result.generals.length,
            totalPages: result.totalPages,
          });
          return result;
        },
      });
    } catch (error) {
      console.error(
        "ChineseGenerals.tsx - Error prefetching next page:",
        error
      );
    }
  }

  const pageRange = getPageRange(page, totalPagesOverride);

  if (generals.length === 0 && allGenerals.length === 0) {
    return (
      <div className="flex flex-col items-center text-gray-200">
        <Link
          href="/generals/"
          className="text-white bg-transparent border border-gray-300 hover:bg-red-700 active:bg-red-700 mt-6 px-4 py-2 rounded-lg mb-4"
        >
          ← Quay về trang tướng quân
        </Link>
        <div className="px-2 xs:px-4 w-full max-w-4xl">
          <div className="text-2xl font-bold my-2 border-2 border-white bg-black/50 rounded-lg px-4 py-2 w-fit mx-auto text-center whitespace-nowrap">
            Tướng Quân Trung Quốc
          </div>
          <p className="text-center text-base xs:text-lg text-red-400">
            Không tải được danh sách tướng. Vui lòng kiểm tra Firebase Storage.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-gray-200">
      <Link
        href="/generals/"
        className="text-white bg-transparent border border-gray-300 hover:bg-red-700 active:bg-red-700 mt-6 px-4 py-2 rounded-lg mb-4"
      >
        ← Quay về trang tướng quân
      </Link>
      <div className="px-2 xs:px-4 w-full max-w-4xl">
        <div className="text-2xl font-bold my-2 border-2 border-white bg-black/50 rounded-lg px-4 py-2 w-fit mx-auto text-center whitespace-nowrap">
          Tướng Quân Trung Quốc
        </div>
        {generals.length === 0 ? (
          <p className="text-center text-base xs:text-lg">
            Không tìm thấy tướng nào.
          </p>
        ) : (
          <Suspense
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 mx-2 xs:mx-4">
                {Array(8)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex flex-col">
                      <div className="border-2 border-white rounded-lg p-3 xs:p-4 bg-black/50">
                        <div className="relative w-full aspect-[1/1] animate-pulse bg-gray-500 rounded-lg" />
                      </div>
                      <div className="mt-2 h-6 bg-gray-500 rounded-lg animate-pulse" />
                    </div>
                  ))}
              </div>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 mx-2 xs:mx-4">
              {generals.map((general: ChinaGeneral) => (
                <Link
                  key={general.id}
                  href={`/generals/zung-gwok-zeong-gwan/${toChinaSlug(general.name)}`}
                  className="group flex flex-col"
                >
                  <div className="border-2 border-white rounded-lg p-3 xs:p-4 bg-black/50 group-hover:bg-red-900 group-hover:border-red-900 active:bg-red-900 active:border-red-900 transition-all duration-300">
                    <div className="relative w-full aspect-[1/1]">
                      <Image
                        src={general.image}
                        alt={general.name}
                        fill
                        className="object-contain rounded-lg transition-all duration-300"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        quality={60}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <h3 className="mt-2 text-lg xs:text-xl font-semibold text-center border-2 border-white bg-black/50 rounded-lg px-2 py-1 group-hover:bg-red-900 group-hover:text-black group-hover:border-red-900 active:bg-red-900 active:text-black active:border-red-900 transition-all duration-300 truncate">
                    {general.name}
                  </h3>
                </Link>
              ))}
            </div>
            <div className="flex justify-center items-center gap-1 xs:gap-2 mt-6 xs:mt-8 overflow-x-auto whitespace-nowrap py-2">
              {page <= 1 ? (
                <span className="p-1.5 xs:p-2 rounded-lg border-2 border-white bg-black/50 opacity-50 cursor-not-allowed flex items-center">
                  <FiChevronsLeft className="w-4 h-4 xs:w-5 xs:h-5" />
                </span>
              ) : (
                <Link
                  href={`/generals/zung-gwok-zeong-gwan?page=1`}
                  scroll={false}
                  className="p-1.5 xs:p-2 rounded-lg border-2 border-white bg-black/50 hover:bg-red-700 active:bg-red-700 flex items-center"
                >
                  <FiChevronsLeft className="w-4 h-4 xs:w-5 xs:h-5" />
                </Link>
              )}
              {page <= 1 ? (
                <span className="p-1.5 xs:p-2 rounded-lg border-2 border-white bg-black/50 opacity-50 cursor-not-allowed flex items-center">
                  <FiChevronLeft className="w-4 h-4 xs:w-5 xs:h-5" />
                </span>
              ) : (
                <Link
                  href={`/generals/zung-gwok-zeong-gwan?page=${page - 1}`}
                  scroll={false}
                  className="p-1.5 xs:p-2 rounded-lg border-2 border-white bg-black/50 hover:bg-red-700 active:bg-red-700 flex items-center"
                >
                  <FiChevronLeft className="w-4 h-4 xs:w-5 xs:h-5" />
                </Link>
              )}
              {pageRange.map((p: number | string, index: number) =>
                p === "..." ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-1.5 xs:px-2 py-0.5 xs:py-1 flex items-center text-xs xs:text-sm"
                  >
                    ...
                  </span>
                ) : (
                  <Link
                    key={`page-${p}-${index}`}
                    href={`/generals/zung-gwok-zeong-gwan?page=${p}`}
                    scroll={false}
                    className={`px-2 xs:px-3 py-0.5 xs:py-1 rounded-lg border-2 border-white text-xs xs:text-sm ${
                      p === page
                        ? "bg-red-900 text-white"
                        : "bg-black/50 hover:bg-red-700 active:bg-red-700 text-gray-200"
                    }`}
                  >
                    {p}
                  </Link>
                )
              )}
              {page >= totalPagesOverride ? (
                <span className="p-1.5 xs:p-2 rounded-lg border-2 border-white bg-black/50 opacity-50 cursor-not-allowed flex items-center">
                  <FiChevronRight className="w-4 h-4 xs:w-5 xs:h-5" />
                </span>
              ) : (
                <Link
                  href={`/generals/zung-gwok-zeong-gwan?page=${page + 1}`}
                  scroll={false}
                  className="p-1.5 xs:p-2 rounded-lg border-2 border-white bg-black/50 hover:bg-red-700 active:bg-red-700 flex items-center"
                >
                  <FiChevronRight className="w-4 h-4 xs:w-5 xs:h-5" />
                </Link>
              )}
              {page >= totalPagesOverride ? (
                <span className="p-1.5 xs:p-2 rounded-lg border-2 border-white bg-black/50 opacity-50 cursor-not-allowed flex items-center">
                  <FiChevronsRight className="w-4 h-4 xs:w-5 xs:h-5" />
                </span>
              ) : (
                <Link
                  href={`/generals/zung-gwok-zeong-gwan?page=${totalPagesOverride}`}
                  scroll={false}
                  className="p-1.5 xs:p-2 rounded-lg border-2 border-white bg-black/50 hover:bg-red-700 active:bg-red-700 flex items-center"
                >
                  <FiChevronsRight className="w-4 h-4 xs:w-5 xs:h-5" />
                </Link>
              )}
            </div>
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default ChineseGenerals;
