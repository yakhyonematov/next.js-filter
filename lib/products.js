import fs from "fs/promises";
import path from "path";

const dataFile = path.join(process.cwd(), "data", "products.json");

export const categories = ["Phone", "Laptop", "Headphones", "Watch"];

export async function getProducts() {
  const data = await fs.readFile(dataFile, "utf-8");
  return JSON.parse(data);
}

export async function getProductById(id) {
  const products = await getProducts();
  return products.find((product) => product.id === id);
}

export async function saveProducts(products) {
  await fs.writeFile(dataFile, JSON.stringify(products, null, 2));
}
