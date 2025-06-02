import React from "react"; //for testing purposes, cannot be removed
import ChinaDynasty from "@/server-components/dynasties/ChinaDynasty";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "China Dynasties | Chronicles of Heroes",
  description: "Explore the greatest generals of each country",
};

const ChinaDynasties = () => {
  return (
    <>
      {/* do not remove this fragment. You'll never know when you might need it */}
      <ChinaDynasty />
    </>
  );
};

export default ChinaDynasties;
