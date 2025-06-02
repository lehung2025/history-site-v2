"use client";
import { useEffect } from "react";

type ErrorProps = { error: Error & { digest?: string }; reset: () => void };

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Server error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="p-6 bg-red-800/50 rounded-lg">
        <h1 className="text-2xl">Error</h1>
        <p>{error.message || "Something went wrong"}</p>
        <button onClick={reset} className="mt-6 px-4 py-2 bg-blue-600 rounded">
          Retry
        </button>
      </div>
    </div>
  );
}
