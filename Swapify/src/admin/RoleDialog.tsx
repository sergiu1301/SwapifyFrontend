import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    Button,
} from "@mui/material";

interface RoleDialogProps {
    open: boolean;
    editMode: boolean;
    roleName: string;
    roleDescription: string;
    onRoleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRoleDescChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClose: () => void;
    onSave: () => void;
}

const RoleDialog: React.FC<RoleDialogProps> = ({
                                                   open,
                                                   editMode,
                                                   roleName,
                                                   roleDescription,
                                                   onRoleNameChange,
                                                   onRoleDescChange,
                                                   onClose,
                                                   onSave,
                                               }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{editMode ? "Edit Role" : "Add New Role"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {editMode
                        ? "Please enter the new details for the role:"
                        : "Please enter the details for the new role:"}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Role Name"
                    type="text"
                    fullWidth
                    value={roleName}
                    onChange={onRoleNameChange}
                />
                <TextField
                    margin="dense"
                    label="Role Description"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    value={roleDescription}
                    onChange={onRoleDescChange}
                />
                <DialogContentText>
                    {editMode
                        ? "If you want to edit the role, click the Edit button."
                        : "If you want to add the new role, click the Save button."}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} sx={{ backgroundColor: "#ccc", color: "#000" }}>
                    Cancel
                </Button>
                <Button onClick={onSave} sx={{ backgroundColor: "#2E8B57", color: "#fff" }}>
                    {editMode ? "Edit" : "Save"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RoleDialog;