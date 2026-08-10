"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getProducts, saveProducts } from "@/lib/products";

export async function createProduct(formData) {
  const products = await getProducts();

  const newProduct = {
    id: Date.now(),
    name: formData.get("name"),
    price: Number(formData.get("price")),
    category: formData.get("category"),
    emoji: "🛒",
  };

  products.push(newProduct);
  await saveProducts(products);

  revalidatePath("/products");
  redirect("/products");
}

export async function updateProduct(formData) {
  const id = Number(formData.get("id"));
  const products = await getProducts();

  const index = products.findIndex((product) => product.id === id);
  if (index !== -1) {
    products[index] = {
      ...products[index],
      name: formData.get("name"),
      price: Number(formData.get("price")),
      category: formData.get("category"),
    };
    await saveProducts(products);
  }

  revalidatePath("/products");
  redirect("/products");
}

export async function deleteProduct(formData) {
  const id = Number(formData.get("id"));
  const products = await getProducts();

  const filtered = products.filter((product) => product.id !== id);
  await saveProducts(filtered);

  revalidatePath("/products");
}
