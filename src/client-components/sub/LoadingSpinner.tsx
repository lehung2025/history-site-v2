// src/client-components/sub/LoadinSpinner.tsx
"use client";

import { useLoadingStore } from "@/store/loading";

const LoadingSpinner = () => {
  const { isLoading } = useLoadingStore();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
