"use client";
import Form from "./form";
import { Card, Container, SignUp, Title } from "./styled";

export default function LoginPage() {
  return (
    <>
      <Container>
        <Card>
          <Title>Log in to Instagram</Title>
          <Form />
          <SignUp href="/register">Dont have an account? Sign up</SignUp>
        </Card>
      </Container>
    </>
  );
}
