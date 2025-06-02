// src/store/search.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SearchState = {
  query: string;
  history: string[];
  setQuery: (query: string) => void;
  addQuery: (query: string) => void;
  clearHistory: () => void;
  removeQuery: (query: string) => void;
};

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => {
      console.log("Search store initialized");
      return {
        query: "",
        history: [],
        setQuery: (query) => set({ query }),
        addQuery: (query) =>
          set((state) => {
            const newHistory = [...new Set([query, ...state.history])].slice(
              0,
              10
            );
            console.log("addQuery - New history:", newHistory);
            return { history: newHistory };
          }),
        clearHistory: () => {
          console.log("Clearing history...");
          set({ history: [] });
          console.log("History cleared, new history:", []);
        },
        removeQuery: (query) =>
          set((state) => {
            const newHistory = state.history.filter((q) => q !== query);
            console.log("removeQuery - New history:", newHistory);
            return { history: newHistory };
          }),
      };
    },
    {
      name: "search-store", // key trong localStorage
      storage: createJSONStorage(() => localStorage), // lưu vào localStorage
    }
  )
);
