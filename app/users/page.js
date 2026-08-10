import Link from "next/link";
import { getUsers } from "@/lib/users";

export default function UsersPage() {
  const users = getUsers();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-800">
          Foydalanuvchilar
        </h1>

        <div className="flex flex-col gap-3">
          {users.map((user) => (
            <Link
              key={user.id}
              href={`/users/${user.id}`}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div>
                <p className="font-semibold text-slate-800">{user.name}</p>
                <p className="text-sm text-slate-400">{user.email}</p>
              </div>
              <span className="text-indigo-600">→</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
