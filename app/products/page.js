import Link from "next/link";
import { getProducts, categories } from "@/lib/products";
import { deleteProduct } from "./actions";

function filterProducts(products, { search, minPrice, maxPrice, category }) {
  const query = (search || "").trim().toLowerCase();

  return products.filter((product) => {
    const matchesSearch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      String(product.price).includes(query);

    const matchesCategory = !category || product.category === category;
    const matchesMin = !minPrice || product.price >= Number(minPrice);
    const matchesMax = !maxPrice || product.price <= Number(maxPrice);

    return matchesSearch && matchesCategory && matchesMin && matchesMax;
  });
}

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const search = params?.search ?? "";
  const minPrice = params?.minPrice ?? "";
  const maxPrice = params?.maxPrice ?? "";
  const category = params?.category ?? "";

  const allProducts = await getProducts();
  const filtered = filterProducts(allProducts, { search, minPrice, maxPrice, category });
  const hasFilters = search || minPrice || maxPrice || category;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
            Mahsulotlar
          </h1>
          <Link
            href="/products/new"
            className="rounded-lg bg-emerald-600 px-5 py-2 font-medium text-white shadow transition hover:bg-emerald-700 active:scale-95"
          >
            + Mahsulot qo&apos;shish
          </Link>
        </div>

        <form
          method="GET"
          className="mb-8 grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-4"
        >
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Qidirish (nomi yoki narxi)"
            className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
          <input
            type="number"
            name="minPrice"
            defaultValue={minPrice}
            placeholder="Min narx"
            className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
          <input
            type="number"
            name="maxPrice"
            defaultValue={maxPrice}
            placeholder="Max narx"
            className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
          <select
            name="category"
            defaultValue={category}
            className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">All</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <div className="flex gap-3 sm:col-span-2 lg:col-span-4">
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white shadow transition hover:bg-indigo-700 active:scale-95"
            >
              Qidirish
            </button>
            {hasFilters && (
              <Link
                href="/products"
                className="rounded-lg border border-slate-300 bg-white px-5 py-2 font-medium text-slate-600 transition hover:bg-slate-50 active:scale-95"
              >
                Clear Filters
              </Link>
            )}
          </div>
        </form>

        <p className="mb-4 text-sm font-medium text-slate-500">
          Total Products: <span className="text-slate-800">{filtered.length}</span>
        </p>

        {filtered.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-400">
            Mahsulot topilmadi.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 text-3xl transition group-hover:bg-indigo-100">
                  {product.emoji}
                </div>
                <h2 className="text-lg font-semibold text-slate-800">
                  {product.name}
                </h2>
                <p className="mt-1 text-sm text-slate-400">{product.category}</p>
                <p className="mt-3 text-xl font-bold text-indigo-600">
                  ${product.price}
                </p>

                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/products/${product.id}/edit`}
                    className="flex-1 rounded-lg border border-slate-300 px-3 py-1.5 text-center text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    Tahrirlash
                  </Link>
                  <form action={deleteProduct} className="flex-1">
                    <input type="hidden" name="id" value={product.id} />
                    <button
                      type="submit"
                      className="w-full rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
                    >
                      O&apos;chirish
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
