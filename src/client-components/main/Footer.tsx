"use client";
import React, { useState, useEffect } from "react";
import { BsCalendar2DateFill } from "react-icons/bs";
import { CiClock2 } from "react-icons/ci";
import { FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import { useAboutStore } from "@/store/about";
import { Language } from "@/types/domain-links";

const Footer = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [clientLanguage, setClientLanguage] = useState<Language>("Vietnamese");
  const { language } = useAboutStore();

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setClientLanguage(language);
  }, [language]);

  const year = new Date().getFullYear();

  const contactText =
    {
      Vietnamese: "Liên hệ",
      Japanese: "連絡",
      Cantonese: "聯絡",
      English: "Contact",
    }[clientLanguage] || "Contact";

  const copyright =
    {
      Vietnamese: `©${year} biên niên sử anh hùng. Mọi quyền được bảo lưu.`,
      Japanese: `©${year} ヴァロルのクロニクル。全ての権利を保有。`,
      Cantonese: `©${year} 勇氣編年史。保留所有權利。`,
      English: `©${year} Chronicles of Heroes. All rights reserved.`,
    }[clientLanguage] || `©${year} Chronicles of Heroes. All rights reserved.`;

  const formattedDate = currentTime
    ? currentTime.toLocaleDateString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
    : "Updating date...";
  const formattedTime = currentTime
    ? currentTime.toLocaleTimeString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
    : "Updating time...";

  return (
    <footer className="bg-transparent backdrop-blur-sm text-white p-6 w-full sticky bottom-0 z-30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p>{copyright}</p>
        </div>
        <div className="text-center">
          <Link
            href="/contact"
            className="flex items-center gap-2 hover:text-blue-400 px-2 py-1"
          >
            <FaEnvelope size={20} />
            <span>{contactText}</span>
          </Link>
        </div>
        <div className="text-center md:text-right flex items-center justify-center md:justify-end gap-2">
          <BsCalendar2DateFill size={20} />
          <p>{formattedDate}</p>
        </div>
        <div className="text-center md:text-right flex items-center justify-center md:justify-end gap-2">
          <CiClock2 size={20} />
          <p>{formattedTime}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
