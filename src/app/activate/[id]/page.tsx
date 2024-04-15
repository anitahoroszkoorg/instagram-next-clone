"use client";
import { Container, Card, Title, Button } from "./styled";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Page = ({ params }: { params: { id: string } }) => {
  //this page has to check wheter the user with this id is already activated and if the id in params is valid
  //A GET REQUEST WITH THE ID TO CHECK ISACTIVE === TRUE
  //A GET REQUEST TO CHECK IF THE PARAMS ARE VALID
  useEffect(() => {
    fetch(`/api/idCheck/${params.id}`);
  }, []);

  const router = useRouter();
  const sendConfirmation = async () => {
    const response = await fetch("/api/auth/confirmRegistration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        custom_id: params?.id,
      }),
    });
    if (response.ok) {
      router.push("/login");
    } else {
      const errorMessage = await response.json();
      console.log(errorMessage);
      toast.error(errorMessage.message || "An error occurred");
    }
    router.push("/login");
  };

  return (
    <Container>
      <ToastContainer />
      <Card>
        <Title>Welcome to Instagram!</Title>
        <Button onClick={sendConfirmation}>Confirm Signup</Button>
      </Card>
    </Container>
  );
};

export default Page;
