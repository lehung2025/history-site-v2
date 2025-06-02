// src/client-components/main/Homepage.tsx
"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Introduction from "./Introduction";
import LoadingSpinner from "@/client-components/sub/LoadingSpinner";
import { useLoadingStore } from "@/store/loading";

const Homepage = () => {
  const { showLoading, hideLoading } = useLoadingStore();

  useEffect(() => {
    showLoading();
    const imageSources = [
      "/other_images/lich_su_viet_nam.jpg",
      "/other_images/lam_son_vs_minh_02.jpg",
      "/other_images/Timeline-of-the-Far-Future-Snippet.jpg",
    ];

    const imagePromises = imageSources.map((src) => {
      return new Promise<void>((resolve) => {
        const img = document.createElement("img") as HTMLImageElement;
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Xử lý lỗi để không treo loading
      });
    });

    Promise.all(imagePromises).then(() => {
      hideLoading();
    });

    return () => {
      hideLoading(); // Cleanup khi component unmount
    };
  }, [showLoading, hideLoading]);

  return (
    <div className="flex flex-col items-center text-white">
      <LoadingSpinner />
      <div className="px-4">
        <div className="text-2xl font-bold my-4 mt-6 border-2 border-white bg-black/50 rounded-lg px-4 py-2 w-fit mx-auto text-center whitespace-nowrap">
          Chọn cánh cổng của bạn
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 w-full max-w-5xl px-4">
        <Link href="/dynasties" className="group rounded-lg">
          <div className="relative w-full aspect-[1/1] border-2 border-white rounded-lg bg-blue-700 group-hover:bg-blue-700 group-active:bg-blue-700">
            <Image
              src="/other_images/lich_su_viet_nam.jpg"
              alt="Dynasties"
              fill
              className="object-contain rounded-lg group-hover:scale-102 overflow-hidden p-2 group-hover:opacity-75 group-active:scale-102 group-active:opacity-75 transition-all duration-300"
              sizes="(max-width: 768px) 100vw, 33vw"
              quality={70}
              priority
            />
          </div>
          <p className="mt-2 text-xl text-center border-2 border-white bg-black/50 rounded-md px-2 py-1 group-hover:bg-blue-700 group-active:bg-blue-700 group-hover:text-black group-active:text-black transition-all duration-300">
            Triều đại
          </p>
        </Link>
        <Link href="/generals" className="group rounded-lg">
          <div className="relative w-full aspect-[1/1] border-2 border-white rounded-lg bg-gray-900 group-hover:bg-black group-active:bg-black">
            <Image
              src="/other_images/lam_son_vs_minh_02.jpg"
              alt="Generals"
              fill
              className="object-contain rounded-lg group-hover:scale-102 overflow-hidden p-2 group-hover:opacity-75 group-active:scale-102 group-active:opacity-75 transition-all duration-300"
              sizes="(max-width: 768px) 100vw, 33vw"
              quality={70}
            />
          </div>
          <p className="mt-2 text-xl text-center border-2 border-white bg-black/50 rounded-md px-2 py-1 group-hover:bg-black group-active:bg-black group-hover:text-white group-active:text-white transition-all duration-300">
            Tướng quân
          </p>
        </Link>
        <Link href="/timelines" className="group rounded-lg">
          <div className="relative w-full aspect-[1/1] border-2 border-white rounded-lg bg-emerald-700 group-hover:bg-emerald-700 group-active:bg-emerald-700">
            <Image
              src="/other_images/Timeline-of-the-Far-Future-Snippet.jpg"
              alt="Timelines"
              fill
              className="object-contain rounded-lg group-hover:scale-102 overflow-hidden p-2 group-hover:opacity-75 group-active:scale-102 group-active:opacity-75 transition-all duration-300"
              sizes="(max-width: 768px) 100vw, 33vw"
              quality={70}
            />
          </div>
          <p className="mt-2 text-xl text-center border-2 border-white bg-black/50 rounded-md px-2 py-1 group-hover:bg-emerald-700 group-active:bg-emerald-700 group-hover:text-black group-active:text-black transition-all duration-300">
            Dòng thời gian
          </p>
        </Link>
      </div>
      <div className="px-4">
        <Introduction />
      </div>
    </div>
  );
};

export default Homepage;
