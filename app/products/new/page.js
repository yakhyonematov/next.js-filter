import Link from "next/link";
import { categories } from "@/lib/products";
import { createProduct } from "../actions";

export default function NewProductPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-2xl font-bold text-slate-800">
          Yangi mahsulot qo&apos;shish
        </h1>

        <form
          action={createProduct}
          className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <input
            type="text"
            name="name"
            placeholder="Mahsulot nomi"
            required
            className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
          <input
            type="number"
            name="price"
            placeholder="Narxi"
            required
            className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
          <select
            name="category"
            required
            defaultValue=""
            className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="" disabled>
              Kategoriya tanlang
            </option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white shadow transition hover:bg-indigo-700 active:scale-95"
            >
              Qo&apos;shish
            </button>
            <Link
              href="/products"
              className="rounded-lg border border-slate-300 bg-white px-5 py-2 font-medium text-slate-600 transition hover:bg-slate-50 active:scale-95"
            >
              Bekor qilish
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
