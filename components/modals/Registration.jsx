import * as React from "react";
import { Modal, Tab, IconButton, Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HandymanIcon from "@mui/icons-material/Handyman";
import CustomerRegistrationForm from "../registrationForms/Customers/CustomerRegistrationForm";
import HandiCraftRegistrationForm from "../registrationForms/Handicrafts/HandiCraftRegistrationForm";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "10px",
  background: "white",
  width: {
    xs: "97%",
    md: "fit-content",
  },
  // minWidth: { xs: "90%", md: "50%" },
};

export default function RegistrationModal({ open, setOpen }) {
  const [view, setView] = useState("1");
  const [showTabList, setShowTabList] = useState(true);

  return (
    <Modal hideBackdrop open={open}>
      <Box sx={style}>
        <IconButton
          color="inherit"
          aria-label="close drawer"
          coponent="span"
          onClick={() => {
            setOpen(false);
            setShowTabList(true);
          }}
 
        >
          <CloseIcon />
        </IconButton>
        <TabContext value={view}>
          <TabList
            onChange={(event, newView) => setView(newView)}
            aria-label="Tabs example"
            centered
            sx={{
              display: showTabList ? "block" : "none",
              borderBottom: "1px solid #eee",
               
               mb: 2,
            }}
             
          >
            <Tab
              icon={<HandymanIcon />}
              iconPosition="start"
              label="As Handicraft"
              value="1"
            />
            <Tab
              icon={<ShoppingCartIcon />}
              iconPosition="start"
              label="Or As Customer"
              value="2"
            />
          </TabList>
          <TabPanel value="1" sx={{ p: 0 }}>
            <HandiCraftRegistrationForm
              setShowTabList={setShowTabList}
            ></HandiCraftRegistrationForm>
          </TabPanel>
          <TabPanel value="2" sx={{ p: 0 }}>
            <CustomerRegistrationForm
              setShowTabList={setShowTabList}
            ></CustomerRegistrationForm>
          </TabPanel>
        </TabContext>
      </Box>
    </Modal>
  );
}
