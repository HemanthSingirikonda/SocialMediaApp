import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";

export default function EditProfileModal({ setVisibility }) {
  //   const [open, setOpen] = React.useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    setVisibility(false);
  };

  const handleDelete = async () => {
    // setVisibility(false);
    await axios.delete(`/users/${currentUser._id}`);
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Delete Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete your account?, If so, click the 'Delete
            Profile' button.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Delete Profile</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
