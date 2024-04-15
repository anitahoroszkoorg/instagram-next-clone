"use client";
import { Card, Container, SignUp, Title } from "./styled";

export default function verifyEmail() {
  return (
    <Container>
      <Card>
        <Title>Thank you for registering to Instagram!</Title>
        Please activate your account via link we sent you on your email address.
        <SignUp href="/login">Already an active user? Log in here</SignUp>
      </Card>
    </Container>
  );
}
