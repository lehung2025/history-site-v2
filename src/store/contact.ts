import { create } from "zustand";

type Contact = {
  name: string;
  email: string;
  twitter: string;
  team: string;
  discord: string;
};

type ContactStore = {
  contact: Contact;
  setContact: (contact: Contact) => void;
};

export const useContactStore = create<ContactStore>((set) => ({
  contact: {
    name: "陳元扞: Trần Nguyên Hãn",
    email: "tran.nguyen.han1427@gmail.com",
    twitter: "https://x.com/musashi_300",
    team: "https://teams.live.com/l/community/FEA8xxyEuYyPmwsCwI",
    discord: "https://discord.com/users/1344897403093909566",
  },
  setContact: (contact) => set({ contact }),
}));
