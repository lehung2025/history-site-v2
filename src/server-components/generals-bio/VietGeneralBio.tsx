// src/server-components/generals-bio/VietGeneralBio.tsx
import Image from "next/image";
import { GeneralBio } from "@/lib/generalBios";
import BackButton from "@/client-components/sub/BackButton";

type VietGeneralBioProps = {
  general: GeneralBio | null;
};

const VietGeneralBio = ({ general }: VietGeneralBioProps) => {
  if (!general) {
    return (
      <div className="flex flex-col items-center text-gray-200">
        <BackButton />
        <p className="text-center text-base text-red-400">
          Không tìm thấy tiểu sử nhân vật.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-gray-200">
      <BackButton />
      <div className="px-2 sm:px-4 w-full max-w-2xl my-4">
        <h1 className="text-2xl font-bold text-center border-2 border-white bg-black/50 rounded-lg px-4 py-2">
          {general.name}
        </h1>
        {general.image && (
          <div className="relative w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] aspect-[1/1] mx-auto mt-4 border-2 border-white bg-black/50 rounded-lg">
            <Image
              src={general.image}
              alt={general.name}
              fill
              className="object-contain rounded-lg"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 300px, 350px"
              quality={60}
              loading="lazy"
            />
          </div>
        )}
        <div className="mt-4 text-base border-2 border-white bg-black/50 rounded-lg px-4 sm:px-6 md:px-8 py-4 prose prose-invert min-[360px]:text-lg">
          <strong>
            <h2 className="leading-relaxed">Tiểu sử</h2>
          </strong>
          <p className="leading-relaxed">{general.bio}</p>
          <strong>
            <h2 className="leading-relaxed">Nguồn gốc và bối cảnh lịch sử</h2>
          </strong>
          <p className="leading-relaxed">{general.background}</p>
          <strong>
            <h2 className="leading-relaxed">Sự nghiệp</h2>
          </strong>
          <p className="leading-relaxed">{general.career}</p>
          <p className="leading-relaxed">
            {general.background || "Không có thông tin về xuất thân"}
          </p>
          <p className="leading-relaxed">
            {general.career || "Không có thông tin về sự nghiệp"}
          </p>
          <p>
            <strong>Nguồn:</strong> {general.source}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VietGeneralBio;
