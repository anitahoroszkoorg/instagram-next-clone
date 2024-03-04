"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  Button,
  Card,
  Container,
  Title,
  Input,
  ForgotPassword,
  SignUp,
  CardItemsWrapper,
} from "./styled";

function LoginPage() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setValues({ email: "", password: "" });
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <Container>
      <Card>
        <CardItemsWrapper>
          {" "}
          <Title>Log in to Instagram</Title>
          <form onSubmit={(e) => onSubmit(e)}>
            <Input
              placeholder="email"
              onChange={(e) => onChange(e)}
              type="email"
              id="email"
              name="email"
              value={values.email}
              required
            />
            <Input
              type="password"
              onChange={(e) => onChange(e)}
              value={values.password}
              id="password"
              name="password"
              placeholder="passwod"
              required
            />
            <Button type="submit">Log in</Button>
          </form>
          <ForgotPassword href="#">Forgot password?</ForgotPassword>
          <SignUp href="register">Dont have an account? Sign up</SignUp>
        </CardItemsWrapper>
      </Card>
    </Container>
  );
}

export default LoginPage;
