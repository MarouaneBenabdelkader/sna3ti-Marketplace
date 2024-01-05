import { useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import { Alert, Slide,Box } from "@mui/material";
import axios from "axios";
import { Snackbar } from "@mui/material";
import DialogDelete from "@/components/dashborads/handicraft/DashboardComponents/DialogDelete";
import ItemsList from "@/components/dashborads/handicraft/DashboardComponents/ItemsList";
import ArchiveIcon from "@mui/icons-material/Archive";

export default function Dashboard() {
  const [items, setItems] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [view, setView] = useState("UnArchivedItems");

  const [responseMessage, setResponseMessage] = useState("");
  const [open, setOpen] = useState(false);

  const vertical = "top";
  const horizontal = "right";

  const [severity, setSeverity] = useState("");
  const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
  const [selectedItemDelete, setSelectedItemDelete] = useState(undefined);

  function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const changeView = (event, newView) => {
    setView(newView);
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
    <Box
      sx={{
        height: "100%",
        width: "100%",
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

      <TabContext value={view}>
        <TabList
          onChange={changeView}
          sx={{ flexGrow: 1 }}
          scrollButtons="auto"
        >
          <Tab
            icon={<CollectionsBookmarkIcon />}
            iconPosition="start"
            label="Items"
            value="UnArchivedItems"
          />
          <Tab
            icon={<ArchiveIcon />}
            iconPosition="start"
            label="Archived Items"
            value="ArchivedItems"
          />
        </TabList>
        <TabPanel
          value="UnArchivedItems"
          sx={{
            height: "90%",
            overflow: "auto",
          }}
        >
          <ItemsList
            error={error}
            items={items}
            setResponseMessage={setResponseMessage}
            setOpen={setOpen}
            setSeverity={setSeverity}
            setItems={setItems}
            setDialogDeleteOpen={setDialogDeleteOpen}
            setSelectedItemDelete={setSelectedItemDelete}
            itemsToRender={true}
            
          />
        </TabPanel>
        <TabPanel
          value="ArchivedItems"
          sx={{
            height: "90%",
            overflow: "auto",
          }}
        >
          <ItemsList
            error={error}
            items={items}
            setResponseMessage={setResponseMessage}
            setOpen={setOpen}
            setSeverity={setSeverity}
            setItems={setItems}
            setDialogDeleteOpen={setDialogDeleteOpen}
            setSelectedItemDelete={setSelectedItemDelete}
            itemsToRender={false}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
}


