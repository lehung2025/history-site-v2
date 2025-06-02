import React from "react"; //for testing purposes, cannot be removed
import JapanDynasty from "@/server-components/dynasties/JapanDynasty";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Japan Dynasties | Chronicles of Heroes",
  description: "Explore the greatest generals of each country",
};

const JapanDynasties = () => {
  return (
    <>
      {/* do not remove this fragment. You'll never know when you might need it */}
      <JapanDynasty />
    </>
  );
};

export default JapanDynasties;
