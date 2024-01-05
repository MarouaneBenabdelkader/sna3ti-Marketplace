import * as React from "react";
import { Stack, Box, Container } from "@mui/material";
import NavigationBar from "./NavigationBar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import Link from "next/link";
import { ArchiveOutlined } from "@mui/icons-material";
// import NoSsr from "@mui/base/NoSsr";

// import Link from "next/link";
function DashboardLayout({ children }) {
  const [value, setValue] = React.useState(0);
  return (
      <Stack
        width={"100vw"}
        height={"100vh"}
        component={"section"}
        flexDirection={"row"}
      >
        <NavigationBar />

        {/* tab section */}
        <Box p={0} height='100%' sx={{
          width:{
            xs:'100%',
            md:'80%'
          }
        }} >
          {children}
        </Box>
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            display: {
              xs: "block",
              sm: "block",
              md: "none",
            },
          }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}            
          >
            <BottomNavigationAction
              label="profile"
              icon={<AccountCircleIcon />}
              component={Link}
              href="/handicraft/profile"
            />
            <BottomNavigationAction
              label="items"
              icon={<ShoppingCartIcon />}
              component={Link}
              href="/handicraft/dashboard/items"
            />
            <BottomNavigationAction
              label="archived"
              icon={<ArchiveOutlined />}
              component={Link}
              href="/handicraft/dashboard/archived"
            />
            <BottomNavigationAction
              label="publish"
              icon={<AddCircleOutlineIcon />}
              component={Link}
              href="/handicraft/dashboard/publish-item"
            />
            <BottomNavigationAction
              label="account"
              icon={<SettingsIcon />}
              component={Link}
              href="/handicraft/dashboard/settings"
            />
          </BottomNavigation>
        </Paper>
      </Stack>
  );
}

export default DashboardLayout;
