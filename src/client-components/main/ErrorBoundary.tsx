// src/client-components/main/ErrorBoundary.tsx
"use client";

import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { useCallback } from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => {
  const handleRetry = useCallback(() => {
    resetErrorBoundary();
    window.location.reload();
  }, [resetErrorBoundary]);

  return (
    <div className="p-4 text-white bg-red-800/50">
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button
        onClick={handleRetry}
        className="mt-2 px-4 py-2 bg-blue-600 rounded"
      >
        Retry
      </button>
    </div>
  );
};

const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        console.error("ErrorBoundary caught an error:", error, info);
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
