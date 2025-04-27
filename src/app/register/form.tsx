"use client";
import { FormEvent } from "react";
import { Input, StyledForm } from "../login/styled";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LandingButton } from "@/components/Landing/styled";

export default function Form() {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
        username: formData.get("username"),
        full_name: formData.get("full_name"),
      }),
    });

    if (response.ok) {
      router.push("/verifyEmail");
    } else {
      const errorMessage = await response.json();
      toast.error(errorMessage.message || "An error occurred");
    }
  };

  return (
    <>
      <ToastContainer />
      <StyledForm onSubmit={handleSubmit}>
        <Input placeholder="email" name="email" type="email" required />
        <Input
          name="password"
          type="password"
          placeholder="password"
          required
        />
        <Input name="username" type="text" placeholder="username" required />
        <Input name="full_name" type="text" placeholder="full name" required />
        <LandingButton type="submit">Register</LandingButton>
      </StyledForm>
    </>
  );
}
