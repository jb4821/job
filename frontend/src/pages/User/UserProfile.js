import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import {
  Email,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Edit,
} from "@mui/icons-material";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { profile } = useSelector((state) => state.auth);

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
              <IconButton color="primary" aria-label="Edit">
                <Edit />
              </IconButton>
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
              <button className="btn btn-primary">Change Password</button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default UserProfile;

