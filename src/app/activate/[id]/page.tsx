"use client";
import { Container, Card, Title, Button } from "./styled";

export const Page = async ({ params }: { params: { id: string } }) => {
  console.log(params?.id);
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
    if (!response.ok) {
      throw new Error("Failed to confirm activation");
    }
    const data = await response.json();
    console.log(data);
  };

  return (
    <Container>
      <Card>
        <Title>Welcome to Instagram!</Title>
        <Button onClick={sendConfirmation}>Confirm Signup</Button>
      </Card>
    </Container>
  );
};

export default Page;
