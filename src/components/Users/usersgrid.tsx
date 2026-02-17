import * as React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import type { User } from "../../models/usermodel";
import { Button, Stack } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useUserStore } from "../../store/userStore";

const UsersGrid: React.FC = () => {
  // const [users, setUsers] = useState<User[]>([]);
  // const [error, setError] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  //from store
  const users = useUserStore((state) => state.users);
  const addUserAction = useUserStore((s) => s.addUserAction);
  const updateUserAction = useUserStore((s) => s.updateUserAction);
  const deleteUserAction = useUserStore((s) => s.deleteUserAction);
  const [form, setForm] = useState<User>({
    // _id: "",
    name: "",
    email: "",
    age: 0,
    // companyName: "",
  });
  console.log("Users in component:", users);
  // useEffect(() => {
  //   const loadUsers = async () => {
  //     try {
  //       const data = await getUsers();
  //       setUsers(data);
  //     } catch (error) {
  //       setError(String(error));
  //     }
  //   };
  //   loadUsers();
  // }, []);

  // const handleEdit = (id: number) => {
  //   const user = users.find((u) => u.id === id);
  //   if (user) {
  //     setSelectedUser(user);
  //     setIsEditMode(true);
  //     setOpen(true);
  //   }
  // };
  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (!selectedUser) return;

    // setSelectedUser({
    //   ...selectedUser,
    //   [e.target.name]: e.target.value,
    // });
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  // const handleSave = async () => {
  //   if (!selectedUser) return;

  //   try {
  //     if (isEditMode) {
  //       // UPDATE
  //       const updatedUser = await updateUser(selectedUser);

  //       setUsers((prev) =>
  //         prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
  //       );
  //     } else {
  //       // ADD
  //     }

  //     setOpen(false);
  //     setSelectedUser(null);
  //   } catch (error) {
  //     console.error(error);
  //     alert("Operation failed");
  //   }
  // };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };
  // const confirmDelete = async () => {
  //   if (deleteId === null) return;
  //   try {
  //     await deleteUser(deleteId);
  //     setUsers((prev) => prev.filter((user) => user.id !== deleteId));

  //     setDeleteOpen(false);
  //     setDeleteId(null);
  //   } catch {
  //     console.log("error");
  //   }
  // };
  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setDeleteId(null);
  };

  //related to store
  useEffect(() => {
    useUserStore.getState().fetchUsers();
  }, []);
  const openAdd = () => {
    setSelectedUser(null);
    setForm({ name: "", email: "", age: 0 });
    setOpen(true);
  };
  const openEdit = (user: User) => {
    setSelectedUser(user);
    setForm(user);
    setOpen(true);
  };
  const handleSave = async () => {
    if (selectedUser) {
      await updateUserAction(form);
    } else {
      await addUserAction(form);
    }

    setOpen(false);
  };
  const confirmDelete = async () => {
    await deleteUserAction(deleteId);
    setDeleteOpen(false);
    setDeleteId(null);
  };
  const columns: GridColDef[] = [
    // { field: "_id", headerName: "ID", width: 90 },
    { field: "name", headerName: "User Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "age", headerName: "Age", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            size="small"
            onClick={() => openEdit(params.row)}
          >
            Edit
          </Button>

          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => {
          setSelectedUser({
            name: "",
            email: "",
            age: 0,
          });
          openAdd();
        }}
      >
        Add User
      </Button>
      {/* <Button variant="contained" onClick={openAdd}>
        Add User
      </Button> */}

      <DataGrid rows={users} columns={columns} getRowId={(row) => row._id} />
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{selectedUser ? "Edit User" : "Add User"}</DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={form?.name}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            label="Email"
            name="email"
            fullWidth
            value={form?.email}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            label="Age"
            name="age"
            fullWidth
            value={form?.age}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {/* {isEditMode ? "Update" : "Add"} */}
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteOpen} onClose={handleDeleteClose}>
        <DialogTitle>Confirm Delete</DialogTitle>

        <DialogContent>
          Are you sure you want to delete this user {deleteId} ?
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>

          <Button color="error" variant="contained" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersGrid;
