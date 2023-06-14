import React from "react";
import { Typography, Link, Container } from "@mui/material";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#f5f5f5",
        padding: "20px 0",
        marginTop: "auto",
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body2" align="center" color="textSecondary">
          &copy; {new Date().getFullYear()} Talent Spot. All rights reserved.
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary">
          Created by Tech
         
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
