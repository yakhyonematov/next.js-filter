import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, categories } from "@/lib/products";
import { updateProduct } from "../../actions";

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-2xl font-bold text-slate-800">
          Mahsulotni tahrirlash
        </h1>

        <form
          action={updateProduct}
          className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <input type="hidden" name="id" value={product.id} />

          <input
            type="text"
            name="name"
            defaultValue={product.name}
            required
            className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
          <input
            type="number"
            name="price"
            defaultValue={product.price}
            required
            className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
          <select
            name="category"
            defaultValue={product.category}
            required
            className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
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
              Saqlash
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
