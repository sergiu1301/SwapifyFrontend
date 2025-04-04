import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useUserProfile } from "../UserProfileProvider";
import useRolesQuery from "../hooks/useRolesQuery";
import RolesTable from "./RolesTable";
import RoleDialog from "./RoleDialog";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

const RolesSection: React.FC = () => {
    const { userProfile } = useUserProfile();
    const queryClient = useQueryClient();
    const token = localStorage.getItem("jwtToken");
    const apiUrl = import.meta.env.VITE_API_URL;

    const { data: roleData, isLoading, isError } = useRolesQuery({ enabled: true });

    const [openRoleDialog, setOpenRoleDialog] = useState(false);
    const [editRole, setEditRole] = useState(false);
    const [roleId, setRoleId] = useState("");
    const [roleName, setRoleName] = useState("");
    const [roleDescription, setRoleDescription] = useState("");
    const [roleToDelete, setRoleToDelete] = useState<string | null>(null);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [confirmationEmail, setConfirmationEmail] = useState("");

    const fetchDeleteRole = async (roleName: string) => {
        if (!token) throw new Error("JWT token not found");
        const response = await fetch(`${apiUrl}/api/v1/admin/roles/${roleName}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error("Failed to delete role");
        await queryClient.invalidateQueries("roles");
    };

    const fetchAddRole = async (name: string, description: string) => {
        if (!token) throw new Error("JWT token not found");
        const response = await fetch(`${apiUrl}/api/v1/admin/roles`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name, description }),
        });
        if (!response.ok) throw new Error("Failed to add role");
        await queryClient.invalidateQueries("roles");
    };

    const fetchEditRole = async (id: string, name: string, description: string) => {
        if (!token) throw new Error("JWT token not found");
        const response = await fetch(`${apiUrl}/api/v1/admin/roles/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name, description }),
        });
        if (!response.ok) throw new Error("Failed to edit role");
        await queryClient.invalidateQueries("roles");
    };

    const handleAddNewRole = () => {
        setEditRole(false);
        setRoleId("");
        setRoleName("");
        setRoleDescription("");
        setOpenRoleDialog(true);
    };

    const handleShowDialogEditRole = (id: string, name: string, desc: string) => {
        setEditRole(true);
        setRoleId(id);
        setRoleName(name);
        setRoleDescription(desc);
        setOpenRoleDialog(true);
    };

    const handleCloseRoleDialog = () => {
        setOpenRoleDialog(false);
        setRoleName("");
        setRoleDescription("");
        setEditRole(false);
    };

    const handleSaveRole = async () => {
        if (editRole) {
            await fetchEditRole(roleId, roleName, roleDescription);
        } else {
            await fetchAddRole(roleName, roleDescription);
        }
        handleCloseRoleDialog();
    };

    const handleRemoveRole = async (roleName: string) => {
        setRoleToDelete(roleName);
        setOpenConfirmDialog(true);
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
        setRoleToDelete(null);
        setConfirmationEmail("");
    };

    const handleConfirmRoleDelete = async () => {
        if (userProfile?.email === confirmationEmail && roleToDelete) {
            await fetchDeleteRole(roleToDelete);
            handleCloseConfirmDialog();
        }
    };

    return (
        <>
            <RolesTable
                roles={roleData?.roles || []}
                isLoading={isLoading}
                isError={isError}
                onAddNewRole={handleAddNewRole}
                onEditRole={handleShowDialogEditRole}
                onRemoveRole={handleRemoveRole}
            />

            <RoleDialog
                open={openRoleDialog}
                editMode={editRole}
                roleName={roleName}
                roleDescription={roleDescription}
                onRoleNameChange={(e) => setRoleName(e.target.value)}
                onRoleDescChange={(e) => setRoleDescription(e.target.value)}
                onClose={handleCloseRoleDialog}
                onSave={handleSaveRole}
            />

            <ConfirmDeleteDialog
                open={openConfirmDialog}
                email={confirmationEmail}
                onEmailChange={(e) => setConfirmationEmail(e.target.value)}
                onClose={handleCloseConfirmDialog}
                onConfirm={() => {if (roleToDelete) return handleConfirmRoleDelete();}}
            />
        </>
    );
};

export default RolesSection;
