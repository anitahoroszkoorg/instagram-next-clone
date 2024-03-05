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

  const [errorEmail, setErrorEmail] = useState();
  const [errorPassword, setErrorPassword] = useState();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setValues({ email: "", password: "" });
    } catch (error: any) {
      console.log(error.message);
      setErrorPassword(error.response.data.errors[0].msg);
      setErrorEmail(error.response.data.errors[1].msg);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    console.log(response);
  };

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
