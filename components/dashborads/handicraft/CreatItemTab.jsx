import { TextField, Typography, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import IosShareIcon from '@mui/icons-material/IosShare';
import LoadingButton from "@mui/lab/LoadingButton";
import { Grid, Stack, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
const CreatItemTab = () => {
  const [itemName, setItemName] = useState("lorem ipsum");
  const [description, setDescription] = useState(
    "lorem ipsum lomusin simm smion"
  );
  const [price, setPrice] = useState(200);
  const [images, setImages] = useState(undefined);

  const [submitting, setSubmitting] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const handleSubmit = async (event) => {
    setSubmitting(true);
    event.preventDefault();
    if (images === undefined) {
      setOpenAlert(true);
      setAlertMessage("Please select at least one image");
      setAlertSeverity("error");
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("itemName", itemName);
    formData.append("description", description);
    formData.append("price", price);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    let res = await fetch("/api/handicrafts/items", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      res = await res.json();
      setSubmitting(false);
      setOpenAlert(true);
      setAlertMessage(res.message);
      setAlertSeverity("success");
      setItemName("");
      setDescription("");
      setPrice(0);
      setImages(undefined);
      
    } else {
      res = await res.json();
      setSubmitting(false);
      setOpenAlert(true);
      setAlertMessage(res.message);
      setAlertSeverity("error");
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      console.log("File name: " + files[i].name);
      console.log("File size: " + files[i].size);
      console.log("File type: " + files[i].type);
      console.log("Last modified: " + files[i].lastModifiedDate);
    }
    if (files.size > 4) {
      setImages(undefined);
      alert("You can only upload a maximum of 4 images");
      return (e.target.value = ""); // Clear the selected file
    }
    setImages(files);
  };

  return (
    <Stack
      component={"section"}
      sx={{
        //q add box shadow
        boxShadow: {
          xs: `0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)`,
          md: `0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)`,
        },
        width: {
          xs: 11 / 12,
          md: 10 / 12,
        },
        margin: "auto",
        marginTop: 2,
        height: "80%",
        padding: 1,
      }}
    >
      <Box display={"flex"} mt={4} gap={2} width={'100%'} justifyContent={'center'} alignItems={"center"}>
        <Typography variant={"h6"} display={{ xs: "flex", md: "none" }}>
          Publish An Item
        </Typography>
        <IosShareIcon fontSize="large" />
      </Box>

      <Collapse in={openAlert} sx={{ marginTop: 1 ,alignSelf:'center',m:1}}>
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
          sx={{ mb: 2 }}
        >
          {alertMessage}
        </Alert>
      </Collapse>
      <form
        onSubmit={handleSubmit}
        onFocus={() => setOpenAlert(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={2}
          width={{ xs: 11 / 12, md: 10 / 12 }}
          
        >
          <Grid item xs={12}>
            <TextField
              name="itemName"
              label="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              name="price"
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              fullWidth
              required
              inputProps={{
                min: 1,
              }}
            />
          </Grid>

          <Grid item xs={12} md={9}>
            <TextField
              name="description"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={1}
              inputProps={{
                placeholder: "A brief discription about the item",
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <input
              style={{ display: "none" }}
              id="images"
              type="file"
              accept="image/*"
              name="images"
              onChange={handleImageChange}
              multiple
            />
            <label htmlFor="images">
              <Button variant="outlined" fullWidth component="span">
                Choose a set of images for the item
              </Button>
            </label>
          </Grid>
          <Grid item>
            <LoadingButton
              loading={submitting}
              type="submit"
              variant="contained"
              sx={{
                alignSelf: "center",
                justifySelf: "center",
              }}
              size="large"
            >
              <span>Submit</span>
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Stack>
  );
};
export default CreatItemTab;
