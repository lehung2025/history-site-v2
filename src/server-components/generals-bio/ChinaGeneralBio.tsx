// This one will be used as a separated component, for the back button only. For now, I will leave it this way
"use client";

import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center text-gray-200">
      <button
        onClick={() => router.back()}
        className="text-white bg-transparent border border-gray-300 hover:bg-red-700 active:bg-red-700 mt-6 px-4 py-2 rounded-lg mb-4"
      >
        ← Quay về trang tướng quân Trung Quốc 
      </button>
    </div>
  );
};

export default BackButton;
