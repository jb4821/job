import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { userforgotPassword } from "../redux/slices/authSlice";


const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userforgotPassword({email: email}))
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom sx={{ m: 4 }}>
            Forgot Password?
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                backgroundColor: "#4CAF50",
                "&:hover": {
                  backgroundColor: "#45a049",
                },
              }}
            >
              {loading ? <p>Loading....</p> : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
