import type { User, UserApi } from "../models/usermodel";

const API_URL =
  "https://node-mongo-app-hqfya7hue3ddh4d3.centralindia-01.azurewebsites.net";

/* GET users */
export const getUsers = async (): Promise<UserApi[]> => {
  const response = await fetch(`${API_URL}/api/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data: UserApi[] = await response.json();

  return data.map(
    (u): UserApi => ({
      _id: u._id,
      name: u.name,
      email: u.email,
      // companyName: u.company.name,.
      age: u.age,
    }),
  );
};
export const updateUser = async (user: UserApi): Promise<UserApi> => {
  const response = await fetch(`${API_URL}/api/users/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      updateData: {
        name: user.name,
        age: user.age,
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  const data = await response.json();
  return data;
};
export const deleteUser = async (id: string | null): Promise<void> => {
  const response = await fetch(`${API_URL}/api/users/delete/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
};
export const addUser = async (user: User): Promise<UserApi> => {
  const response = await fetch(`${API_URL}/api/users/createUser`, {
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
