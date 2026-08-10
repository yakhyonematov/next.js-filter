export const users = [
  { id: 1, name: "Aziz Karimov", email: "aziz@example.com" },
  { id: 2, name: "Dilnoza Yusupova", email: "dilnoza@example.com" },
  { id: 3, name: "Sardor Rashidov", email: "sardor@example.com" },
  { id: 4, name: "Malika Tosheva", email: "malika@example.com" },
];

export function getUsers() {
  return users;
}

export function getUserById(id) {
  return users.find((user) => user.id === id);
}
