import React from "react";
import { TextField, Button, Grid } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { AlertTitle } from "@mui/material";
import { Collapse } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const VerificationForm = ({ phoneNumber, message }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [openAlert, setOpenAlert] = useState(true);
  const [alertMessage, setAlertMessage] = useState(message);
  const [alertSeverity, setAlertSeverity] = useState("success");


  // React.useEffect(() => {
  //   setAlertMessage(message);
  // }, [message]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    const serverResponse = await fetch("/api/auth/verifyPhone", {
      method: "POST",
      body: JSON.stringify({ verificationCode, phoneNumber }),
    });

    const response = await serverResponse.json();
    setSubmitting(false);

    if (serverResponse.ok) {
      setAlertMessage(response.message);
      setAlertSeverity("success");
      setOpenAlert(true);
    } else {
      setAlertMessage(response.message);
      setAlertSeverity("error");
      setOpenAlert(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} onChange={() => setOpenAlert(false)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Collapse in={openAlert}>
            <Alert
              severity={alertSeverity}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {alertMessage}
            </Alert>
          </Collapse>
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="verificationCode"
            label="Enter The Verification Code Here"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default VerificationForm;
