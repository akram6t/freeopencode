'use client'

import { AdminPageWrapper } from "@/components/admin/AdminPageWrapper"
import { UserTable } from "./user-table"
import { UserForm } from "./user-form"
import { DialogForm } from "@/components/admin/DialogForm"
import { DialogDelete } from "@/components/admin/DialogDelete"
import { User } from "@/types/types"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function UsersPage() {
    const { toast } = useToast();
    const [users, setUsers] = useState<User[]>([
        {
            id: 1,
            userId: "user1",
            fullName: "John Doe",
            email: "john@example.com",
            role: "user" as const,
            isVerified: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ])

    const [showDialog, setShowDialog] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [userIdToDelete, setUserIdToDelete] = useState<string>("")

    const breadcrumpItems = [
        { name: "Dashboard", href: "/admin" },
        { name: "Users" }
    ]

    const handleCreate = async (data: any) => {
        try {
            setIsLoading(true)
            // Add API call here
            const newUser = {
                id: users.length + 1,
                userId: `user${users.length + 1}`,
                fullName: data.fullName,
                email: data.email,
                role: data.role,
            }
            setUsers([...users, newUser])
            setShowDialog(false)
            toast({ description: "User created successfully" })
        } catch (error) {
            toast({
                variant: 'destructive',
                description: "Failed to create user"
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleUpdate = async (data: any) => {
        try {
            setIsLoading(true)
            // Add API call here
            const updatedUsers = users.map(user =>
                user.userId === selectedUser?.userId ? { ...user, ...data } : user
            )
            setUsers(updatedUsers)
            setShowDialog(false)
            toast({
                description: "User updated successfully"
            })
        } catch (error) {
            toast({
                variant: 'destructive',
                description: "Failed to update user"
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async () => {
        try {
            setIsLoading(true)
            // Add API call here
            const filteredUsers = users.filter(user => user.userId !== userIdToDelete)
            setUsers(filteredUsers)
            setShowDeleteDialog(false)
            toast({ description: "User deleted successfully" })
        } catch (error) {
            toast({
                variant: 'destructive',
                description: "Failed to delete user"
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleEdit = (user: User) => {
        setSelectedUser(user)
        setShowDialog(true)
    }

    const handleDeleteClick = (userId: string) => {
        setUserIdToDelete(userId)
        setShowDeleteDialog(true)
    }

    const handleAddNew = () => {
        setSelectedUser(null)
        setShowDialog(true)
    }

    return (
        <AdminPageWrapper
            actionButtonName="Add User"
            onActionButtonClick={handleAddNew}
            navTitle="Users"
            breadcrumpItems={breadcrumpItems}
        >
            <div className="h-10" />
            <UserTable
                users={users}
                onDelete={handleDeleteClick}
                onEdit={handleEdit}
            />

            <DialogForm
                title={selectedUser ? "Edit User" : "Add User"}
                open={showDialog}
                setOpen={setShowDialog}
                formType={selectedUser ? "edit" : "add"}
            >
                <UserForm
                    initialData={selectedUser || undefined}
                    isLoading={isLoading}
                    onSubmit={selectedUser ? handleUpdate : handleCreate}
                />
            </DialogForm>

            <DialogDelete
                title="User"
                open={showDeleteDialog}
                setOpen={setShowDeleteDialog}
                onSubmit={handleDelete}
                isLoading={isLoading}
            />
        </AdminPageWrapper>
    )
}