import Link from "next/link";
import { getProducts, categories } from "@/lib/products";
import { deleteProduct } from "./actions";

const PRODUCTS_PER_PAGE = 6;

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

function sortProducts(products, sort) {
  const sorted = [...products];

  if (sort === "price-asc") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sort === "title-asc") {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "title-desc") {
    sorted.sort((a, b) => b.name.localeCompare(a.name));
  }

  return sorted;
}

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const search = params?.search ?? "";
  const minPrice = params?.minPrice ?? "";
  const maxPrice = params?.maxPrice ?? "";
  const category = params?.category ?? "";
  const sort = params?.sort ?? "";
  const page = Number(params?.page) || 1;

  const allProducts = await getProducts();
  const filtered = filterProducts(allProducts, { search, minPrice, maxPrice, category });
  const sorted = sortProducts(filtered, sort);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PRODUCTS_PER_PAGE));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginated = sorted.slice(start, start + PRODUCTS_PER_PAGE);

  const hasFilters = search || minPrice || maxPrice || category || sort;

  function createPageLink(newPage) {
    const urlParams = new URLSearchParams();
    if (search) urlParams.append("search", search);
    if (minPrice) urlParams.append("minPrice", minPrice);
    if (maxPrice) urlParams.append("maxPrice", maxPrice);
    if (category) urlParams.append("category", category);
    if (sort) urlParams.append("sort", sort);
    urlParams.append("page", String(newPage));
    return `/products?${urlParams.toString()}`;
  }

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
          key={`${search}-${minPrice}-${maxPrice}-${category}-${sort}`}
          method="GET"
          className="mb-8 grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-5"
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
          <select
            name="sort"
            defaultValue={sort}
            className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">Saralash</option>
            <option value="price-asc">Narx ↑</option>
            <option value="price-desc">Narx ↓</option>
            <option value="title-asc">Nomi A-Z</option>
            <option value="title-desc">Nomi Z-A</option>
          </select>

          <div className="flex gap-3 sm:col-span-2 lg:col-span-5">
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
          Total Products: <span className="text-slate-800">{sorted.length}</span>{" "}
          | Page {currentPage} of {totalPages}
        </p>

        {paginated.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-400">
            Mahsulot topilmadi.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.map((product) => (
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

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {currentPage > 1 && (
              <Link
                href={createPageLink(currentPage - 1)}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                ← Oldingi
              </Link>
            )}

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <Link
                  key={pageNumber}
                  href={createPageLink(pageNumber)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    pageNumber === currentPage
                      ? "bg-indigo-600 text-white"
                      : "border border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {pageNumber}
                </Link>
              )
            )}

            {currentPage < totalPages && (
              <Link
                href={createPageLink(currentPage + 1)}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Keyingi →
              </Link>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
