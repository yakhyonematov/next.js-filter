import { getUsers } from "@/lib/users";

export async function GET() {
  const users = getUsers();
  return Response.json(users);
}
