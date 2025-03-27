import {
    Box,
    Checkbox,
    IconButton,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

const ShimmerTableLoader = ({ rows = 6 }: { rows?: number }) => {
    return (
        <TableContainer sx={{ overflow: "auto",
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
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#333" }}>
                        <TableCell sx={{ color: "#fff" }} />
                        <TableCell sx={{ color: "#fff" }}>Member</TableCell>
                        <TableCell sx={{ color: "#fff" }}>Status</TableCell>
                        <TableCell sx={{ color: "#fff" }}>Role</TableCell>
                        <TableCell sx={{ color: "#fff" }}>Last login</TableCell>
                        <TableCell sx={{ color: "#fff" }} align="right">Actions</TableCell>
                    </TableRow>
                    <TableRow sx={{ visibility: "collapse" }}>
                        <TableCell>
                            <Checkbox />
                        </TableCell>
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
                        <TableCell>exampleOfRoleName</TableCell>
                        <TableCell>00000000000000000</TableCell>
                        <TableCell align="right">
                            <IconButton><BlockIcon /></IconButton>
                            <IconButton><DeleteIcon /></IconButton>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.from({ length: rows }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Skeleton variant="rectangular" width={42} height={42} animation="wave" />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" width="80%" height={42} animation="wave" />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="rounded" width="60%" height={42} animation="wave" />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" width="70%" height={42} animation="wave" />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" width="50%" height={42} animation="wave" />
                            </TableCell>
                            <TableCell align="left">
                                <Skeleton variant="rectangular" width={60} height={42} animation="wave" sx={{ ml: "auto" }} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ShimmerTableLoader;
