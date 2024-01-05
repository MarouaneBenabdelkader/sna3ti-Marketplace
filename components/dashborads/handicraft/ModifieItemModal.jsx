import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Typography,
  Stack,
  Grid,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
function ModifieItemModal({ open, handleClose, item,setItems }) {
  const [modifiedItemName, setModifiedItemName] = useState("");
  const [modifiedDescription, setModifiedDescription] = useState("");
  const [modifiedPrice, setModifiedPrice] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);

  const [submitting, setSubmitting] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [imagesToUpload, setImagesToUpload] = useState([]);
  const handleSave = () => {
    // Perform save action with the modified item data and selected images
    // ...
    // handleClose();
    setSubmitting(true);
    axios
      .put(
        `/api/handicrafts/items/${item._id}`,
        fieldsToBeModified(
          {
            itemName: modifiedItemName,
            description: modifiedDescription,
            price: modifiedPrice,
            images: selectedImages,
          },
          item
        )
      )
      .then((res) => {
        console.log(res);
        setAlertMessage("Item updated successfully");
        setAlertSeverity("success");
        setOpenAlert(true);
        setSubmitting(false);
        setItems((prevItems) => {
          const index = prevItems.findIndex(
            (item) => item._id === res.data.data._id
          );
          const newItems = [...prevItems];
          newItems[index] = res.data.data;
          return newItems;
        }
        );
      })
      .catch((err) => {
        console.log(err.response.data);
        setAlertMessage(err.response.data.message);
        setAlertSeverity("error");
        setOpenAlert(true);
        setSubmitting(false);
      })
      .finally(() => {
        setSubmitting(false);
      });
    function fieldsToBeModified(
      {
        itemName: modifiedItemName,
        description: modifiedDescription,
        price: modifiedPrice,
        images: selectedImages,
      },
      item
    ) {
      const formData = new FormData();

      if (modifiedItemName !== item.itemName) {
        formData.append("itemName", modifiedItemName);
      }
      if (modifiedPrice !== item.itemPrice) {
        formData.append("price", modifiedPrice);
      }
      if (modifiedDescription !== item.description) {
        formData.append("description", modifiedDescription);
      }
      if (selectedImages.toString() !== item.images.toString()) {
        for (let i = 0; i < imagesToUpload.length; i++) {
          formData.append("images", imagesToUpload[i]);
        }
      }
      return formData;
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.size > 4) {
      setImages([]);
      alert("You can only upload a maximum of 4 images");
      return (e.target.value = ""); // Clear the selected file
    }
    setImagesToUpload(files);
    const imagesArray = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setSelectedImages(imagesArray);
  };
  useEffect(() => {
    setModifiedItemName(item.itemName || "");
    setModifiedDescription(item.description || "");
    setModifiedPrice(item.price || "");
    setSelectedImages(item.images || []);
  }, [item]);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Item</DialogTitle>
      <Collapse in={openAlert} sx={{ marginTop: 1, alignSelf: "center", m: 1 }}>
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
      <DialogContent>
        <form onFocus={() => setOpenAlert(false)}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                label="Item Name"
                value={modifiedItemName}
                onChange={(e) => setModifiedItemName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={modifiedDescription}
                onChange={(e) => setModifiedDescription(e.target.value)}
                fullWidth
                multiline
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                value={modifiedPrice}
                onChange={(e) => setModifiedPrice(e.target.value)}
                fullWidth
                type="number"
              />
            </Grid>

            <Typography mt={2} variant="h6">
              Selected Images:
            </Typography>
            <Stack
              direction="row"
              sx={{
                flexWrap: "wrap",
                width: "100%",
              }}
              spacing={1}
            >
              {selectedImages?.map((imageSrc, index) => (
                <Box key={index}>
                  <img
                    key={index}
                    src={imageSrc}
                    alt={`Preview ${index}`}
                    style={{
                      // maxWidth: "100%",
                      marginTop: "8px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      width: "150px",
                      aspectRatio: "1/1",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                    }}
                  />
                </Box>
              ))}
            </Stack>
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
              <Button variant="outlined" component="span">
                Choose Images
              </Button>
            </label>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <LoadingButton
          loading={submitting}
          onClick={handleSave}
          variant="contained"
          color="primary"
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default ModifieItemModal;
