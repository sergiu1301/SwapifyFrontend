import {
    IconButton,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useGetTheme} from "../hooks/useGetTheme.ts";

const ShimmerRolesTableLoader = ({ rows = 2 }: { rows?: number }) => {
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
                    {Array.from({ length: rows }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Skeleton variant="text" width="70%" height={42} animation="wave" />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" width="50%" height={42} animation="wave" />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" width="50%" height={42} animation="wave" />
                            </TableCell>
                            <TableCell align="left">
                                <Skeleton variant="rectangular" width={70} height={42} animation="wave" sx={{ ml: "auto" }} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ShimmerRolesTableLoader;
