import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditTweet({ setVisibility, desc, id, tweetId }) {
  const [newtweet, setNewtweet] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    // console.log(newtweet);
    setVisibility(false);
  };

  const handleEdit = async () => {
    try {
      await axios.put(`/tweets/${tweetId}`, {
        description: newtweet,
      });
      window.location.reload();
      setVisibility(false);
      // navigate(`/profile/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/tweets/${tweetId}`);
      window.location.reload();
      setVisibility(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Edit or Delete Tweet</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit the tweet, edit in the input field, and click on 'Edit
            Tweet' button. To delete the tweet, click on 'Delete Tweet' button
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            // value={newtweet}
            defaultValue={desc}
            onChange={(e) => setNewtweet(e.target.value)}
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEdit}>Edit Tweet</Button>
          <Button onClick={handleDelete}>Delete Tweet</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
