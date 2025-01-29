import { ProfileComponent } from "@/components/Profile/Profile";

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
