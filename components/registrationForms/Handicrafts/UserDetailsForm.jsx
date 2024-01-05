import { useState } from "react";
import { TextField, Button, Grid, Stack, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const UserDetailsForm = ({ setStep }) => {
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    profileImage: null,
    carft: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  // const [profileImageName, setProfileImageName] = React.useState(undefined);
  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    const maxSizeInMB = 2;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      setUserDetails((prevState) => ({
        ...prevState,
        profileImage: null,
      }));
      alert("File size exceeds 2MB limit.choose another file");
      return (event.target.value = ""); // Clear the selected file
    }
    setProfileImageName(file.name);
    setUserDetails((prevState) => ({
      ...prevState,
      profileImage: file,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    const formData = new FormData(event.target);
    const serverResponse = await fetch("/api/handicrafts/signup", {
      method: "POST",
      body: formData,
    });

    const response = await serverResponse.json();

    if (serverResponse.ok) {
      setSubmitting(false);
      setAlertSeverity("success");
      setAlertMessage(response.message);
      setOpenAlert(true);
      setStep('verification');
    } else {
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
        {/* full name */}
        <Grid item xs={12} md={6}>
          <TextField
            name="fullName"
            label="Full Name"
            required
            fullWidth
            size="small"
            inputProps={{
              required: true,
              pattern: "[A-Za-z ]{3,}",
              placeholder: "Name must contain at least 3 characters",
              //TODO: remove the default value
              defaultValue: "John Doe",
            }}
          />
        </Grid>

        {/* profile image */}
        <Grid item xs={12} md={6}>
          <input
            // className={classes.input}
            style={{ display: "none" }}
            id="profileImage"
            type="file"
            accept="image/*"
            name="profileImage"
            onChange={handleProfileImageChange}
          />
          <label htmlFor="profileImage">
            <Button variant="outlined" fullWidth component="span">
              {profileImageName ? profileImageName : "Choose A Profile Image"}
            </Button>
          </label>
        </Grid>

        {/* craft */}
        <Grid item xs={12} md={6}>
          <FormControl required fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Craft</InputLabel>
            <Select
              name="craft"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userDetails.craft}
              label="craft"
            >
              {predefinedCrafts.map((craft, index) => (
                <MenuItem key={index} value={craft}>
                  {craft}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* address */}
        <Grid item xs={12} md={6}>
          <TextField
            name="address"
            label="Address"
            required
            fullWidth
            size="small"
            //TODO: remove the default value
            defaultValue="Address 123 Imb Park, Morocco"
          />
        </Grid>

        {/* email */}
        <Grid item xs={12} md={6}>
          <TextField
            name="email"
            label="Email"
            required
            fullWidth
            size="small"
            //TODO: remove the default value
            defaultValue="email@example.com"
          />
        </Grid>

        {/* phone number */}
        <Grid item xs={12} md={6}>
          <TextField
            name="phoneNumber"
            label="phone number"
            required
            fullWidth
            size="small"
            inputProps={{
              type: "tel",
              required: true,
              pattern: "\\+212[56][0-9]{8}",
              placeholder: "Phone number must be in the format +2126xxxxxx",
            }}
            //TODO: remove the default value
            defaultValue="+212612345678"
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
            //TODO: remove the default value
            defaultValue="123456789"
          />
        </Grid>

        <Grid item xs={12}>
          <Stack direction={"row"} spacing={2}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>

            <Button
              variant="outlined"
              color="primary"
              onClick={() => setStep(2)}
            >
              Next
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};
const predefinedCrafts = [
  "woodworking",
  "sewing",
  "pottery",
  "painting",
  "knitting",
];
export default UserDetailsForm;
