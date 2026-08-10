import { getUserById } from "@/lib/users";

export async function GET(request, { params }) {
  const { id } = await params;
  const user = getUserById(Number(id));

  if (!user) {
    return Response.json({ error: "Foydalanuvchi topilmadi" }, { status: 404 });
  }

  return Response.json(user);
}
