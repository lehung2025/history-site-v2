import React from "react"; //for testing purposes, cannot be removed
import VietnamDynasty from "@/server-components/dynasties/VietnamDynasty";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vietnam Dynasties | Chronicles of Heroes",
  description: "Explore the greatest generals of each country",
};

const VietnamDynasties = () => {
  return (
    <>
      {/* do not remove this fragment. You'll never know when you might need it */}
      <VietnamDynasty />
    </>
  );
};

export default VietnamDynasties;
