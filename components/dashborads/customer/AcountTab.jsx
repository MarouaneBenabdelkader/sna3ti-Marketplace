import { faUserPen, faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid,Container } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React from "react";
import EditProfileTab from "@/components/dashborads/customer/EditProfile";
import ChangePasswordTab from "@/components/dashborads/customer/ChangePasswordTab";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LockOpenIcon from '@mui/icons-material/LockOpen';
function AccountTab() {
  const [view, setView] = React.useState("editProfile");

  const changeView = (event, newView) => {
    setView(newView);
  };

  return (
      <Grid
        container     
        sx={{
            //q add box shadow
            boxShadow: {
              xs: `0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)`,
              md: `0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)`,
            },
            width:{
                xs:11/12,
                md:6/12
            },
            margin:'auto',
            marginTop:2,
          }}
      >
          <TabContext value={view} >
            <TabList onChange={changeView} sx={{flexGrow:1}} scrollButtons="auto" centered>
              <Tab
                icon={<ManageAccountsIcon  />}
                iconPosition="start"
                label="edit profile"
                value="editProfile"
              />
              <Tab
                icon={<LockOpenIcon />}
                iconPosition="start"
                label="change password"
                value="changePassword"
              />
            </TabList>
            <TabPanel value="editProfile">
              <EditProfileTab />
            </TabPanel>
            <TabPanel value="changePassword">
              <ChangePasswordTab />
            </TabPanel>
          </TabContext>
      </Grid>
  );
}
export default AccountTab;
