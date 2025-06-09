import ChinaGeneralBio from "@/server-components/generals-bio/ChinaGeneralBio";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chinese General Biography | Chronicles of Heroes",
  description: "Biography of a Chinese general from the feudal era",
};

export default function Bio() {
  return (
    // Do not remove these fragments
    <>
      {/* The bio is currently not running, due to me changing the code. Besides, these datas are fake. I have not installed Firebase yet, to avoid messing things up. */}
      {/* I need to set up language switcher and zustand before moving on to firebase */}
      <ChinaGeneralBio />
    </>
  );
}
