import React, { CSSProperties, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import SearchIcon from "@mui/icons-material/Search";
import GridLoader from "react-spinners/GridLoader";

import UserMenu from "../user/UserMenu.tsx";
import { useQueryClient } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUserProfile } from "../UserProfileProvider.tsx";
import ProfilePage from "../user/ProfilePage.tsx";
import ShimmerTableLoader from "./ShimmerTableLoader.tsx";
import useUsersQuery from "../hooks/useUsersQuery.tsx";
import useRolesQuery from "../hooks/useRolesQuery.tsx";

type RoleType = string;

interface SelectedRoles {
  [userId: string]: RoleType;
}

const DashboardAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [context, setContext] = useState<"individuals" | "roles">("individuals");

  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editRole, setEditRole] = useState(false);
  const [roleId, setRoleId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<SelectedRoles>({});
  const [roleDescription, setRoleDescription] = useState("");

  const token = localStorage.getItem("jwtToken");

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { userProfile } = useUserProfile();
  const apiUrl = import.meta.env.VITE_API_URL;

  // ======= DELETE USER =======
  const fetchDeleteUser = async (userId: string) => {
    if (!token) {
      throw new Error("JWT token not found");
    }
    const response = await fetch(`${apiUrl}/api/v1/admin/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
    await queryClient.invalidateQueries("users");
  };

  // ======= ADD USER ROLE =======
  const fetchAddUserRole = async (userId: string, roleName: string) => {
    if (!token) {
      throw new Error("JWT token not found");
    }
    const response = await fetch(`${apiUrl}/api/v1/admin/users/${userId}/role`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(roleName),
    });
    if (!response.ok) {
      throw new Error("Failed to add user role");
    }
  };

  // ======= DELETE ROLE =======
  const fetchDeleteRole = async (roleName: string) => {
    if (!token) {
      throw new Error("JWT token not found");
    }
    const response = await fetch(`${apiUrl}/api/v1/admin/roles/${roleName}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete role");
    }
    await queryClient.invalidateQueries("roles");
  };

  // ======= EDIT ROLE =======
  const fetchEditRole = async (
      roleId: string,
      roleName: string,
      roleDescription: string
  ) => {
    if (!token) {
      throw new Error("JWT token not found");
    }
    const response = await fetch(`${apiUrl}/api/v1/admin/roles/${roleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: roleName,
        description: roleDescription,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to edit role");
    }
    await queryClient.invalidateQueries("roles");
  };

  // ======= ADD ROLE =======
  const fetchAddRole = async (roleName: string, roleDescription: string) => {
    if (!token) {
      throw new Error("JWT token not found");
    }
    const response = await fetch(`${apiUrl}/api/v1/admin/roles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: roleName,
        description: roleDescription,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to add role");
    }
    await queryClient.invalidateQueries("roles");
  };

  // ======= BLOCK / UNBLOCK USER =======
  const fetchBlockUnblockUser = async (userId: string, blocked: boolean) => {
    if (!token) {
      throw new Error("JWT token not found");
    }
    const response = await fetch(
        `${apiUrl}/api/v1/admin/users/${userId}/block`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(blocked),
        }
    );
    if (!response.ok) {
      throw new Error("Failed to block/unblock user");
    }
    await queryClient.invalidateQueries("users");
  };

  // ======= REACT-QUERY: USERS =======
  const {
    data,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useUsersQuery({
    page,
    rowsPerPage,
    searchQuery,
    enabled: context === "individuals",
  });

  // ======= REACT-QUERY: ROLES =======
  const {
    data: dataRoles,
    isLoading: isRolesLoading,
    isError: isRolesError,
  } = useRolesQuery({
    enabled: true,
  });

  // ======= EFECTE =======
  // Când se schimbă contextul (Individuals vs Roles), resetăm paginarea
  useEffect(() => {
    setSearchQuery("");
    setPage(0);
    setRowsPerPage(10);
  }, [context]);

  // ======= HANDLERS =======
  const handleCheckboxChange = (userId: string) => {
    const newSelectedRows = selectedRows.includes(userId)
        ? selectedRows.filter((id) => id !== userId)
        : [...selectedRows, userId];
    setSelectedRows(newSelectedRows);
  };

  const handleDeleteSelectedRows = async () => {
    for (const userId of selectedRows) {
      await fetchDeleteUser(userId);
    }
    setSelectedRows([]);
  };

  const handleRemoveUser = async (userId: string) => {
    setUserToDelete(userId);
    setOpenConfirmDialog(true);
  };

  const handleBlockUser = async (userId: string) => {
    await fetchBlockUnblockUser(userId, true);
  };

  const handleUnblockUser = async (userId: string) => {
    await fetchBlockUnblockUser(userId, false);
  };

  const handleChangePage = (
      _: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number
  ) => {
    setPage(newPage);
  };

  const handleRemoveRole = async (roleName: string) => {
    setRoleToDelete(roleName);
    setOpenConfirmDialog(true);
  };

  const handleAddNewRole = () => {
    setRoleName("");
    setRoleDescription("");
    setEditRole(false);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSaveRole = async () => {
    await fetchAddRole(roleName, roleDescription);
    setRoleName("");
    setRoleDescription("");
    setOpenModal(false);
  };

  const handleEditRole = async () => {
    await fetchEditRole(roleId, roleName, roleDescription);
    setRoleId("");
    setRoleName("");
    setRoleDescription("");
    setOpenModal(false);
  };

  const handleShowDialogEditRole = (
      roleId: string,
      roleName: string,
      roleDescription: string
  ) => {
    setRoleId(roleId);
    setRoleName(roleName);
    setRoleDescription(roleDescription);
    setEditRole(true);
    setOpenModal(true);
  };

  const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setSearchQuery(event.target.value);
  };

  // Schimbă tab-ul (Individuals / Roles)
  const handleButtonClick = (selectedContext: "individuals" | "roles") => {
    if (selectedContext === "individuals") {
      navigate("?type=individuals");
    } else if (selectedContext === "roles") {
      navigate("?type=roles");
    }
    setContext(selectedContext);
  };

  const handleRoleChange = async (
      event: SelectChangeEvent<string>,
      userId: string
  ) => {
    const newRole = event.target.value;
    setSelectedRoles((prevSelectedRoles) => ({
      ...prevSelectedRoles,
      [userId]: newRole,
    }));
    await fetchAddUserRole(userId, newRole);
  };

  const getSelectedRole = (userId: string) => {
    return selectedRoles[userId] || "";
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

  const handleConfirmDelete = async () => {
    if (userProfile?.email === confirmationEmail) {
      if (userToDelete) {
        await fetchDeleteUser(userToDelete);
        setUserToDelete(null);
      } else if (roleToDelete) {
        await fetchDeleteRole(roleToDelete);
        setRoleToDelete(null);
      }
      setOpenConfirmDialog(false);
      setConfirmationEmail("");
    }
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setUserToDelete(null);
    setRoleToDelete(null);
  };

  const users = data?.users || [];
  const totalUsers = data?.noUsers || 0;
  const currentType = searchParams.get("type");

  return (
      <Box
          sx={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#1e1e1e",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
      >

        {/* CONȚINUT PRINCIPAL: SIDEBAR STÂNGA + Pagină */}
        <Grid container sx={{ flex: 1, overflow: "hidden" }}>
          {/* SIDEBAR STÂNGA */}
          <Grid
              item
              xs={12}
              md={2}
              sx={{
                backgroundColor: "#2a2a2a",
                display: "flex",
                flexDirection: "column",
                padding: "16px"
              }}
          >
            <Box sx={{ display: "flex", marginLeft: -2, marginBottom: 2}}>
              <img
                  src="../src/assets/logo.svg"
                  alt="Logo"
                  style={{ height: "60px", marginTop: -13, marginRight: -5 }}
              />
              <Typography variant="h6">Swapify</Typography>
            </Box>

            <Typography variant="h6" sx={{ marginBottom: 3 }}>
              Manage
            </Typography>

            {/* Buton Individuals */}
            <Button
                onClick={() => handleButtonClick("individuals")}
                sx={
                  context === "individuals"
                      ? sidebarButtonActive
                      : sidebarButtonInactive
                }
            >
              Individuals
            </Button>

            {/* Buton Roles */}
            <Button
                onClick={() => handleButtonClick("roles")}
                sx={
                  context === "roles" ? sidebarButtonActive : sidebarButtonInactive
                }
            >
              Roles
            </Button>
          </Grid>

          {/* CONTINUT DREAPTA */}
          <Grid
              item
              xs={12}
              md={10}
              sx={{
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
              }}
          >
            {/* BARA DE SUS */}
            <AppBar position="static" sx={{ backgroundColor: "#000", alignItems: "end" }}>
              <Toolbar>

                {/* Meniu cu icon + dropdown */}
                <UserMenu />
              </Toolbar>
            </AppBar>

            {currentType === "profile" && (
                    <ProfilePage />
                )}

            {context === "individuals" && (
                <Paper
                    elevation={10}
                    sx={{ backgroundColor: "#2a2a2a", padding: "16px", flex: 1 }}
                >
                  {/* Header: Titlu + Invite people */}
                  <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "16px",
                      }}
                  >
                    <Typography variant="h5">Individuals</Typography>
                    <Button
                        variant="contained"
                        sx={invitePeopleButtonStyle}
                        onClick={() => alert("Invite people")}
                    >
                      Invite people
                    </Button>
                  </Box>

                  {/* SEARCH BAR */}
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
                    {selectedRows.length >= 1 && (
                        <Button
                            variant="contained"
                            sx={deleteAllButtonEnableStyle}
                            onClick={handleDeleteSelectedRows}
                        >
                          Delete Selected
                        </Button>
                    )}
                  </Box>
                  {/* Loader */}
                  {isUsersLoading && (
                      <ShimmerTableLoader rows={rowsPerPage}/>
                  )}

                  {isUsersError && (
                      <Box sx={{ color: "white", textAlign: "center", marginTop: "2rem" }}>
                        <Typography variant="h6" color="error">
                          Error fetching data
                        </Typography>
                      </Box>
                  )}
                  {/* Tabel cu useri */}
                  {!isUsersLoading && !isUsersError && (
                      <>
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
                                <TableCell sx={{ backgroundColor: "#333", color: "#fff" }} />
                                <TableCell sx={{ backgroundColor: "#333", color: "#fff" }}>Member</TableCell>
                                <TableCell sx={{ backgroundColor: "#333", color: "#fff" }}>Status</TableCell>
                                <TableCell sx={{ backgroundColor: "#333", color: "#fff" }}>Role</TableCell>
                                <TableCell sx={{ backgroundColor: "#333", color: "#fff" }}>
                                  Phone
                                </TableCell>
                                <TableCell sx={{ backgroundColor: "#333", color: "#fff" }} align="right">
                                  Actions
                                </TableCell>
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
                              {users.map((user: any) => {
                                const isItemSelected = selectedRows.includes(
                                    user.userId
                                );

                                // Ex: interpretăm statusul: dacă e blocked => "Blocked", altfel "Pending"/"Active" etc.
                                let userStatus = "Pending";
                                if (user.emailConfirmed) userStatus = "Confirmed";
                                else if (user.status) userStatus = user.status;

                                return (
                                    <TableRow
                                        key={user.userId}
                                        onClick={() => handleCheckboxChange(user.userId)}
                                        sx={{
                                          backgroundColor: selectedRows.includes(user.userId)
                                              ? "#3b3b3b"
                                              : "transparent",
                                          cursor: "pointer",
                                          transition: "background-color 0.2s ease",
                                          "&:hover": {
                                            backgroundColor: selectedRows.includes(user.userId)
                                                ? "#3b3b3b"
                                                : "#2f2f2f",
                                          },
                                        }}
                                    >
                                      <TableCell>
                                        <Checkbox
                                            checked={isItemSelected}
                                            onChange={() =>
                                                handleCheckboxChange(user.userId)
                                            }
                                            sx={{ color: "#fff" }}
                                        />
                                      </TableCell>
                                      <TableCell sx={{
                                        color: "#fff",
                                        maxWidth: 200, // ajustează după nevoie
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        cursor: "default",
                                      }}
                                                 title={user.email}
                                      >
                                        {highlightSearchText(user.email, searchQuery)}
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
                                              backgroundColor:
                                                  userStatus === "Confirmed" ? "#2E8B57" : "#FFA500",
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
                                            value={
                                              getSelectedRole(user.userId) === ""
                                                  ? user.roleName === null
                                                      ? ""
                                                      : user.roleName
                                                  : getSelectedRole(user.userId)
                                            }
                                            onChange={(e) =>
                                                handleRoleChange(e, user.userId)
                                            }
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                          {dataRoles &&
                                              dataRoles.roles.map(
                                                  (role: {
                                                    roleId: string;
                                                    name: string;
                                                    description: string;
                                                  }) => (
                                                      <MenuItem
                                                          key={role.roleId}
                                                          value={role.name}
                                                      >
                                                        {role.name}
                                                      </MenuItem>
                                                  ),
                                              )}
                                        </Select>
                                      </TableCell>
                                      <TableCell sx={{ color: "#fff" }}>
                                        {user.phoneNumber ? user.phoneNumber : "-"}
                                      </TableCell>
                                      <TableCell align="right" sx={{ color: "#fff" }}>
                                        {user.lockoutEnd === null && (
                                            <IconButton
                                                disabled={isItemSelected}
                                                sx={blockButtonStyle}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleBlockUser(user.userId);
                                                }}
                                                aria-label="block"
                                            >
                                              <BlockIcon />
                                            </IconButton>
                                        )}
                                        {user.lockoutEnd !== null && (
                                            <IconButton
                                                disabled={isItemSelected}
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

                                        {/* Delete */}
                                        <IconButton
                                            disabled={isItemSelected}
                                            sx={blockButtonStyle}
                                            onClick={() => handleRemoveUser(user.userId)}
                                            aria-label="delete"
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

                        {/* Footer: buton de Delete Selected + paginare */}
                        <Box sx={paginationContainerStyle}>
                          <TablePagination
                              sx={{
                                color: "#fff",
                              }}
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
                </Paper>
            )}

            {/* ROLES PAGE */}
            {context === "roles" && (
                <Paper
                    elevation={10}
                    sx={{ backgroundColor: "#2a2a2a", padding: "16px", flex: 1 }}
                >
                  {isRolesLoading && (
                      <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "60vh",
                          }}
                      >
                        <GridLoader
                            color="#3CB371"
                            loading={isRolesLoading}
                            cssOverride={override}
                            size={20}
                        />
                      </Box>
                  )}

                  {!isRolesLoading && dataRoles && (
                      <>
                        <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "16px",
                            }}
                        >
                          <Typography variant="h5">Roles</Typography>
                          <Button
                              variant="contained"
                              sx={invitePeopleButtonStyle}
                              onClick={handleAddNewRole}
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
                                <TableCell sx={{ backgroundColor: "#333", color: "#fff" }}>
                                  Description
                                </TableCell>
                                <TableCell align="right" sx={{ backgroundColor: "#333", color: "#fff" }}>Actions</TableCell>
                                <TableCell sx={{ backgroundColor: "#333", color: "#fff" }} />
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {dataRoles.roles.map((role: any) => (
                                  <TableRow key={role.roleId}>
                                    <TableCell sx={{ color: "#fff" }}>
                                      {role.roleId}
                                    </TableCell>
                                    <TableCell sx={{ color: "#fff" }}>
                                      {role.name}
                                    </TableCell>
                                    <TableCell sx={{ color: "#fff" }}>
                                      {role.description}
                                    </TableCell>
                                    <TableCell align="right" sx={{ color: "#fff" }}>
                                      {/* Edit */}
                                      <IconButton
                                          sx={blockButtonStyle}
                                          onClick={() =>
                                              handleShowDialogEditRole(
                                                  role.roleId,
                                                  role.name,
                                                  role.description
                                              )
                                          }
                                      >
                                        <EditIcon />
                                      </IconButton>

                                      {/* Delete (doar dacă nu e admin/user) */}
                                      <IconButton
                                          sx={blockButtonStyle}
                                          onClick={() => handleRemoveRole(role.name)}
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
            )}
          </Grid>
        </Grid>

        {/* DIALOG CONFIRM DELETE */}
        <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your email to confirm the deletion.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                value={confirmationEmail}
                onChange={(e) => setConfirmationEmail(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDialog} color="primary">
              Cancel
            </Button>
            <Button
                onClick={handleConfirmDelete}
                color="primary"
                disabled={!confirmationEmail}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        {/* DIALOG ADD/EDIT ROLE */}
        <Dialog open={openModal} onClose={handleCloseModal}>
          {!editRole ? (
              <DialogTitle>Add New Role</DialogTitle>
          ) : (
              <DialogTitle>Edit Role</DialogTitle>
          )}
          <DialogContent>
            {!editRole ? (
                <DialogContentText>
                  Please enter the details for the new role:
                </DialogContentText>
            ) : (
                <DialogContentText>
                  Please enter the new details for the role:
                </DialogContentText>
            )}
            <TextField
                autoFocus
                margin="dense"
                label="Role Name"
                type="text"
                fullWidth
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
            />
            <TextField
                margin="dense"
                label="Role Description"
                type="text"
                fullWidth
                multiline
                rows={4}
                value={roleDescription}
                onChange={(e) => setRoleDescription(e.target.value)}
            />
            {!editRole ? (
                <DialogContentText>
                  If you want to add the new role, click the Save button.
                </DialogContentText>
            ) : (
                <DialogContentText>
                  If you want to edit the role, click the Edit button.
                </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} sx={cancelButtonStyle}>
              Cancel
            </Button>
            {!editRole ? (
                <Button onClick={handleSaveRole} sx={invitePeopleButtonStyle}>
                  Save
                </Button>
            ) : (
                <Button onClick={handleEditRole} sx={invitePeopleButtonStyle}>
                  Edit
                </Button>
            )}
          </DialogActions>
        </Dialog>
      </Box>
  );
};

// ======= STILURI SUPLIMENTARE =======
const invitePeopleButtonStyle = {
  textTransform: "unset",
  padding: "10px",
  backgroundColor: "#2E8B57",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#3CB371",
  },
};

const sidebarButtonActive = {
  textTransform: "unset",
  justifyContent: "flex-start",
  color: "#fff",
  backgroundColor: "#3b3b3b",
  marginBottom: "8px",
};

const sidebarButtonInactive = {
  textTransform: "unset",
  justifyContent: "flex-start",
  color: "#ccc",
  backgroundColor: "transparent",
  marginBottom: "8px",
  "&:hover": {
    backgroundColor: "#444",
  },
};

const blockButtonStyle = {
  backgroundColor: "transparent",
  color: "#ccc",
  cursor: "pointer",
  alignContent: "center",
  "&:hover": {
    color: "#fff",
  },
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

const paginationContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
  alignItems: "center",
};

const deleteAllButtonEnableStyle = {
  textTransform: "unset",
  padding: "10px",
  backgroundColor: "#2E8B57",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#3CB371",
  },
};

const cancelButtonStyle = {
  textTransform: "unset",
  padding: "10px",
  backgroundColor: "#ccc",
  color: "#000",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#bbb",
  },
};

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default DashboardAdmin;
