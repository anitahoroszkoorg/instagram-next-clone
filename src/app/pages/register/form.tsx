"use client";

import { useState } from "react";
import { FormEvent } from "react";
import {
  Button,
  Card,
  Container,
  ErrorMessage,
  Input,
  SignUp,
  Title,
} from "../login/styled";

export default function Form() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    username: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log(formData);
    e.preventDefault();
    try {
      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log({ response });
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      <Input
        name="fullName"
        type="text"
        value={formData.fullName}
        onChange={handleChange}
      />
      <Input
        name="username"
        type="text"
        value={formData.username}
        onChange={handleChange}
      />
      <Button type="submit">Register</Button>
    </form>
  );
}
