import React from "react";
import TimelinePage from "@/client-components/main/TimelinePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timelines | Chronicles of Heroes",
  description:
    "Explore historical timelines, famous generals, and significant events in history.",
};

const Timelines = () => {
  return (
    <>
      <TimelinePage />
    </>
  );
};

export default Timelines;
