import React, { useState, useEffect } from "react";
import useUsersQuery from "../hooks/useUsersQuery";
import useRolesQuery from "../hooks/useRolesQuery";
import UsersTable from "./UsersTable";
import {SelectChangeEvent, Typography, useTheme} from "@mui/material";
import {useUserProfile} from "../UserProfileProvider.tsx";
import {useQueryClient} from "react-query";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog.tsx";
import { useLocation } from "react-router-dom";

const IndividualsSection: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const theme = useTheme();

    const { userProfile } = useUserProfile();
    const queryClient = useQueryClient();

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [confirmationEmail, setConfirmationEmail] = useState("");
    const [userToDelete, setUserToDelete] = useState<string | null>(null);

    const [selectedRoles, setSelectedRoles] = useState<{ [userId: string]: string }>({});

    const token = localStorage.getItem("jwtToken");
    const apiUrl = import.meta.env.VITE_API_URL;

    const location = useLocation();

    useEffect(() => {
        setSearchQuery("");
        setPage(0);
        setRowsPerPage(10);
    }, [location.pathname]);

    const { data: userData, isLoading, isError } = useUsersQuery({
        page,
        rowsPerPage,
        searchQuery,
        enabled: true,
    });

    const { data: roleData } = useRolesQuery({ enabled: true });

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

    const highlightSearchText = (text: string, query: string) => {
        if (!query.trim()) {
            return <Typography>{text}</Typography>;
        }
        const parts = text.split(new RegExp(`(${query})`, "gi"));
        return (
            <Typography>
                {parts.map((part, index) =>
                        part.toLowerCase() === query.toLowerCase() ? (
                            <span key={index} style={{ backgroundColor: theme.palette.mode === "dark" ? "#e3b43e" : "#f4e3b6" }}>
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

    const handleConfirmUserDelete = async () => {
        if (userProfile?.email === confirmationEmail) {
            if (userToDelete) {
                await fetchDeleteUser(userToDelete);
            }
            setUserToDelete(null);
            setOpenConfirmDialog(false);
            setConfirmationEmail("");
        }
    };

    const handleRoleChange = async (event: SelectChangeEvent, userId: string) => {
        const newRole = event.target.value;
        setSelectedRoles((prev) => ({ ...prev, [userId]: newRole }));
        await fetchAddUserRole(userId, newRole);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPage(0);
        setSearchQuery(event.target.value);
    };

    const getSelectedRole = (userId: string) => {
        return selectedRoles[userId] || "";
    };

    return (
        <>
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
            <ConfirmDeleteDialog
                open={openConfirmDialog}
                email={confirmationEmail}
                onEmailChange={(e) => setConfirmationEmail(e.target.value)}
                onClose={handleCloseConfirmDialog}
                onConfirm={() => {if (userToDelete) return handleConfirmUserDelete();}}
            />
        </>
    );
};

export default IndividualsSection;
