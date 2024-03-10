"use client";
import Form from "./form";
import { Card, Container, Title } from "./styled";

export default function LoginPage() {
  return (
    <>
      <Container>
        <Card>
          <Title>Log in to Instagram</Title>
          <Form />
        </Card>
      </Container>
    </>
  );
}
