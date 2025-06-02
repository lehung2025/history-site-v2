import { render, screen } from "@testing-library/react";
import { useContactStore } from "@/store/contact";
import ContactPage from "@/client-components/main/ContactPage";
import ContactInfo from "@/client-components/sub/ContactInfo";

// Mock next/link để kiểm tra href
jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  MockLink.displayName = "MockLink"; // Thêm displayName
  return MockLink;
});

// Mock useContactStore
jest.mock("@/store/store", () => ({
  useContactStore: jest.fn(),
}));

const mockContact = {
  name: "陳元扞: Trần Nguyên Hãn",
  email: "tran.nguyen.han1427@gmail.com",
  twitter: "https://x.com/musashi_300",
  team: "https://teams.live.com/l/community/FEA8xxyEuYyPmwsCwI",
  discord: "https://discord.com/users/1344897403093909566",
};

describe("ContactPage", () => {
  beforeEach(() => {
    // Reset mock trước mỗi test
    (useContactStore as unknown as jest.Mock).mockReturnValue({
      contact: mockContact,
      setContact: jest.fn(),
    });
  });

  it("renders ContactInfo and Back link", () => {
    render(<ContactPage />);

    // Kiểm tra ContactInfo render
    expect(screen.getByText("Contact Me")).toBeInTheDocument();

    // Kiểm tra link Back
    const backLink = screen.getByText("← Back");
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute("href", "/");
  });
});

describe("ContactInfo", () => {
  beforeEach(() => {
    (useContactStore as unknown as jest.Mock).mockReturnValue({
      contact: mockContact,
      setContact: jest.fn(),
    });
  });

  it("renders contact information correctly", () => {
    render(<ContactInfo />);

    // Kiểm tra header
    expect(screen.getByText("Contact Me")).toBeInTheDocument();

    // Kiểm tra introduction
    expect(screen.getByText("陳元扞: Trần Nguyên Hãn")).toBeInTheDocument();
    expect(screen.getByText(/My name is/)).toBeInTheDocument();

    // Kiểm tra email
    const emailLink = screen.getByText(mockContact.email);
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", `mailto:${mockContact.email}`);

    // Kiểm tra twitter
    const twitterLink = screen.getByText("Twitter");
    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute("href", mockContact.twitter);

    // Kiểm tra team
    const teamLink = screen.getByText("Team");
    expect(teamLink).toBeInTheDocument();
    expect(teamLink).toHaveAttribute("href", mockContact.team);

    // Kiểm tra discord
    const discordLink = screen.getByText("Discord");
    expect(discordLink).toBeInTheDocument();
    expect(discordLink).toHaveAttribute("href", mockContact.discord);
  });
});
