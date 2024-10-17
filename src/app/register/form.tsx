"use client";
import { FormEvent } from "react";
import { Button, Input } from "../login/styled";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Form() {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
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
      <form onSubmit={handleSubmit}>
        <Input placeholder="email" name="email" type="email" />
        <Input name="password" type="password" placeholder="password" />
        <Input name="username" type="text" placeholder="user name" />
        <Input name="full_name" type="text" placeholder="full name" />
        <Button type="submit">Register</Button>
      </form>
    </>
  );
}
