import JapanGeneralBio from "@/server-components/generals-bio/JapanGeneralBio";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Japanese General Biography | Chronicles of Heroes",
  description: "Biography of a Japanese general from the feudal era",
};

// Component trang tĩnh, không cần params
export default function Bio() {
  return (
    <>
      <JapanGeneralBio />
    </>
  );
}
