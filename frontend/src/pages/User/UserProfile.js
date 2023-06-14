import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import {
  Email,
  Phone,
  Edit,
} from "@mui/icons-material";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../redux/slices/authSlice";

const UserProfile = () => {
  const { profile } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPassword("");
    setNewPassword("");
    setError("");
  };

  const handleChangePassword = () => {
    
    if (password === "") {
      setError("Please enter a old password.");
      return;
    }

    if (newPassword === "") {
      setError("Please enter a new password.");
      return;
    }

    const change = {
      oldPassword: password,
      newPassword: newPassword
    }
    const data = JSON.stringify(change);
    dispatch(changePassword(data));

    setPassword("");
    setNewPassword("");
    setError("");
    setOpen(false);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography variant="h5" align="center">
                {profile.name}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3,
              }}
            >
              <CardMedia
                component="img"
                image={profile.profileImg}
                alt="Profile Image"
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                }}
              />
            </Box>
            <Typography
              variant="body1"
              gutterBottom
              align="center"
              sx={{ p: 1 }}
            >
              <Email sx={{ mr: 1 }} />
              {profile.email}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              textAlign="center"
              sx={{ p: 1 }}
            >
              <Phone sx={{ mr: 1 }} />
              {profile.mobile}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              align="center"
              sx={{ p: 1 }}
            >
              Gender: {profile.gender}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button
                variant="contained"
                onClick={handleOpen}
                sx={{
                  backgroundColor: "#4CAF50",
                  "&:hover": {
                    backgroundColor: "#45a049", 
                  },
                }}
              >
                Change Password
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}
          <TextField
            type="password"
            label="Old Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            type="password"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleChangePassword} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserProfile;
