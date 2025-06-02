// src/app/page.tsx
import React from "react"; //for testing purposes, cannot be removed
import Homepage from "@/client-components/main/HomePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Chronicles of Heroes",
  description:
    "Explore historical timelines, famous generals, and significant events in history.",
};

export default function Home() {
  return (
    <>
      {/* Do not remove this fragment. It is needed for future purposes */}
      <Homepage />
    </>
  );
}
