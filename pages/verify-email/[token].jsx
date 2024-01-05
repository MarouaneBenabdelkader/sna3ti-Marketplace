import DefualtLayout from "@/components/dashborads/DefualtLayout";
import { Alert, AlertTitle, Box, Button,Grid, Paper } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";
function VerifyEmail({ response }) {
  const [email, setEmail] = React.useState("");
  const handelClick = async () => {
    const response = await fetch(`${process.env.DOMAINNAME}/api/auth/resend-verification-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    console.log(data);
  };

  let element;
  switch (response.status) {
    case 200:
      element = (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          {response.message}
        </Alert>
      );
      break;
    case 400:
      element = (
        <>
          <Alert severity="error">
            <AlertTitle>{response.error}</AlertTitle>
            {response.message}
          </Alert>
          <Grid container>
            <Grid item xs={12} p={1}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} p={1}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handelClick}
              >
                Send A Verification Email
              </Button>
            </Grid>
          </Grid>
        </>
      );
      break;
    case 500:
      element = (
        <Alert severity="error">
          <AlertTitle>{response.error}</AlertTitle>
          {response.message}
        </Alert>
      );
      break;
    default:
      element = (
        <Alert severity="error">
          <AlertTitle>Not Found</AlertTitle>
          <code>404</code> | Email Not Found
        </Alert>
      );
      break;
  }
  return (
    <DefualtLayout>
      <Box
        position="absolute"
        top={"50%"}
        left={"50%"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
          gap: 2,
          width: {
            xs: "95%",
            md: "27%",
          },
          height: 400,
          transform: "translate(-50%, -50%)",
          boxShadow: 4,
        }}
      >
        <h1>Email Verification</h1>
        <Paper width={"100%"} height={400} elevation={4}>
          {element}
        </Paper>
      </Box>
    </DefualtLayout>
  );
}

export default VerifyEmail;
export async function getServerSideProps(context) {
  const { params } = context;
  const { token } = params;
  const response = await fetch(
    `${process.env.DOMAINNAME}/api/auth/verify-email/${token}`
  );
  const data = await response.json();
  return {
    props: {
      response: data,
    },
  };
}
