import { render, screen, waitFor, act } from "@testing-library/react";
import Footer from "../../client-components/main/Footer";

jest.useFakeTimers();

describe("Footer", () => {
  it("displays correct Vietnam time and date", async () => {
    render(<Footer />);
    act(() => {
      jest.advanceTimersByTime(1000); // Chờ 1 giây để useEffect chạy
    });

    await waitFor(() => {
      const timeElement = screen.getByText(
        /Updating time...|(\d{1,2}:\d{2}:\d{2} (AM|PM))/
      );
      const dateElement = screen.getByText(
        /Updating date...|\d{1,2}\/\d{1,2}\/\d{4}/
      );
      expect(timeElement).toBeInTheDocument();
      expect(dateElement).toBeInTheDocument();
    });
  });

  it("displays copyright and contact link", () => {
    render(<Footer />);
    expect(screen.getByText(/©\d{4} Biên niên sử các anh hùng/)).toBeInTheDocument();
    expect(screen.getByText("Contact Me")).toBeInTheDocument();
  });
});

afterAll(() => {
  jest.useRealTimers();
});
