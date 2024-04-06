"use client";
import React from "react";
import { Container, Card, Title, Button } from "./styled";
import router from "next/router";

export default function ConfirmActivation() {
  const sendConfirmation = async () => {
    try {
      const response = await fetch("/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      if (!response.ok) {
        throw new Error("Failed to confirm activation");
      } else {
        router.push("/");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error confirming activation:", error);
    }
  };

  return (
    <Container>
      <Card>
        <Title>Welcome to Instagram!</Title>
        <Button onClick={sendConfirmation}>Confirm Signup</Button>
      </Card>
    </Container>
  );
}
