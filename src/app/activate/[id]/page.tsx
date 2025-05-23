"use client";
import { StyledButton } from "@/shared/styled/styled";
import { Container, Card, Title } from "./styled";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ActivatePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const sendConfirmation = async () => {
    const response = await fetch("/api/auth/confirmRegistration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: params?.id,
      }),
    });
    if (response.ok) {
      router.push("/login");
    } else {
      toast.error("An error occurred");
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Card>
        <Title>Welcome to Instagram!</Title>
        <StyledButton data-testid="confirmation" onClick={sendConfirmation}>
          Confirm Signup
        </StyledButton>
      </Card>
    </Container>
  );
}
