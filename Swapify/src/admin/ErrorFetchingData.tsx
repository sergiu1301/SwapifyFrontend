import { Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const ErrorFetchingData = ({ rows = 6 }: { rows?: number }) => {
    return (
        <TableContainer sx={{ overflow: "auto", maxHeight: "48vh" }}>
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
                </TableHead>
                <TableBody>
                    {Array.from({ length: rows }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Skeleton variant="circular" width={24} height={24} animation="wave" />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" width="80%" height={20} animation="wave" />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" width="60%" height={20} animation="wave" />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" width="70%" height={20} animation="wave" />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" width="50%" height={20} animation="wave" />
                            </TableCell>
                            <TableCell align="left">
                                <Skeleton variant="rectangular" width={60} height={24} animation="wave" sx={{ ml: "auto" }} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ErrorFetchingData;
