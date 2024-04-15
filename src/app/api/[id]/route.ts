import { findUniqueId } from "@/app/db/findUniqueId";

export async function GET(req: Request, route: { params: { id: string } }) {
  const id = route.params.id;
  console.log(id);
  await findUniqueId(id);
}
