import React, { useEffect, useState } from "react";
import {Box, Grid, SelectChangeEvent, Typography} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUserProfile } from "../UserProfileProvider";
import useUsersQuery from "../hooks/useUsersQuery";
import useRolesQuery from "../hooks/useRolesQuery";
import UsersTable from "./UsersTable";
import RolesTable from "./RolesTable";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import RoleDialog from "./RoleDialog";
import { useQueryClient } from "react-query";
import ProfilePage from "../user/ProfilePage.tsx";

const DashboardAdmin = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { userProfile } = useUserProfile();
    const queryClient = useQueryClient();

    const initialContext =
        searchParams.get("type") === "roles"
            ? "roles"
            : "individuals";

    const [context, setContext] = useState<"individuals" | "roles">(initialContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [confirmationEmail, setConfirmationEmail] = useState("");
    const [userToDelete, setUserToDelete] = useState<string | null>(null);

    const [openRoleDialog, setOpenRoleDialog] = useState(false);
    const [editRole, setEditRole] = useState(false);
    const [roleId, setRoleId] = useState("");
    const [roleName, setRoleName] = useState("");
    const [roleDescription, setRoleDescription] = useState("");
    const [selectedRoles, setSelectedRoles] = useState<{ [userId: string]: string }>({});

    const { data: userData, isLoading, isError } = useUsersQuery({
        page,
        rowsPerPage,
        searchQuery,
        enabled: context === "individuals",
    });

    const { data: roleData, isLoading: isRolesLoading } = useRolesQuery({ enabled: true });

    const token = localStorage.getItem("jwtToken");
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchDeleteUser = async (userId: string) => {
        if (!token) throw new Error("JWT token not found");
        const response = await fetch(`${apiUrl}/api/v1/admin/users/${userId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error("Failed to delete user");
        await queryClient.invalidateQueries("users");
    };

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

    const fetchBlockUnblockUser = async (userId: string, blocked: boolean) => {
        if (!token) throw new Error("JWT token not found");
        const response = await fetch(`${apiUrl}/api/v1/admin/users/${userId}/block`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(blocked),
        });
        if (!response.ok) throw new Error("Failed to block/unblock user");
        await queryClient.invalidateQueries("users");
    };

    const fetchAddUserRole = async (userId: string, roleName: string) => {
        if (!token) throw new Error("JWT token not found");
        const response = await fetch(`${apiUrl}/api/v1/admin/users/${userId}/role`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(roleName),
        });
        if (!response.ok) throw new Error("Failed to add user role");
    };

    const handleBlockUser = async (userId: string) => {
        await fetchBlockUnblockUser(userId, true);
    };

    const handleUnblockUser = async (userId: string) => {
        await fetchBlockUnblockUser(userId, false);
    };

    const handleRoleChange = async (event: SelectChangeEvent, userId: string) => {
        const newRole = event.target.value;
        setSelectedRoles((prev) => ({ ...prev, [userId]: newRole }));
        await fetchAddUserRole(userId, newRole);
    };

    const getSelectedRole = (userId: string) => {
        return selectedRoles[userId] || "";
    };

    useEffect(() => {
        setSearchQuery("");
        setPage(0);
        setRowsPerPage(10);
    }, [context]);

    const handleButtonClick = (selectedContext: "individuals" | "roles") => {
        navigate(`?type=${selectedContext}`);
        setContext(selectedContext);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPage(0);
        setSearchQuery(event.target.value);
    };

    const highlightSearchText = (text: string, query: string) => {
        if (!query.trim()) {
            return <Typography>{text}</Typography>;
        }
        const parts = text.split(new RegExp(`(${query})`, "gi"));
        return (
            <Typography>
                {parts.map((part, index) =>
                        part.toLowerCase() === query.toLowerCase() ? (
                            <span key={index} style={{ backgroundColor: "#c8e6c9" }}>
              {part}
            </span>
                        ) : (
                            <span key={index}>{part}</span>
                        )
                )}
            </Typography>
        );
    };

    const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const handleRemoveUser = async (userId: string) => {
        setUserToDelete(userId);
        setOpenConfirmDialog(true);
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
        setUserToDelete(null);
        setConfirmationEmail("");
    };

    const handleConfirmDelete = async () => {
        if (userProfile?.email === confirmationEmail) {
            if (userToDelete) {
                await fetchDeleteUser(userToDelete);
            }
            setUserToDelete(null);
            setOpenConfirmDialog(false);
            setConfirmationEmail("");
        }
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

    const currentType = searchParams.get("type");

    return (
        <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "#1e1e1e", color: "#fff", display: "flex", flexDirection: "column" }}>
            <Grid container sx={{ flex: 1, overflow: {xs: "auto", md: "hidden", "&::-webkit-scrollbar": {
                        width: "8px",
                        height: "8px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#555",
                        borderRadius: "8px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#888",
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "#2a2a2a",
                    },
                    scrollbarWidth: "thin",
                    scrollbarColor: "#555 #2a2a2a"} }}>
                <Sidebar context={context} handleButtonClick={handleButtonClick} />

                <Grid item xs={12} md={10} sx={{ display: "flex", flexDirection: "column", overflow: "auto" }}>
                    <Topbar />

                    {currentType === "profile" && (
                        <ProfilePage />
                    )}

                    {currentType === "individuals" && (
                        <UsersTable
                            users={userData?.users || []}
                            roles={roleData?.roles || []}
                            searchQuery={searchQuery}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            totalUsers={userData?.noUsers || 0}
                            isLoading={isLoading}
                            isError={isError}
                            handleSearchChange={handleSearchChange}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                            handleBlockUser={handleBlockUser}
                            handleUnblockUser={handleUnblockUser}
                            handleRemoveUser={handleRemoveUser}
                            handleRoleChange={handleRoleChange}
                            getSelectedRole={getSelectedRole}
                            highlightSearchText={highlightSearchText}
                        />
                    )}

                    {currentType === "roles" && (
                        <RolesTable
                            roles={roleData?.roles || []}
                            isLoading={isRolesLoading}
                            onAddNewRole={handleAddNewRole}
                            onEditRole={handleShowDialogEditRole}
                            onRemoveRole={fetchDeleteRole}
                        />
                    )}
                </Grid>
            </Grid>

            <ConfirmDeleteDialog
                open={openConfirmDialog}
                email={confirmationEmail}
                onEmailChange={(e) => setConfirmationEmail(e.target.value)}
                onClose={handleCloseConfirmDialog}
                onConfirm={handleConfirmDelete}
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
        </Box>
    );
};

export default DashboardAdmin;