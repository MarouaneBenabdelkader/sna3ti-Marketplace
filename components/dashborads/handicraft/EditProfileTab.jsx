import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import React from "react";
import { TextField, Button, Grid } from "@mui/material";

import { Box } from "@mui/system";
function EditProfileTab() {
  const [userDetails, setUserDetails] = React.useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    profileImageName: null,
    carft: "",
  });
  const [profileImageName, setProfileImageName] = React.useState(undefined);

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    // Do something with the file
    const maxSizeInMB = 2;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    if (file.size > maxSizeInBytes) {
      setProfileImageName(undefined);
      alert("File size exceeds 2MB limit.choose another file");
      return (event.target.value = ""); // Clear the selected file
    }
    setProfileImageName(file.name);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const serverResponse = await fetch("/api/handicrafts/updateProfile", {
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
        {/* full name */}
        <Grid item xs={12} md={12}>
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
        <Grid item xs={12} md={7}>
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
              {profileImageName ? profileImageName : "Profile Image"}
            </Button>
          </label>
        </Grid>

        {/* craft */}
        <Grid item xs={12} md={5}>
          <FormControl required fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Craft</InputLabel>
            <Select
              name="craft"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={20}
              label="craft"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* address */}
        <Grid item xs={12} >
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
        <Grid item xs={12} >
          <TextField
            name="email"
            label="Email"
            required
            fullWidth
            size="small"
            //TODO: remove the default value
            defaultValue="email@example.com"
            disabled
          />
        </Grid>

        {/* phone number */}
        <Grid item xs={12} >
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

        <Grid item xs={12}>
          <Button type="submit" size={'large'} variant="contained" color="primary">
            save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
export default EditProfileTab;