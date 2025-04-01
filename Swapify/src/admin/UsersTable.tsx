import React from "react";
import {
    Avatar,
    Box,
    Button,
    IconButton,
    InputAdornment,
    MenuItem,
    Select, SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import SearchIcon from "@mui/icons-material/Search";
import ShimmerUsersTableLoader from "./ShimmerUsersTableLoader.tsx";
import {useGetTheme} from "../hooks/useGetTheme.ts";

interface User {
    userId: string;
    email: string;
    userName: string;
    emailConfirmed: boolean;
    status?: string;
    roleName: string | null;
    phoneNumber?: string;
    lockoutEnd?: string | null;
}

interface Role {
    roleId: string;
    name: string;
    description: string;
}

interface UsersTableProps {
    users: User[];
    roles: Role[];
    searchQuery: string;
    rowsPerPage: number;
    page: number;
    totalUsers: number;
    isLoading: boolean;
    isError: boolean;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangePage: (e: unknown, newPage: number) => void;
    handleChangeRowsPerPage: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlockUser: (userId: string) => void;
    handleUnblockUser: (userId: string) => void;
    handleRemoveUser: (userId: string) => void;
    handleRoleChange: (event: SelectChangeEvent, userId: string) => void;
    getSelectedRole: (userId: string) => string;
    highlightSearchText: (text: string, query: string) => React.ReactNode;
}

const UsersTable: React.FC<UsersTableProps> = ({
                                                   users,
                                                   roles,
                                                   searchQuery,
                                                   rowsPerPage,
                                                   page,
                                                   totalUsers,
                                                   isLoading,
                                                   isError,
                                                   handleSearchChange,
                                                   handleChangePage,
                                                   handleChangeRowsPerPage,
                                                   handleBlockUser,
                                                   handleUnblockUser,
                                                   handleRemoveUser,
                                                   handleRoleChange,
                                                   getSelectedRole,
                                                   highlightSearchText,
                                               }) => {
const theme=useGetTheme();
    return (
        <Box sx={{ padding: "16px", flex: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h5">Individuals</Typography>
                <Button
                    variant="contained"
                    onClick={() => alert("Invite people")}
                >
                    Invite people
                </Button>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <TextField
                    variant="outlined"
                    placeholder="Search by name or email"
                    onChange={handleSearchChange}
                    sx={{ marginRight: 2 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            {isLoading ? (
                <ShimmerUsersTableLoader rows={rowsPerPage} />
            ) : isError ? (

                <Box sx={{ textAlign: "center", marginTop: "2rem" }}>
                    <Typography variant="h6" color="error">
                        Error fetching data
                    </Typography>
                </Box>
            ) : (
                <>
                    <TableContainer sx={{overflow: "auto",
                        maxHeight: {
                            xs: "auto",
                            md: "calc(100vh - 280px)",
                        },
                        scrollbarWidth: "thin",
                    }}>
                        <Table stickyHeader >
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ backgroundColor: theme === "light" ? "#f7e9c7" : "#4a4a4a"}}>Member</TableCell>
                                    <TableCell style={{ backgroundColor: theme === "light" ? "#f7e9c7" : "#4a4a4a"}}>Status</TableCell>
                                    <TableCell style={{ backgroundColor: theme === "light" ? "#f7e9c7" : "#4a4a4a"}}>Role</TableCell>
                                    <TableCell style={{ backgroundColor: theme === "light" ? "#f7e9c7" : "#4a4a4a"}}>Phone</TableCell>
                                    <TableCell style={{ backgroundColor: theme === "light" ? "#f7e9c7" : "#4a4a4a"}} align="right">
                                        Actions
                                    </TableCell>
                                </TableRow>
                                {/* Example of table entry to maintain a fixed header */}
                                <TableRow sx={{ visibility: "collapse" }}>
                                    <TableCell>averyaddress@exampledomain.com</TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                display: "inline-block",
                                                px: 1.5,
                                                py: 0.5,
                                                borderRadius: "999px",
                                                fontSize: "0.8rem",
                                                fontWeight: 500,
                                                textAlign: "center",
                                                minWidth: "90px",
                                            }}
                                        >
                                            exampleOfStatus
                                        </Box>
                                    </TableCell>
                                    <TableCell>exampleOfRole</TableCell>
                                    <TableCell>12345678901234</TableCell>
                                    <TableCell align="right">
                                        <IconButton><BlockIcon /></IconButton>
                                        <IconButton><DeleteIcon /></IconButton>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => {
                                    let userStatus = "Pending";
                                    if (user.emailConfirmed) userStatus = "Confirmed";
                                    else if (user.status) userStatus = user.status;

                                    return (
                                        <TableRow
                                            key={user.userId}
                                            sx={{
                                                backgroundColor: "transparent",
                                                cursor: "pointer",
                                                transition: "background-color 0.2s ease",
                                                "&:hover": {
                                                    backgroundColor: theme==="dark" ? "#3b3b3b" : "#f9f0d8",
                                                },
                                            }}
                                        >
                                            <TableCell
                                                sx={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", cursor: "default" }}
                                                title={user.email}
                                            >
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <Avatar alt={user.userName} src="/avatar.jpg" />
                                                    {highlightSearchText(user.email, searchQuery)}
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Box
                                                    sx={{
                                                        display: "inline-block",
                                                        px: 1.5,
                                                        py: 0.5,
                                                        borderRadius: "999px",
                                                        fontSize: "0.8rem",
                                                        fontWeight: 500,
                                                        color: "#fff",
                                                        backgroundColor: userStatus === "Confirmed" ? "#2E8B57" : "#FFA500",
                                                        textAlign: "center",
                                                        minWidth: "90px",
                                                    }}
                                                >
                                                    {userStatus}
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Select
                                                    variant="standard"
                                                    value={getSelectedRole(user.userId) || user.roleName || ""}
                                                    onChange={(e) => handleRoleChange(e, user.userId)}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    {roles.map((role) => (
                                                        <MenuItem key={role.roleId} value={role.name}>
                                                            {role.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </TableCell>
                                            <TableCell>
                                                {user.phoneNumber || "-"}
                                            </TableCell>
                                            <TableCell align="right">
                                                {user.lockoutEnd === null ? (
                                                    <IconButton
                                                        sx={blockButtonStyle}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleBlockUser(user.userId);
                                                        }}
                                                        aria-label="block"
                                                    >
                                                        <BlockIcon />
                                                    </IconButton>
                                                ) : (
                                                    <IconButton
                                                        sx={blockRedButtonStyle}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleUnblockUser(user.userId);
                                                        }}
                                                        aria-label="block"
                                                    >
                                                        <BlockIcon />
                                                    </IconButton>
                                                )}
                                                <IconButton
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRemoveUser(user.userId);
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, alignItems: "center" }}>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50]}
                            component="div"
                            count={totalUsers}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Box>
                </>
            )}
        </Box>
    );
};

const blockButtonStyle = {
    backgroundColor: "transparent",
    cursor: "pointer",
    alignContent: "center",
};

const blockRedButtonStyle = {
    backgroundColor: "transparent",
    color: "#FF6666",
    cursor: "pointer",
    alignContent: "center",
    "&:hover": {
        backgroundColor: "transparent",
        color: "red",
    },
};

export default UsersTable;
