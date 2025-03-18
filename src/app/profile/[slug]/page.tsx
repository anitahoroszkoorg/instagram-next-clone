import ProfileComponent from "@/components/Profile/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Page",
  description: "Profile details page",
};

export default function Page({ params }: { params: { slug: string } }) {
  return <ProfileComponent slug={params.slug} />;
}
