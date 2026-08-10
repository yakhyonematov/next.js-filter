import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserById } from "@/lib/users";

export default async function UserDetailPage({ params }) {
  const { id } = await params;
  const user = getUserById(Number(id));

  if (!user) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-md">
        <Link href="/users" className="mb-6 inline-block text-sm text-indigo-600">
          ← Orqaga
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-800">{user.name}</h1>
          <p className="mt-2 text-slate-500">{user.email}</p>
          <p className="mt-4 text-sm text-slate-400">ID: {user.id}</p>
        </div>
      </div>
    </main>
  );
}
