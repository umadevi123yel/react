import type { User, UserApi } from "../models/usermodel";

const API_URL = "https://jsonplaceholder.typicode.com/users";

/* GET users */
export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data: UserApi[] = await response.json();

  return data.map(
    (u): User => ({
      id: u.id,
      name: u.name,
      email: u.email,
      companyName: u.company.name,
    }),
  );
};
export const updateUser = async (user: User): Promise<User> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${user.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  const data = await response.json();
  return data;
};
export const deleteUser = async (id: number | null): Promise<void> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
};
export const addUser = async (user: User): Promise<User> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to add user");
  }

  return await response.json();
};
