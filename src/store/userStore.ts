import { create } from "zustand";
import {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../services/userService";
import type { User } from "../../src/models/usermodel";
interface UserState {
  users: User[];

  fetchUsers: () => Promise<void>;
  addUserAction: (user: User) => Promise<void>;
  updateUserAction: (user: User) => Promise<void>;
  deleteUserAction: (id: number | null) => Promise<void>;
}
export const useUserStore = create<UserState>((set) => ({
  users: [],
  fetchUsers: async () => {
    console.log("fetchUsers called");
    const data = await getUsers();
    console.log("Fetched users:", data);
    set({ users: data });
  },
  addUserAction: async (user) => {
    const newUser = await addUser(user);
    set((state) => ({
      users: [
        ...state.users,
        { ...newUser, id: Math.floor(Math.random() * 100000) },
      ],
    }));
  },
  updateUserAction: async (user) => {
    const updated = await updateUser(user);

    set((state) => ({
      users: state.users.map((u) => (u.id === updated.id ? updated : u)),
    }));
  },
  deleteUserAction: async (id) => {
    await deleteUser(id);
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    }));
  },
}));
