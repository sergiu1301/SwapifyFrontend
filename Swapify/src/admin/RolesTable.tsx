import React from "react";
import {
    Box,
    Button,
    IconButton,
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
import {useGetTheme} from "../hooks/useGetTheme.ts";
import ShimmerRolesTableLoader from "./ShimmerRolesTableLoader.tsx";

interface Role {
    roleId: string;
    name: string;
    description: string;
}

interface RolesTableProps {
    roles: Role[];
    isLoading: boolean;
    isError: boolean;
    onAddNewRole: () => void;
    onEditRole: (id: string, name: string, desc: string) => void;
    onRemoveRole: (name: string) => void;
}

const RolesTable: React.FC<RolesTableProps> = ({
                                                   roles,
                                                   isLoading,
                                                   isError,
                                                   onAddNewRole,
                                                   onEditRole,
                                                   onRemoveRole}) => {

const theme=useGetTheme();
    return (
        <Box sx={{ padding: "16px", flex: 1}}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h5">Roles</Typography>
                <Button
                    variant="contained"
                    sx={{ textTransform: "unset" }}
                    onClick={onAddNewRole}
                >
                    Add new role
                </Button>
            </Box>

            {isLoading ? (
                <ShimmerRolesTableLoader rows={2} />
            ) : isError ? (

                <Box sx={{ textAlign: "center", marginTop: "2rem" }}>
                    <Typography variant="h6" color="error">
                        Error fetching data
                    </Typography>
                </Box>
            ) : (<TableContainer sx={{overflow: "auto",
                maxHeight: {
                    xs: "auto",
                    md: "calc(100vh - 280px)",
                },
                scrollbarWidth: "thin",
            }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{backgroundColor: theme === "light" ? "#f7e9c7" : "#4a4a4a"}}>Id</TableCell>
                            <TableCell style={{backgroundColor: theme === "light" ? "#f7e9c7" : "#4a4a4a"}}>Name</TableCell>
                            <TableCell style={{backgroundColor: theme === "light" ? "#f7e9c7" : "#4a4a4a"}}>Description</TableCell>
                            <TableCell style={{backgroundColor: theme === "light" ? "#f7e9c7" : "#4a4a4a"}} align="right">Actions</TableCell>
                        </TableRow>
                        <TableRow sx={{ visibility: "collapse" }}>
                            <TableCell>c50d8d05-ef5b-40fb-8ea2-45d3bfe67cf0</TableCell>
                            <TableCell>exampleOfRoleName</TableCell>
                            <TableCell>exampleOfRoleDescription</TableCell>
                            <TableCell align="right">
                                <IconButton><EditIcon /></IconButton>
                                <IconButton><DeleteIcon /></IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {roles.map((role) => (
                            <TableRow key={role.roleId} sx={{
                                backgroundColor: "transparent",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
                                "&:hover": {
                                    backgroundColor: theme==="dark" ? "#3b3b3b" : "#f9f0d8",
                                },
                            }}>
                                <TableCell>{role.roleId}</TableCell>
                                <TableCell>{role.name}</TableCell>
                                <TableCell>{role.description}</TableCell>
                                <TableCell align="right">
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
            )}
        </Box>
    );
};

export default RolesTable;