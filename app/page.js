import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-4 text-center">
      <h1 className="mb-4 text-3xl font-bold text-slate-800">
        Search &amp; Filtering — Uyga Vazifa
      </h1>
      <p className="mb-8 max-w-md text-slate-500">
        Mahsulotlar ro&apos;yxati, qidiruv va filterlarni ko&apos;rish uchun
        pastdagi tugmani bosing.
      </p>
      <Link
        href="/products"
        className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white shadow transition hover:bg-indigo-700 active:scale-95"
      >
        Mahsulotlarni ko&apos;rish
      </Link>
    </main>
  );
}
