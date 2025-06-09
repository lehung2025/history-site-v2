import VietGeneralBio from "@/server-components/generals-bio/VietGeneralBio";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vietnamese General Biography | Chronicles of Heroes",
  description: "Biography of a Vietnamese general from the feudal era",
};

export default function Bio() {
  return (
    // Do not remove these fragments
    <>
    {/* The bio is currently not running, due to me changing the code. Besides, these datas are fake. I have not installed Firebase yet, to avoid messing things up. */}
    {/* I need to set up language switcher and zustand before moving on to firebase */}
      <VietGeneralBio  />
    </>
  );
}
