// src/client-components/main/Navbar.tsx
"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useSearchStore } from "@/store/search";
import { useLoadingStore } from "@/store/loading"; // Thêm import

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);
const AnimatePresence = dynamic(
  () => import("framer-motion").then((mod) => mod.AnimatePresence),
  { ssr: false }
);

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/dynasties", label: "Dynasties" },
  { href: "/generals", label: "Generals" },
  { href: "/timelines", label: "Timelines" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { query, setQuery, history, addQuery, clearHistory, removeQuery } =
    useSearchStore();
  const { showLoading, hideLoading } = useLoadingStore(); // Thêm hooks
  const router = useRouter();
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const desktopInputWrapperRef = useRef<HTMLDivElement>(null);
  const mobileInputWrapperRef = useRef<HTMLDivElement>(null);

  // Đồng bộ isSearching với isLoading
  useEffect(() => {
    if (isSearching) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [isSearching, showLoading, hideLoading]);

  // Handle input focus for desktop and mobile
  useEffect(() => {
    if (window.innerWidth >= 768 && desktopInputRef.current) {
      desktopInputRef.current.focus();
    }
    if (isSearchOpen && mobileInputRef.current) {
      mobileInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close history dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (desktopInputWrapperRef.current &&
          !desktopInputWrapperRef.current.contains(event.target as Node)) ||
        (mobileInputWrapperRef.current &&
          !mobileInputWrapperRef.current.contains(event.target as Node))
      ) {
        setIsHistoryOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleSearch = useCallback(() => setIsSearchOpen((prev) => !prev), []);
  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    setIsHistoryOpen(false);
  }, []);

  const handleSearchSubmit = useCallback(async () => {
    if (!query.trim()) {
      alert("Vui lòng nhập từ khóa tìm kiếm!");
      return;
    }
    setIsSearching(true);
    addQuery(query);
    await router.push(`/search?query=${encodeURIComponent(query)}`);
    setIsSearching(false);
    setQuery("");
    closeSearch();
    setIsHistoryOpen(false);
  }, [query, addQuery, router, closeSearch, setQuery]);

  const handleHistoryClick = useCallback(
    async (q: string) => {
      addQuery(q);
      setIsSearching(true);
      await router.push(`/search?query=${encodeURIComponent(q)}`);
      setIsSearching(false);
      setQuery("");
      setIsHistoryOpen(false);
      closeSearch();
    },
    [addQuery, router, closeSearch, setQuery]
  );

  const placeholder = "Tìm kiếm...";

  const desktopInputClassName =
    "p-2 pr-8 rounded-md bg-gray-800/50 text-white w-48 border border-gray-300";
  const mobileInputClassName =
    "p-2 rounded-md bg-gray-800/50 text-white w-full border border-gray-300";

  return (
    <>
      <nav className="bg-transparent backdrop-blur-sm text-white p-4 pl-1 fixed w-full top-0 z-20">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-2 min-w-[320px]">
          <div className="relative flex items-center justify-between w-full">
            <div className="flex-shrink-0 w-12">
              <MotionDiv
                onClick={toggleMenu}
                aria-label="Toggle menu"
                className="flex items-center justify-center"
                initial={false}
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {isOpen ? "✕" : <FaBars size={24} />}
              </MotionDiv>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link
                href="/"
                className="text-xl md:text-2xl font-bold whitespace-nowrap"
              >
                Biên niên sử các anh hùng
              </Link>
            </div>
            <div
              className="hidden md:flex items-center flex-shrink-0 w-48 relative"
              ref={desktopInputWrapperRef}
            >
              <input
                ref={desktopInputRef}
                type="text"
                placeholder={placeholder}
                value={query || ""}
                onChange={(e) => setQuery(e.target.value)}
                onClick={() => history.length > 0 && setIsHistoryOpen(true)}
                onBlur={() => setIsHistoryOpen(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearchSubmit();
                }}
                className={desktopInputClassName}
              />
              <FaSearch
                size={16}
                aria-label="Search"
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={handleSearchSubmit}
              />
              <AnimatePresence mode="wait">
                {isHistoryOpen && history.length > 0 && (
                  <MotionDiv
                    className="absolute top-full left-0 w-full bg-gray-800 rounded-md mt-1 z-30"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    {history.map((q) => (
                      <div
                        key={q}
                        className="px-2 py-1 text-white hover:bg-gray-700 cursor-pointer truncate flex items-center justify-between"
                      >
                        <span
                          onClick={() => handleHistoryClick(q)}
                          className="flex-1 truncate"
                        >
                          {q}
                        </span>
                        <FaTimes
                          size={12}
                          className="ml-2 text-gray-400 hover:text-white cursor-pointer"
                          onClick={() => removeQuery(q)}
                          aria-label={`Remove ${q} from history`}
                        />
                      </div>
                    ))}
                    <div
                      className="px-2 py-1 text-sm text-gray-400 hover:bg-gray-700 cursor-pointer flex items-center"
                      onClick={() => {
                        clearHistory();
                        setQuery("");
                        setIsHistoryOpen(false);
                      }}
                    >
                      <FaTimes size={12} className="mr-1" />
                      Xóa lịch sử
                    </div>
                  </MotionDiv>
                )}
              </AnimatePresence>
            </div>
            <div className="md:hidden flex items-center flex-shrink-0 w-12 justify-end">
              <FaSearch
                size={24}
                aria-label="Open search"
                className="cursor-pointer"
                onClick={toggleSearch}
              />
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {isOpen && (
          <MotionDiv
            data-testid="overlay"
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isOpen && (
          <MotionDiv
            className="fixed top-0 left-0 bg-gray-800/50 text-white flex flex-col items-center gap-6 py-6 z-40 w-full md:w-64 h-screen"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <button
              onClick={closeMenu}
              aria-label="Close menu"
              className="absolute top-4 right-4 text-2xl"
            >
              ✕
            </button>
            <div className="flex flex-col justify-start mt-12 items-center gap-6 h-full">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="text-xl hover:text-blue-400 active:text-blue-400"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isSearchOpen && (
          <MotionDiv
            data-testid="search-bg-overlay"
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeSearch}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isSearchOpen && (
          <MotionDiv
            data-testid="search-overlay"
            className="fixed top-0 left-0 w-full h-screen bg-gray-800/90 text-white z-40 md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <button
              onClick={closeSearch}
              aria-label="Close search"
              className="absolute top-4 left-4 text-2xl z-50"
            >
              ✕
            </button>
            <div
              className="flex justify-center w-full mt-12 p-4"
              onClick={(e) => e.stopPropagation()}
              ref={mobileInputWrapperRef}
            >
              <div className="relative w-full max-w-md">
                <input
                  ref={mobileInputRef}
                  type="text"
                  placeholder={placeholder}
                  value={query || ""}
                  onChange={(e) => setQuery(e.target.value)}
                  onClick={() => history.length > 0 && setIsHistoryOpen(true)}
                  onBlur={() => setIsHistoryOpen(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearchSubmit();
                  }}
                  className={mobileInputClassName}
                />
                <FaSearch
                  size={16}
                  aria-label="Search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={handleSearchSubmit}
                />
                <AnimatePresence mode="wait">
                  {isHistoryOpen && history.length > 0 && (
                    <MotionDiv
                      key={history.join(",")}
                      className="absolute top-full left-0 w-full bg-gray-800 rounded-md mt-1 z-30"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      {history.map((q) => (
                        <div
                          key={q}
                          className="px-2 py-2 text-white hover:bg-gray-700 cursor-pointer truncate flex items-center justify-between"
                        >
                          <span
                            onClick={() => handleHistoryClick(q)}
                            className="flex-1 truncate"
                          >
                            {q}
                          </span>
                          <FaTimes
                            size={12}
                            className="ml-2 text-gray-400 hover:text-white cursor-pointer"
                            onClick={() => removeQuery(q)}
                            aria-label={`Remove ${q} from history`}
                          />
                        </div>
                      ))}
                      <div
                        className="px-2 py-2 text-sm text-gray-400 hover:bg-gray-700 cursor-pointer flex items-center"
                        onClick={() => {
                          clearHistory();
                          setQuery("");
                          setIsHistoryOpen(false);
                        }}
                      >
                        <FaTimes size={12} className="mr-1" />
                        Xóa lịch sử
                      </div>
                    </MotionDiv>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
