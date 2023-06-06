import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import {
  Email,
  Phone,
  Facebook,
  Twitter,
  Instagram,
} from "@mui/icons-material";
import Navbar from "../../components/Navbar";

const UserProfile = () => {
  return (
    <>
      <Navbar />

      <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
        <Container className="py-5 h-100">
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            className="h-100"
          >
            {/* <div>UserProfile</div> */}
            <Grid item lg={6} className="mb-4 mb-lg-0">
              <Card className="mb-3" sx={{ borderRadius: ".5rem" }}>
                <Grid container spacing={0}>
                  <Grid
                    item
                    md={4}
                    className="gradient-custom text-center text-white"
                    sx={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CardMedia
                      component="img"
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="Avatar"
                      className="my-5"
                      sx={{ width: "80px" }}
                    />
                    <Typography variant="h5" style={{ color: "black" }}>
                      Marie Horwitz
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "start",
                        color: "black",
                      }}
                    ></Box>
                    <a href="#!">
                      <Twitter
                        sx={{ marginRight: "3px", color: "black" }}
                        fontSize="large"
                      />
                    </a>
                    <Box />

                    <Typography variant="body1" style={{ color: "black" }}>
                      Web Designer
                    </Typography>
                    <Box mt={5}>
                      <Email fontSize="large" />
                    </Box>
                  </Grid>
                  <Grid item md={8}>
                    <CardContent className="p-4">
                      <Typography variant="h6">Information</Typography>
                      <hr className="mt-0 mb-4" />
                      <Grid container spacing={1}>
                        <Grid  className="mb-3">
                          <Typography variant="h6">Email: jjeesdfdsdfdsf</Typography>
                          <Typography variant="body2" className="text-muted">
                            info@example.com
                          </Typography>
                          <Typography variant="h6">Mobile: 9977554433</Typography>
                          <Typography variant="body2" className="text-muted">
                            info@example.com
                          </Typography>
                        </Grid>
                        </Grid>
                      {/* <Box sx={{ display: "flex", justifyContent: "start" }}>
                        <a href="#!">
                          <Facebook
                            sx={{ marginRight: "3px" }}
                            fontSize="large"
                          />
                        </a>
                        <a href="#!">
                          <Twitter
                            sx={{ marginRight: "3px" }}
                            fontSize="large"
                          />
                        </a>
                        <a href="#!">
                          <Instagram fontSize="large" />
                        </a>
                      </Box> */}
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
};

export default UserProfile;
