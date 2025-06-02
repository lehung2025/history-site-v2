import React from "react"; //for testing purposes, cannot be removed
import DynastyPage from "@/client-components/main/DynastyPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dynasties | Chronicles of Heroes",
  description:
    "Explore ancient dynasties",
};

export default function Dynasty() {
  return (
    <>
    {/* This file will act like the cover of a book, so don't assume stupid shit like "if you need to add more" */}
      <DynastyPage />
    </>
  );
}
