import { render, screen } from "@testing-library/react";
import VerifyEmail from "@/app/verifyEmail/page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => "test-token"),
  })),
}));

describe("VerifyEmailPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the verification page", () => {
    render(<VerifyEmail />);
    expect(screen.getByTestId("verifyPage")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<VerifyEmail />);
    expect(container).toMatchSnapshot();
  });
});
