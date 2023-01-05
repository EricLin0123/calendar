import { useState } from "react";
import { Button, TextField, Box, Stack, Typography } from "@mui/material";

function Signup() {
  const sign_up = () => {
    //button function
  };

  return (
    <Box
      sx={{
        position: "relative",
        top: "20vh",
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Stack
        padding="20px"
        border="2px solid #eeeeee"
        borderRadius="20px"
        direction="column"
        spacing={3}
        width="300px"
        maxWidth={500}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6">Sign up</Typography>

        <TextField required id="name" label="name" variant="outlined" />

        <TextField
          required
          id="email"
          label="email address"
          variant="outlined"
        />

        <TextField
          required
          id="password"
          label="password"
          type="password"
          variant="outlined"
        />

        <Button
          variant="contained"
          onClick={sign_up}
          size="large"
          sx={{ width: "150px" }}
        >
          Sign up
        </Button>
      </Stack>
    </Box>
  );
}

export default Signup;
