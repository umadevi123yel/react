import { create } from "zustand";
import {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../services/userService";
import type { User, UserApi } from "../../src/models/usermodel";
interface UserState {
  users: UserApi[];

  fetchUsers: () => Promise<void>;
  addUserAction: (user: User) => Promise<void>;
  updateUserAction: (user: UserApi) => Promise<void>;
  deleteUserAction: (id: string | null) => Promise<void>;
}
export const useUserStore = create<UserState>((set) => ({
  users: [],
  fetchUsers: async () => {
    console.log("fetchUsers called");
    const data = await getUsers();
    console.log("Fetched users:", data);
    set({ users: data });
  },
  addUserAction: async (user: User) => {
    const newUser = await addUser(user);
    set((state) => ({
      users: [...state.users, { ...newUser }],
    }));
  },
  updateUserAction: async (user: UserApi) => {
    const updated = await updateUser(user);
    set((state) => ({
      users: state.users.map((u) => (u._id === updated._id ? updated : u)),
    }));
  },
  deleteUserAction: async (id: string | null) => {
    await deleteUser(id);
    set((state) => ({
      users: state.users.filter((u) => u._id !== id),
    }));
  },
}));
