"use client";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { Button, Message, Wrapper } from "./styled";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <Wrapper>
      <Message>Oops! Something went wrong.</Message>
      <Button onClick={() => router.push("/")}>Go Back </Button>
    </Wrapper>
  );
}
