import { useEffect, useState } from "react";
import { Alert, Slide, Typography, Container } from "@mui/material";
import axios from "axios";
import { Snackbar } from "@mui/material";
import DialogDelete from "@/components/dashborads/handicraft/DashboardComponents/DialogDelete";
import ItemsList from "@/components/dashborads/handicraft/DashboardComponents/ItemsList";
import ModifieItemModal from "@/components/dashborads/handicraft/ModifieItemModal";

export default function ItemsPageComponent({ title, itemsToRender }) {
  const [items, setItems] = useState(undefined);
  const [error, setError] = useState(undefined);

  const [responseMessage, setResponseMessage] = useState("");
  const [open, setOpen] = useState(false);

  const vertical = "top";
  const horizontal = "right";

  const [severity, setSeverity] = useState("success");
  const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
  const [selectedItemDelete, setSelectedItemDelete] = useState(undefined);
  const [itemToBeModified, setItemToBeModified] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setItemToBeModified({});
    setIsEditModalOpen(false);
  };

  function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    axios
      .get("/api/handicrafts/myProfile")
      .then((res) => res.data.data.items)
      .then((items) => {
        setItems(items);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  }, []);

  return (
    <Container
      sx={{
        height: "100%",
        width: "100%",
        overflow: "auto",
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
      >
        <Alert severity={severity} sx={{ width: "100%" }}>
          {responseMessage}
        </Alert>
      </Snackbar>

      <DialogDelete
        dialogDeleteOpen={dialogDeleteOpen}
        setDialogDeleteOpen={setDialogDeleteOpen}
        selectedItemDelete={selectedItemDelete}
        setResponseMessage={setResponseMessage}
        setOpen={setOpen}
        setSeverity={setSeverity}
        setItems={setItems}
      />
      <Typography
        variant="h4"
        p={2}
        sx={{ textTransform: "uppercase" }}
        width="50%"
        borderBottom="2px solid gold"
        mb={2}
      >
        {title}
      </Typography>
      <ItemsList
        error={error}
        items={items}
        setResponseMessage={setResponseMessage}
        setOpen={setOpen}
        setSeverity={setSeverity}
        setItems={setItems}
        setDialogDeleteOpen={setDialogDeleteOpen}
        setSelectedItemDelete={setSelectedItemDelete}
        itemsToRender={itemsToRender}
        setItemToBeModified={setItemToBeModified}
        setIsEditModalOpen={setIsEditModalOpen}
      />
      <ModifieItemModal
        open={isEditModalOpen}
        item={itemToBeModified}
        handleClose={handleCloseModal}
        setItems={setItems}
      />
    </Container>
  );
}
