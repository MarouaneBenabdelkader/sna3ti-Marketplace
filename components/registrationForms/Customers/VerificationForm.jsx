import React from "react";
import { Grid } from "@mui/material";
import Alert from "@mui/material/Alert";


const VerificationForm = ({ email, message }) => {
  return (
    <Grid container>
      <Grid item xs={12} p={1}>
          <Alert
            severity={'success'}
            sx={{padding:2}}
          >
            {message}
            "<b>{email}</b>"
          </Alert>
      </Grid>
    </Grid>
  );
};
export default VerificationForm;
