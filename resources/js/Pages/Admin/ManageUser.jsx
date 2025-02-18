import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

export default function ManageUser({ auth }) {
    const [user, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const [formValues, setFormValues] = useState({
        name: "",
        role: "",
        email: "",
        password: "",
    });

    // Handle Input Change
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    // Handle Role Change (for Select component)
    const handleRoleChange = (value) => {
        setFormValues((prev) => ({ ...prev, role: value }));
    };

    // Handle Form Submission
    const handleFormData = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("createUser", formValues);
            if (response.status === 200) {
                setUsers([...user, response.data.payload]);
                setOpen(false);
            }
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    const [idToDelete, setIdToDelete] = useState();

    const deleteUser = async () => {
        try {
            const res = await axios.delete(`deleteUser/${idToDelete}`);
            if (res.status === 200) {
                // Remove deleted user from state
                setUsers((prevUsers) =>
                    prevUsers.filter((user) => user.id !== idToDelete)
                );
                setDeleteModale(false);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("getUser");
                setUsers(res.data.payload);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="w-full p-3 border-b text-neutral-700 font-bold shadow-sm text-lg">
                Manage User
            </div>

            <div className="w-full flex justify-between p-3">
                <Input placeholder="Search..." className="w-[400px]" />
                <Button onClick={() => setOpen(true)}>Add</Button>
            </div>
            <div className="w-full pl-3 pr-3">
                <Table className="border">
                    {user?.length === 0 ? (
                        <TableCaption>No record.</TableCaption>
                    ) : (
                        <></>
                    )}
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px] pl-5">ID</TableHead>
                            <TableHead>Fullname</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {user.map((items, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium pl-5">
                                    {items.id}
                                </TableCell>
                                <TableCell>{items.name}</TableCell>
                                <TableCell>{items.role}</TableCell>
                                <TableCell className="flex gap-x-2 justify-end items-center">
                                    <Button className="bg-blue-800">
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setIdToDelete(items.id); // Set the ID first
                                            setDeleteModal(true); // Then delete the user
                                        }}
                                        className="bg-red-800"
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent size="xl">
                    <DialogHeader>
                        <DialogTitle>Manage User</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleFormData} className="text-sm">
                        <label>
                            Name
                            <Input
                                name="name"
                                value={formValues.name}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Role
                            <Select onValueChange={handleRoleChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="aics_admin">
                                        Assistance to Individuals in Crisis
                                        Situations (Admin)
                                    </SelectItem>
                                    <SelectItem value="lydo_admin">
                                        Local Youth Development Office (Admin)
                                    </SelectItem>
                                    <SelectItem value="osca_admin">
                                        Office of the Senior Citizen Affairs
                                        (Admin)
                                    </SelectItem>
                                    <SelectItem value="lydo_aics_admin">
                                        LYDO & AICS (Admin)
                                    </SelectItem>
                                    <SelectItem value="receptionist">
                                        Receptionist
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </label>

                        <label>
                            Email
                            <Input
                                type="email"
                                name="email"
                                value={formValues.email}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Password
                            <Input
                                type="password"
                                name="password"
                                value={formValues.password}
                                onChange={handleChange}
                            />
                        </label>

                        <Button type="submit" className="w-full">
                            Create
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={deleteModal} onOpenChange={setDeleteModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={()=>deleteUser()}>Yes, delete it</Button>
                        <Button onClick={()=>setDeleteModal(false)}>Cancel</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
