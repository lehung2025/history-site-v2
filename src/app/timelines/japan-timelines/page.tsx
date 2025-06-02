import React from "react";
import JapanTimelines from "@/server-components/timelines/JapanTimelines";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Japan Timelines | Chronicles of Heroes",
  description:
    "Explore historical timelines, famous generals, and significant events in history.",
};

const Japan = () => {
  return (
    <>
      <JapanTimelines />
    </>
  );
};

export default Japan;
