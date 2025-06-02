import React from "react";
import Link from "next/link";
//These things will be called from API. It will come as a list of dynasties

const JapanDynasty = () => {
  return (
    // This is for server component, don't mistake it for client component
    <div className="flex flex-col items-center text-gray-200">
      <Link
        href="/dynasties/"
        className="text-white bg-transparent border border-gray-300 hover:bg-red-700 active:bg-red-700 mt-6 px-4 py-2 rounded-lg mb-4"
      >
        ← Quay về triều đại 
      </Link>
      <h1>I will list from Oda Nobunaga era</h1>
    </div>
  );
};

export default JapanDynasty;
