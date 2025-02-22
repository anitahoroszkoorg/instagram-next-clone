import { ProfileComponent } from "@/components/Profile/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Page",
  description: "Profile details page",
};
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return (
    <>
      <ProfileComponent slug={slug} />
    </>
  );
}
