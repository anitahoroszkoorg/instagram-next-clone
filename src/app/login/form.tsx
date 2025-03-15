"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { Input, StyledForm } from "./styled";
import { StyledButton } from "@/shared/styled/styled";

export default function Form() {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    router.push("/");
    router.refresh();
  };
  return (
    <StyledForm onSubmit={handleSubmit}>
      <Input name="email" type="email" placeholder="Email" required />
      <Input name="password" type="password" placeholder="Password" required />
      <StyledButton type="submit">Login</StyledButton>
    </StyledForm>
  );
}
