import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import { Alert, Collapse } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch } from "react-redux";
import { loginAdmin } from "@/reduxFolder/actions/adminActions";
import axios from "axios";
export default function SignIn() {
  const [email, setEmail] = React.useState("admin1@gmail.com");
  const [password, setPassword] = React.useState("123456789");
  const [remember, setRemember] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState("");
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState("success");
  const [submitting, setSubmitting] = React.useState(false);
  const dispatch = useDispatch();

  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitting(true);
    try {
      const response = await axios.post("/api/auth/admin/login", {
        email: data.get("email"),
        password: data.get("password"),
        remember: data.get("remember"),
      });
      const responseData = await response.data;
      setResponseMessage(responseData.message);
      setAlertSeverity("success");
      setOpenAlert(true);
      setSubmitting(false);
      dispatch(loginAdmin(responseData.user));
      router.push("/admin/dashboard");
    } catch (error) {
      setResponseMessage(error.response.data.message);
      setAlertSeverity("error");
      setOpenAlert(true);
      setSubmitting(false);
    }
    // setSubmitting(false);
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 1,
          p: 5,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "black" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Collapse sx={{ width: "80%" }} in={openAlert}>
          <Alert severity={alertSeverity} onClose={() => setOpenAlert(false)}>
            {responseMessage}
          </Alert>
        </Collapse>
        <Box
          component="form"
          onFocus={() => setOpenAlert(false)}
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            name="rememberMe"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <LoadingButton
            loading={submitting}
            variant="contained"
            type="submit"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
