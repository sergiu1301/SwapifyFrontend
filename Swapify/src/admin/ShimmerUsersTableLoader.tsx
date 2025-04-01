import {
    Box,
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
import {useGetTheme} from "../hooks/useGetTheme.ts";

const ShimmerUsersTableLoader = ({ rows = 6 }: { rows?: number }) => {
    const theme=useGetTheme();
    return (
        <TableContainer sx={{ overflow: "auto",
            maxHeight: {
                xs: "auto",
                md: "calc(100vh - 280px)",
            },
            scrollbarWidth: "thin",
        }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell style={{backgroundColor: theme === "light" ? "#f7e9c7" : "#4a4a4a"}}>Member</TableCell>
                        <TableCell style={{backgroundColor: theme === "light" ? "#f7e9c7" : "#4a4a4a"}}>Status</TableCell>
                        <TableCell style={{backgroundColor: theme === "light" ? "#f7e9c7" : "#4a4a4a"}}>Role</TableCell>
                        <TableCell style={{backgroundColor: theme === "light" ? "#f7e9c7" : "#4a4a4a"}}>Phone</TableCell>
                        <TableCell style={{backgroundColor: theme === "light" ? "#f7e9c7" : "#4a4a4a"}} align="right">Actions</TableCell>
                    </TableRow>
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
                    {Array.from({ length: rows }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Skeleton variant="rounded" width="80%" height={42} animation="wave" />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="rounded" width="60%" height={42} animation="wave" />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" width="70%" height={42} animation="wave" />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" width="70%" height={42} animation="wave" />
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

export default ShimmerUsersTableLoader;
