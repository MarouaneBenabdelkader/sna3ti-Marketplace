import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Avatar,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "@/reduxFolder/actions/userActions";
import LoadingButton from "@mui/lab/LoadingButton";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { useRouter } from "next/router";
export default function SignInModal({ open, setOpen }) {
  const [email, setEmail] = useState("customer4@gmail.com");
  const [password, setPassword] = useState("123456789");
  const [submitting, setSubmitting] = useState(false);
  const [buttonColor, setButtonColor] = useState("primary");

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlerttMessage] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    let res = await response.json();
    if (response.ok) {
      setButtonColor("success");
      dispatch(loginUser(res.user));
      console.log(res.user);
      
      if (res.user.role === "handicraft") {
        router.push("/handicraft/dashboard");
      } else {
        router.push("/items");
        let response = await fetch("/api/customers/profile")
        let res = await response.json()
        dispatch(loginUser(res.data))
      }
      setOpen(false)
    } else {
      setOpenAlert(true);
      setAlerttMessage(res.message);
    }

    setSubmitting(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: "0px",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="close drawer"
          onClick={handleClose}
          sx={{ position: "absolute", top: "0px", left: "0px" }}
        >
          <CloseIcon />
        </IconButton>
        <Avatar sx={{ bgcolor: "black" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="span" variant="h5" align="center">
          Sign in
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit} onChange={() => setOpenAlert(false)}>
        <Collapse in={openAlert}>
          <Alert
            severity="error"
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
            sx={{ mb: 2 }}
          >
            {alertMessage}
          </Alert>
        </Collapse>

        <DialogContent sx={{ marginTop: 0 }}>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            fullWidth
            value={email}
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setOpenAlert(false)}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setOpenAlert(false)}
          />
          <Stack>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Stack>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            loading={submitting}
            type="submit"
            variant="contained"
            color={buttonColor}
            sx={{
              width: "100%",
              marginBottom: 2,
              marginX: 2,
              alignSelf: "center",
              justifySelf: "center",
            }}
            size="large"
          >
            <span>Submit</span>
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}
