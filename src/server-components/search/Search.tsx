// src/server-components/search/Search.tsx
import { FC, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { QueryClient } from "@tanstack/react-query";
import { cacheGenerals } from "@/lib/cache";
// For searching vietnamese, japanese, and chinese generals
import { getGenerals, getJapanGenerals, getChinaGenerals } from "@/lib/generals";
import { General, toSlug } from "@/types/vietGenerals";
import { JapanGeneral, toJapanSlug } from "@/types/japanGenerals";
import { ChinaGeneral, toChinaSlug } from "@/types/chinaGenerals";

type SearchProps = {
  searchParams?: { query?: string } | null;
};

const normalizeText = (text: string): string =>
  text
    .replace(/[ĐĐ]/g, "D")
    .replace(/[đđ]/g, "d")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const filterGenerals = <T extends { name: string }>(
  generals: T[],
  normalizedQuery: string
): T[] => {
  return generals
    .filter((g) => normalizeText(g.name).includes(normalizedQuery))
    .sort((a, b) => {
      const aFamilyName = normalizeText(a.name).split(" ")[0];
      const bFamilyName = normalizeText(b.name).split(" ")[0];
      if (
        aFamilyName.startsWith(normalizedQuery) &&
        !bFamilyName.startsWith(normalizedQuery)
      ) {
        return -1;
      }
      if (
        !aFamilyName.startsWith(normalizedQuery) &&
        bFamilyName.startsWith(normalizedQuery)
      ) {
        return 1;
      }
      return a.name.localeCompare(b.name);
    });
};

const GeneralCard: FC<{
  general: General | JapanGeneral | ChinaGeneral;
  href: string;
  hoverColor: string;
  borderColor: string;
}> = ({ general, href, hoverColor, borderColor }) => (
  <Link href={href} className="group flex flex-col">
    <div
      className={`border-2 border-white rounded-lg p-3 xs:p-4 bg-black/50 group-hover:${hoverColor} group-hover:border-${borderColor} active:${hoverColor} active:border-${borderColor} transition-all duration-300`}
    >
      <div className="relative w-full aspect-[1/1]">
        <Image
          src={general.image}
          alt={general.name}
          fill
          loading="lazy"
          className="object-contain rounded-lg transition-all duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          quality={60}
        />
      </div>
    </div>
    <h3
      className={`mt-2 text-lg xs:text-xl font-semibold text-center border-2 border-white bg-black/50 rounded-lg px-2 py-1 group-hover:${hoverColor} group-hover:text-black group-hover:border-${borderColor} active:${hoverColor} active:text-black active:border-${borderColor} transition-all duration-300 truncate`}
    >
      {general.name}
    </h3>
  </Link>
);

const Search: FC<SearchProps> = async ({ searchParams }) => {
  const query = searchParams?.query?.trim() ?? "";
  const queryText = `"${query}"`;
  console.log("Search.tsx - Query:", query);

  return (
    <div className="flex flex-col items-center text-gray-200">
      <div className="px-2 xs:px-4 w-full max-w-4xl">
        <div className="flex justify-center">
          <Link
            href="/generals"
            className="text-white bg-transparent border border-gray-300 hover:bg-blue-700 active:bg-blue-700 mt-4 px-4 py-2 rounded-lg mb-4 hover:scale-105 active:scale-105 transition-all duration-300"
          >
            ← Quay về trang tướng
          </Link>
        </div>

        {!query ? (
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4 border-2 border-white bg-black/50 rounded-lg px-4 py-2 w-fit mx-auto text-center whitespace-nowrap">
              Vui lòng nhập từ khóa tìm kiếm...
            </h2>
            <Link
              href="/"
              className="text-white bg-transparent border border-gray-300 hover:bg-blue-700 active:bg-blue-700 mt-4 px-4 py-2 rounded-lg mb-4 hover:scale-105 active:scale-105 transition-all duration-300"
            >
              ← Quay về trang chủ
            </Link>
          </div>
        ) : (
          <>
            {await (async () => {
              const queryClient = new QueryClient({
                defaultOptions: {
                  queries: {
                    staleTime: 60_000,
                  },
                },
              });

              try {
                await Promise.all([
                  queryClient.prefetchQuery({
                    queryKey: ["vietnam-generals", "all"],
                    queryFn: async () => {
                      const result = await cacheGenerals(
                        getGenerals,
                        "vietnam-generals",
                        1,
                        0,
                        true
                      )();
                      console.log("Search.tsx - Fetched Vietnam generals:", {
                        generalsCount: result.generals.length,
                        totalPages: result.totalPages,
                      });
                      return result;
                    },
                  }),
                  queryClient.prefetchQuery({
                    queryKey: ["nihon-generals", "all"],
                    queryFn: async () => {
                      const result = await cacheGenerals(
                        getJapanGenerals,
                        "nihon-generals",
                        1,
                        0,
                        true
                      )();
                      console.log("Search.tsx - Fetched Japan generals:", {
                        generalsCount: result.generals.length,
                        totalPages: result.totalPages,
                      });
                      return result;
                    },
                  }),
                  queryClient.prefetchQuery({
                    queryKey: ["zung-gwok-generals", "all"],
                    queryFn: async () => {
                      const result = await cacheGenerals(
                        getChinaGenerals,
                        "zung-gwok-generals",
                        1,
                        0,
                        true
                      )();
                      console.log("Search.tsx - Fetched China generals:", {
                        generalsCount: result.generals.length,
                        totalPages: result.totalPages,
                      });
                      return result;
                    },
                  }),
                ]);
              } catch (error) {
                console.error(
                  "Search.tsx - Error prefetching generals:",
                  error
                );
                return (
                  <div className="p-6 text-center">
                    <h2 className="text-2xl font-bold mb-4 border-2 border-white bg-black/50 rounded-lg px-4 py-2 w-fit mx-auto text-center whitespace-nowrap">
                      Lỗi khi tải danh sách tướng. Vui lòng thử lại.
                    </h2>
                    <Link
                      href="/"
                      className="text-white bg-transparent border border-gray-300 hover:bg-blue-700 active:bg-blue-700 mt-4 px-4 py-2 rounded-lg mb-4 hover:scale-105 active:scale-105 transition-all duration-300"
                    >
                      ← Quay về trang chủ
                    </Link>
                  </div>
                );
              }

              const vietnamGenerals =
                queryClient.getQueryData<{
                  generals: General[];
                  totalPages: number;
                }>(["vietnam-generals", "all"])?.generals ?? [];
              const japanGenerals =
                queryClient.getQueryData<{
                  generals: JapanGeneral[];
                  totalPages: number;
                }>(["nihon-generals", "all"])?.generals ?? [];
              const chinaGenerals =
                queryClient.getQueryData<{
                  generals: ChinaGeneral[];
                  totalPages: number;
                }>(["zung-gwok-generals", "all"])?.generals ?? [];

              console.log(
                "Search.tsx - Vietnam generals:",
                vietnamGenerals.map((g) => g.name)
              );
              console.log(
                "Search.tsx - Japan generals:",
                japanGenerals.map((g) => g.name)
              );
              console.log(
                "Search.tsx - China generals:",
                chinaGenerals.map((g) => g.name)
              );

              const filteredVietnamGenerals = filterGenerals<General>(
                vietnamGenerals,
                normalizeText(query)
              );
              const filteredJapanGenerals = filterGenerals<JapanGeneral>(
                japanGenerals,
                normalizeText(query)
              );
              const filteredChinaGenerals = filterGenerals<ChinaGeneral>(
                chinaGenerals,
                normalizeText(query)
              );

              console.log(
                "Search.tsx - Filtered Vietnam generals:",
                filteredVietnamGenerals.map((g) => g.name)
              );
              console.log(
                "Search.tsx - Filtered Japan generals:",
                filteredJapanGenerals.map((g) => g.name)
              );
              console.log(
                "Search.tsx - Filtered China generals:",
                filteredChinaGenerals.map((g) => g.name)
              );

              const hasVietnamResults = filteredVietnamGenerals.length > 0;
              const hasJapanResults = filteredJapanGenerals.length > 0;
              const hasChinaResults = filteredChinaGenerals.length > 0;

              if (!hasVietnamResults && !hasJapanResults && !hasChinaResults) {
                return (
                  <div className="p-6 text-center">
                    <h2 className="text-2xl font-bold mb-4 border-2 border-white bg-black/50 rounded-lg px-4 py-2 w-fit mx-auto text-center whitespace-nowrap">
                      Không tìm thấy kết quả cho {queryText}
                    </h2>
                    <Link
                      href="/"
                      className="text-white bg-transparent border border-gray-300 hover:bg-blue-700 active:bg-blue-700 mt-4 px-4 py-2 rounded-lg mb-4 hover:scale-105 active:scale-105 transition-all duration-300"
                    >
                      ← Quay về trang chủ
                    </Link>
                  </div>
                );
              }

              return (
                <>
                  <h2 className="text-2xl font-bold my-4 border-2 border-white bg-black/50 rounded-lg px-4 py-2 w-fit mx-auto text-center whitespace-nowrap">
                    Kết quả cho {queryText}
                  </h2>

                  {hasVietnamResults && (
                    <Suspense
                      fallback={
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 mx-2 xs:mx-4">
                          {Array(4)
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
                      <h3 className="text-xl font-semibold my-2 border-2 border-white bg-black/50 rounded-lg px-4 py-2 w-fit mx-auto text-center">
                        Nhân vật lịch sử Việt Nam 
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 mx-2 xs:mx-4">
                        {filteredVietnamGenerals.map((general) => (
                          <GeneralCard
                            key={general.id}
                            general={general}
                            href={`generals/tuong-quan-viet-nam/${toSlug(general.name)}`}
                            hoverColor="bg-yellow-500"
                            borderColor="yellow-300"
                          />
                        ))}
                      </div>
                    </Suspense>
                  )}

                  {hasJapanResults && (
                    <Suspense
                      fallback={
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 mx-2 xs:mx-4">
                          {Array(4)
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
                      <h3 className="text-xl font-semibold my-2 border-2 border-white bg-black/50 rounded-lg px-4 py-2 w-fit mx-auto text-center">
                        Nhân vật lịch sử Nhật Bản
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 mx-2 xs:mx-4">
                        {filteredJapanGenerals.map((general) => (
                          <GeneralCard
                            key={general.id}
                            general={general}
                            href={`/generals/japan-shogun/${toJapanSlug(general.name)}`}
                            hoverColor="bg-orange-400"
                            borderColor="orange-400"
                          />
                        ))}
                      </div>
                    </Suspense>
                  )}

                  {hasChinaResults && (
                    <Suspense
                      fallback={
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 mx-2 xs:mx-4">
                          {Array(4)
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
                      <h3 className="text-xl font-semibold my-2 border-2 border-white bg-black/50 rounded-lg px-4 py-2 w-fit mx-auto text-center">
                        Nhân vật lịch sử Trung Quốc
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 mx-2 xs:mx-4">
                        {filteredChinaGenerals.map((general) => (
                          <GeneralCard
                            key={general.id}
                            general={general}
                            href={`/generals/zung-gwok-zeong-gwan/${toChinaSlug(general.name)}`}
                            hoverColor="bg-red-900"
                            borderColor="red-900"
                          />
                        ))}
                      </div>
                    </Suspense>
                  )}
                </>
              );
            })()}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
