import axios from "axios";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
function DialogDelete({
  dialogDeleteOpen,
  setDialogDeleteOpen,
  selectedItemDelete,
  setResponseMessage,
  setOpen,
  setSeverity,
  setItems,
  
}) {
  return (
    <Dialog
      open={dialogDeleteOpen}
      onClose={() => setDialogDeleteOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete Item"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this item?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogDeleteOpen(false)} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            confirmDelete({
              selectedItemDelete,
              setResponseMessage,
              setOpen,
              setSeverity,
              setItems,
              setDialogDeleteOpen,
            });
          }}
          color="primary"
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
function confirmDelete({
  selectedItemDelete,
  setItems,
  setSeverity,
  setOpen,
  setResponseMessage,
  setDialogDeleteOpen,
}) {
  axios
    .delete(`/api/handicrafts/items/${selectedItemDelete._id}`)
    .then((res) => {
      setItems((prev) => {
        const index = prev.findIndex((i) => i._id === selectedItemDelete._id);
        const newItems = [...prev];
        newItems.splice(index, 1);
        return newItems;
      });
      setSeverity("success");
      setOpen(true);
      setResponseMessage("Deleted successfully");
    })
    .catch((err) => {
      console.log(err);
      setSeverity("error");
      setOpen(true);
      setResponseMessage(err.response.data.message);
    });

  // Close the Dialog
  setDialogDeleteOpen(false);
}
export default DialogDelete;
