"use client";
import { Container, Card, Title, Button } from "./styled";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const sendConfirmation = async () => {
    const response = await fetch("/api/auth/confirmRegistration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        custom_id: params?.id,
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
        <Button onClick={sendConfirmation}>Confirm Signup</Button>
      </Card>
    </Container>
  );
};

export default Page;
