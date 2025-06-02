import React from "react";
import Link from "next/link";
//These things will be called from API. It will come as a list of timelines, like a tree

const ChinaTimelines = () => {
  return (
    // This is for server component, don't mistake it for client component
    <div className="flex flex-col items-center text-gray-200">
      <Link
        href="/timelines"
        className="text-white bg-transparent border border-gray-300 hover:bg-emerald-700 active:bg-emerald-700 mt-6 px-4 py-2 rounded-lg mb-4"
      >
        ← Quay về dòng thời gian
      </Link>
    </div>
  );
};

export default ChinaTimelines;
