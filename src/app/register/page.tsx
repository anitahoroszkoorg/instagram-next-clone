"use client";
import { Card, Container, SignUp, Title } from "../login/styled";
import Form from "./form";

const Register = () => {
  return (
    <Container>
      <Card>
        <Title>Register to Instagram</Title>
        <Form />
        <SignUp href="login">Already have an account? Log in</SignUp>
      </Card>
    </Container>
  );
};

export default Register;
