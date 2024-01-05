import NextLink from "next/link";
// import MuiLink from "@mui/material/Link";
import { Grid, TextField, Button } from "@mui/material";
/* import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../reduxFolder/userSlice"; */
import Alert from "@mui/material/Alert";
import React from "react";
function ChangePasswordTab() {
  const [userDetails, setUserDetails] = React.useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const serverResponse = await fetch("/api/changePassword", {
        method: "POST",
        body: formData,
      });

      // If response is ok, then parse it to JSON
      if (serverResponse.ok) {
        const response = await serverResponse.json();
        console.log(response);
      } else {
        console.error("Server response was not ok.", serverResponse);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        spacing={2}
      >
        {/* old password */}
        <Grid item xs={12}>
          <TextField
            name="oldPassword"
            label="Old Password"
            type="password"
            required
            fullWidth
            size="large"
          />
        </Grid>
        {/* new password */}
        <Grid item xs={12}>
          <TextField
            name="newPassword"
            label="new Password"
            type="password"
            required
            fullWidth
            size="large"
          />
        </Grid>

        {/* confirmed password */}
        <Grid item xs={12}>
          <TextField
            name="confirmedPassword"
            label="confirm new Password"
            type="password"
            required
            fullWidth
            size="large"
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            change password
          </Button>
        </Grid>

        {/* link Forgot password */}
        <Grid item xs={12}>
          <NextLink href="/password/reset">Forgot password?</NextLink>
        </Grid>
      </Grid>
    </form>
  );
}
export default ChangePasswordTab;
