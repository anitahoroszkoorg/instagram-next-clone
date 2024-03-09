"use client";

import { FormEvent } from "react";
import { Button, Input } from "../login/styled";
import { useRouter } from "next/navigation";

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
      router.push("/pages/login");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 mx-auto max-w-md mt-10"
    >
      <Input
        placeholder="email"
        name="email"
        className="border border-black text-black"
        type="email"
      />
      <Input
        name="password"
        className="border border-black  text-black"
        type="password"
        placeholder="password"
      />
      <Input
        name="username"
        className="border border-black  text-black"
        type="text"
        placeholder="user name"
      />
      <Input
        name="full_name"
        className="border border-black  text-black"
        type="text"
        placeholder="full name"
      />
      <Button type="submit">Register</Button>
    </form>
  );
}
