import React from "react";
import Image from "next/image";
import Link from "next/link";

const Timeline = () => {
  return (
    <div className="flex flex-col items-center text-gray-200">
      <Link
        href="/"
        className="text-white bg-transparent border border-gray-300 hover:bg-emerald-700 active:bg-emerald-700 mt-6 px-4 py-2 rounded-lg mb-4"
      >
        ← Quay về trang chủ 
      </Link>
      <div className="px-4">
        <div className="text-2xl font-bold my-4 border-2 border-white bg-black/50 rounded-lg px-4 py-2 w-fit mx-auto text-center whitespace-nowrap">
          Dòng thời gian lịch sử
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full max-w-5xl px-4">
        <Link href="/timelines/vietnam-timelines" className="group rounded-lg">
          <div className="relative w-full aspect-[1/1] border-2 border-white rounded-lg bg-amber-300 group-hover:bg-yellow-400 group-active:bg-yellow-400">
            <Image
              src="/other_images/timeline-of-vietnamese-military.png"
              alt="Vietnam Timeline"
              fill
              className="object-contain rounded-lg group-hover:scale-102 overflow-hidden p-2 group-hover:opacity-75 group-active:scale-102 group-active:opacity-75 transition-all duration-300"
              sizes="(max-width: 768px) 100vw, 33vw"
              quality={70}
              priority
            />
          </div>
          <p className="mt-2 text-xl text-center border-2 border-white bg-black/50 rounded-md px-2 py-1 group-hover:bg-yellow-400 group-active:bg-yellow-400 group-hover:text-black group-active:text-black transition-all duration-300">
            Việt Nam (938 - 1945, luôn gắn với Trung Quốc)
          </p>
        </Link>
        <Link href="/timelines/japan-timelines" className="group rounded-lg">
          <div className="relative w-full aspect-[1/1] border-2 border-white rounded-lg bg-amber-200 group-hover:bg-orange-400 group-active:bg-orange-400">
            <Image
              src="/other_images/Japanese-Timelines-1.png"
              alt="Japan Timeline"
              fill
              className="object-contain rounded-lg group-hover:scale-102 overflow-hidden p-2 group-hover:opacity-75 group-active:scale-102 group-active:opacity-75 transition-all duration-300"
              sizes="(max-width: 768px) 100vw, 33vw"
              quality={70}
            />
          </div>
          <p className="mt-2 text-xl text-center border-2 border-white bg-black/50 rounded-md px-2 py-1 group-hover:bg-orange-400 group-active:bg-orange-400 group-hover:text-black group-active:text-black transition-all duration-300">
            Nhật Bản (1467 - 1868, đảo quốc)
          </p>
        </Link>
        <Link href="/timelines/china-timelines" className="group rounded-lg">
          <div className="relative w-full aspect-[1/1] border-2 border-white rounded-lg bg-red-600 group-hover:bg-red-900 group-active:bg-red-900">
            <Image
              src="/other_images/china-timeline.png"
              alt="China Timeline"
              fill
              className="object-contain rounded-lg group-hover:scale-102 overflow-hidden p-2 group-hover:opacity-75 group-active:scale-102 group-active:opacity-75 transition-all duration-300"
              sizes="(max-width: 768px) 100vw, 33vw"
              quality={70}
            />
          </div>
          <p className="mt-2 text-xl text-center border-2 border-white bg-black/50 rounded-md px-2 py-1 group-hover:bg-red-900 group-active:bg-red-900 group-hover:text-black group-active:text-black transition-all duration-300">
            Trung Quốc (từ 220 tới 280, sau đó là từ Nam Hán trở đi)
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Timeline;
