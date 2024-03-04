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

  return (
    <Container>
      <Card>
        <Title>Register to Instagram</Title>
        <form onSubmit={(e) => onSubmit(e)}>
          <Input
            onChange={(e) => onChange(e)}
            type="email"
            id="email"
            name="email"
            value={values.email}
            required
            placeholder="email"
          />
          {errorEmail && <ErrorMessage>{errorEmail}</ErrorMessage>}
          <Input
            onChange={(e) => onChange(e)}
            type="password"
            value={values.password}
            id="password"
            name="password"
            placeholder="passwod"
            required
          />
          {errorPassword && <ErrorMessage>{errorPassword}</ErrorMessage>}
          <Button type="submit">Sign up</Button>
        </form>
        <SignUp href="login">Already have an account? Log in</SignUp>
      </Card>
    </Container>
  );
};

export default Register;
