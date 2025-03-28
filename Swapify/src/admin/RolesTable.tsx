import React from "react";
import {
    Box,
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GridLoader from "react-spinners/GridLoader";

interface Role {
    roleId: string;
    name: string;
    description: string;
}

interface RolesTableProps {
    roles: Role[];
    isLoading: boolean;
    onAddNewRole: () => void;
    onEditRole: (id: string, name: string, desc: string) => void;
    onRemoveRole: (name: string) => void;
}

const RolesTable: React.FC<RolesTableProps> = ({
                                                   roles,
                                                   isLoading,
                                                   onAddNewRole,
                                                   onEditRole,
                                                   onRemoveRole,
                                               }) => {
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

    return (
        <Paper elevation={10} sx={{ backgroundColor: "#2a2a2a", padding: "16px", flex: 1 }}>
            {isLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
                    <GridLoader color="#3CB371" loading={isLoading} cssOverride={override} size={20} />
                </Box>
            ) : (
                <>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="h5">Roles</Typography>
                        <Button
                            variant="contained"
                            sx={{ textTransform: "unset", padding: "10px", backgroundColor: "#2E8B57", color: "#fff" }}
                            onClick={onAddNewRole}
                        >
                            Add new role
                        </Button>
                    </Box>

                    <TableContainer sx={{overflow: "auto",
                        maxHeight: {
                            xs: "auto",
                            md: "calc(100vh - 280px)",
                        },
                        "&::-webkit-scrollbar": {
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
                        scrollbarColor: "#555 #2a2a2a",
                    }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#333" }}>
                                    <TableCell sx={{ backgroundColor: "#333", color: "#fff" }}>Id</TableCell>
                                    <TableCell sx={{ backgroundColor: "#333", color: "#fff" }}>Name</TableCell>
                                    <TableCell sx={{ backgroundColor: "#333", color: "#fff" }}>Description</TableCell>
                                    <TableCell align="right" sx={{ backgroundColor: "#333", color: "#fff" }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {roles.map((role) => (
                                    <TableRow key={role.roleId}>
                                        <TableCell sx={{ color: "#fff" }}>{role.roleId}</TableCell>
                                        <TableCell sx={{ color: "#fff" }}>{role.name}</TableCell>
                                        <TableCell sx={{ color: "#fff" }}>{role.description}</TableCell>
                                        <TableCell align="right" sx={{ color: "#fff" }}>
                                            <IconButton
                                                onClick={() => onEditRole(role.roleId, role.name, role.description)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => onRemoveRole(role.name)}
                                                disabled={role.name === "admin" || role.name === "user"}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </Paper>
    );
};

export default RolesTable;