import NextLink from "next/link";
// import MuiLink from "@mui/material/Link";
import { Grid, TextField, Button } from "@mui/material";
/* import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../reduxFolder/userSlice"; */
import Alert from "@mui/material/Alert";
import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import CustomCollapse from "@/components/CustomCollapse";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
function ChangePasswordTab() {
  const [submitting, setSubmitting] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState("success");

  const [values, setValues] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmedPassword: "",
    showOldPassword: false,
    showNewPassword: false,
    showConfirmedPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleToggleVisibility = (prop) => (event) => {
    setValues({ ...values, [prop]: !values[prop] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (values.oldPassword === values.newPassword) {
      setAlertMessage("New password cannot be same as old password");
      setAlertSeverity("error");
      setOpenAlert(true);
      return;
    } else if (
      values.newPassword !== values.confirmedPassword
    ) {
      setAlertMessage("New password and confirmed password do not match");
      setAlertSeverity("error");
      setOpenAlert(true);
      return;
    }

    setSubmitting(true);
    try {
      const res = await axios.put("/api/auth/update-password", {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
      setAlertMessage("Password changed successfully");
      setAlertSeverity("success");
      setOpenAlert(true);
      setSubmitting(false);
    } catch (err) {
      setAlertMessage(err.response.data.message);
      setAlertSeverity("error");
      setOpenAlert(true);
      setSubmitting(false);
    } finally {
      setValues({ ...values, oldPassword: "", newPassword: "", confirmedPassword: ""});
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} onFocus={() => setOpenAlert(false)} >
        <CustomCollapse
          openAlert={openAlert}
          setOpenAlert={setOpenAlert}
          alertMessage={alertMessage}
          alertSeverity={alertSeverity}
        ></CustomCollapse>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type={values.showOldPassword ? "text" : "password"}
              label="Old Password"
              value={values.oldPassword}
              onChange={handleChange("oldPassword")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleToggleVisibility("showOldPassword")}
                    >
                      {values.showOldPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type={values.showNewPassword ? "text" : "password"}
              label="New Password"
              value={values.newPassword}
              onChange={handleChange("newPassword")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleToggleVisibility("showNewPassword")}
                    >
                      {values.showNewPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type={values.showConfirmedPassword ? "text" : "password"}
              label="Confirm New Password"
              value={values.confirmedPassword}
              onChange={handleChange("confirmedPassword")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleToggleVisibility("showConfirmedPassword")}
                    >
                      {values.showConfirmedPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              loading={submitting}
              type="submit"
              variant="contained"
              color="primary"
            >
              change password
            </LoadingButton>
          </Grid>
          {/* link Forgot password */}
          <Grid item xs={12}>
            <NextLink href="/password/reset">Forgot password?</NextLink>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
export default ChangePasswordTab;
// const seondForm = <form onSubmit={() => {}}>
// <CustomCollapse
//   openAlert={openAlert}
//   setOpenAlert={setOpenAlert}
//   alertMessage={alertMessage}
//   alertSeverity={alertSeverity}
// ></CustomCollapse>
// <Grid container spacing={2}>
//   {/* old password */}
//   <Grid item xs={12}>
//     <TextField
//       name="oldPassword"
//       label="Old Password"
//       type="password"
//       required
//       fullWidth
//       size="large"
//     />
//   </Grid>
//   {/* new password */}
//   <Grid item xs={12}>
//     <TextField
//       name="newPassword"
//       label="new Password"
//       type="password"
//       required
//       fullWidth
//       size="large"
//     />
//   </Grid>
//   {/* confirmed password */}
//   <Grid item xs={12}>
//     <TextField
//       name="confirmedPassword"
//       label="confirm new Password"
//       type="password"
//       required
//       fullWidth
//       size="large"
//     />
//   </Grid>
//   <Grid item xs={12}>
//     <LoadingButton
//       loading={submitting}
//       type="submit"
//       variant="contained"
//       color="primary"
//     >
//       change password
//     </LoadingButton>
//   </Grid>
//   {/* link Forgot password */}
//   <Grid item xs={12}>
//     <NextLink href="/password/reset">Forgot password?</NextLink>
//   </Grid>
// </Grid>
// </form>;
