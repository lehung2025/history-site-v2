import React from "react";
import VietnamTimelines from "@/server-components/timelines/VietnamTimelines";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vietnam Timelines | Chronicles of Heroes",
  description:
    "Explore historical timelines, famous generals, and significant events in history.",
};

const Vietnam = () => {
  return (
    <>
      <VietnamTimelines />
    </>
  );
};

export default Vietnam;
