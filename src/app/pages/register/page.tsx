"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import {
  Button,
  Card,
  Container,
  ErrorMessage,
  Input,
  SignUp,
  Title,
} from "../login/styled";
import Form from "./form";

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

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
