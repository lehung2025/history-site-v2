// src/server-components/generals-bio/VietGeneralBio.tsx
import Link from "next/link";
import Image from "next/image";
import { GeneralBio } from "@/lib/generalBios";

type VietGeneralBioProps = {
  general: GeneralBio | null;
};

const VietGeneralBio = ({ general }: VietGeneralBioProps) => {
  if (!general) {
    return (
      <div className="flex flex-col items-center text-gray-200">
        <Link
          href="/generals/tuong-quan-viet-nam"
          className="text-white bg-transparent border border-gray-300 hover:bg-red-700 active:bg-red-700 mt-6 px-4 py-2 rounded-lg mb-4"
        >
          ← Quay về trang tướng quân
        </Link>
        <p className="text-center text-base text-red-400">
          Không tìm thấy tiểu sử nhân vật.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-gray-200">
      <Link
        href="/generals/tuong-quan-viet-nam"
        className="text-white bg-transparent border border-gray-300 hover:bg-red-700 active:bg-red-700 mt-6 px-4 py-2 rounded-lg mb-4"
      >
        ← Quay về trang tướng quân
      </Link>
      <div className="px-4 w-full max-w-2xl my-4">
        <h1 className="text-2xl font-bold text-center border-2 border-white bg-black/50 rounded-lg px-4 py-2">
          {general.name}
        </h1>
        {general.image && (
          <div className="relative w-full aspect-[1/1] mt-4">
            <Image
              src={general.image}
              alt={general.name}
              fill
              className="object-contain rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={60}
              loading="lazy"
            />
          </div>
        )}
        <div className="mt-4 text-base prose prose-invert">
          <p>{general.bio}</p>
          <p>
            <strong>Nguồn:</strong> {general.source}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VietGeneralBio;