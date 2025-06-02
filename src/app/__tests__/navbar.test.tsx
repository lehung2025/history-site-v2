import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "../../client-components/main/Navbar";

// Mock next/navigation
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: jest.fn(({ children, ...props }) => <div {...props}>{children}</div>),
  },
  AnimatePresence: jest.fn(({ children }) => <>{children}</>),
}));

// Mock useSearchStore
type SearchState = {
  query: string;
  history: string[];
  setQuery: jest.Mock;
  addQuery: jest.Mock;
  removeQuery: jest.Mock;
  clearHistory: jest.Mock;
}
const mockSearchStore: SearchState = {
  query: "",
  history: [],
  setQuery: jest.fn(),
  addQuery: jest.fn(),
  removeQuery: jest.fn(),
  clearHistory: jest.fn(),
};
jest.mock("../../store/search", () => ({
  useSearchStore: jest.fn((selector) =>
    selector ? selector(mockSearchStore) : mockSearchStore
  ),
}));

describe("Navbar", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    mockPush.mockClear();
    mockSearchStore.history = [];
    mockSearchStore.query = "";
    mockSearchStore.setQuery.mockClear();
    mockSearchStore.addQuery.mockClear();
    mockSearchStore.removeQuery.mockClear();
    mockSearchStore.clearHistory.mockClear();
  });

  it("displays Dropdown with search history on desktop", async () => {
    // Mock history
    mockSearchStore.history = ["query1", "query2"];

    render(<Navbar />);

    // Click input để mở Dropdown
    const desktopInput = screen.getByPlaceholderText("Tìm kiếm...");
    await user.click(desktopInput);

    // Kiểm tra Dropdown hiển thị history
    expect(screen.getByText("query1")).toBeInTheDocument();
    expect(screen.getByText("query2")).toBeInTheDocument();
  });

  it("does not display Dropdown when history is empty on desktop", async () => {
    // Mock history rỗng
    mockSearchStore.history = [];

    render(<Navbar />);

    // Click input (Dropdown không mở vì history rỗng)
    const desktopInput = screen.getByPlaceholderText("Tìm kiếm...");
    await user.click(desktopInput);

    // Kiểm tra Dropdown không hiển thị
    expect(screen.queryByText("query1")).not.toBeInTheDocument();
    expect(screen.queryByText("query2")).not.toBeInTheDocument();
  });
});
