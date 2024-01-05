import React, { useState } from 'react';
import { TextField, Button, Grid, Stack } from "@mui/material";
import Alert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import VerificationForm from "./VerificationForm";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "@mui/lab/LoadingButton";

const CustomerRegistrationForm = ({ setShowTabList }) => {
  const [userDetails, setUserDetails] = useState({
    fullName: "customer",
    email: "customer@gmail.com",
    password: "123456789",
    phoneNumber: "+212612345611",
    profileImage: undefined,
  });

  const [submitting, setSubmitting] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [step, setStep] = useState('registration');

  const handleProfileImageChange = (event) => {
    var file = event.target.files[0];
    const maxSizeInMB = 2;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      setUserDetails((prevState) => ({
        ...prevState,
        profileImage: undefined,
      }));
      alert("File size exceeds 2MB limit.choose another file");
      return (event.target.value = ""); // Clear the selected file
    }
    setUserDetails((prevState) => ({
      ...prevState,
      profileImage: file,
    }));
  };

  const handleSubmit = async (event) => {
    setShowTabList(false);
    event.preventDefault();
    setSubmitting(true);
    const formData = new FormData();

    formData.append("fullName", userDetails.fullName);
    formData.append("email", userDetails.email);
    formData.append("password", userDetails.password);
    formData.append("phoneNumber", userDetails.phoneNumber);
    formData.append("profileImage", userDetails.profileImage);

    const serverResponse = await fetch("/api/customers/signup", {
      method: "POST",
      body: formData,
    });

    const response = await serverResponse.json();
    setSubmitting(false);

    if (serverResponse.ok) {
      setAlertMessage(response.message);
      setStep('verification');
    } else {
      setAlertMessage(response.message);
      setOpenAlert(true);
    }
  };

  const UserDetailsForm = <form onSubmit={handleSubmit} onChange={() => setOpenAlert(false)} method='POST' >
    <Collapse in={openAlert}  >
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
    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
      {/* full name */}
      <Grid item xs={12} md={6}>
        <TextField
          name="fullName"
          label="Full Name"
          required
          fullWidth
          size="small"
          value={userDetails.fullName}
          onChange={(event) => { setUserDetails((prevState) => ({ ...prevState, fullName: event.target.value })) }}
          inputProps={{
            placeholder: "Name must contain at least 3 characters",
          }}
        />
      </Grid>

      {/* profile image */}
      <Grid item xs={12} md={6}>
        <input
          style={{ display: "none" }}
          id="profileImage"
          type="file"
          accept="image/*"
          name="profileImage"
          onChange={handleProfileImageChange}
        />
        <label htmlFor="profileImage">
          <Button variant="outlined" fullWidth component="span">
            {userDetails.profileImage ? userDetails.profileImage.name : "Profile Image"}
          </Button>
        </label>
      </Grid>

      {/* email */}
      <Grid item xs={12} md={6}>
        <TextField
          name="email"
          label="Email"
          required
          fullWidth
          size="small"
          value={userDetails.email}
          onChange={(event) => { setUserDetails((prevState) => ({ ...prevState, email: event.target.value })) }}
        />
      </Grid>

      {/* phone number */}
      <Grid item xs={12} md={6}>
        <TextField
          name="phoneNumber"
          label="phone number"
          fullWidth
          size="small"
          inputProps={{
            type: "tel",
            pattern: "\\+212[56][0-9]{8}",
            placeholder: "Phone number must be in the format +2126xxxxxx",
          }}
          value={userDetails.phoneNumber}
          onChange={(event) => { setUserDetails((prevState) => ({ ...prevState, phoneNumber: event.target.value })) }}
        />
      </Grid>

      {/* password */}
      <Grid item xs={12}>
        <TextField
          name="password"
          label="password"
          required
          fullWidth
          type="password"
          size="small"
          value={userDetails.password}
          onChange={(event) => { setUserDetails((prevState) => ({ ...prevState, password: event.target.value })) }}
        />
      </Grid>

      <Grid item xs={12}>
        <Stack direction={"row"} spacing={2}>
          <LoadingButton loading={submitting} type="submit" variant="contained" color="primary" disabled={submitting} >
            submit
          </LoadingButton>
          {/* <Button variant="outlined" color="primary" onClick={() => { setStep('verification') }} >
            next
          </Button> */}
        </Stack>
      </Grid>
    </Grid>
  </form>

  return (
    step === 'registration'
      ? UserDetailsForm
      : <VerificationForm email={userDetails.email} message={alertMessage} />

  );
};


export default CustomerRegistrationForm;
