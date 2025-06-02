import React from "react"; //for testing purposes, cannot be removed
import ContactPage from "@/client-components/main/ContactPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Chronicles of Heroes",
  description:
    "Contact the owner of this project",
};

export default function Contact() {
  return (
    <>
      <ContactPage />
    </>
  );
}
