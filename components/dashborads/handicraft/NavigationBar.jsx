import React from "react";
import { Button, Stack, Typography, Box, Tabs } from "@mui/material";
import Image from "next/image";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ArchiveIcon from "@mui/icons-material/Archive";
import SettingsIcon from "@mui/icons-material/Settings";
import Navcss from "@/styles/NavBar.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logoutUser } from "@/reduxFolder/actions/userActions";

// import { Box } from "@mui/joy";
function NavigationBar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const matchMD = useMediaQuery("(min-width:960px)");
  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", { method: "POST" });
    const data = await response.json();
    if (response.ok) {
      dispatch(logoutUser());
      router.push("/");
    } else {
      console.log("logout failed", data);
    }
  };
  return (
    <Stack
      component={"aside"}
      border={"1px solid lightGray"}
      sx={{
        flexDirection: { xs: "row", md: "column" },
        width: { xs: "100%", md: "20%" },
        display: { xs: "none", sm: "none", md: "flex" },
      }}
    >
      {/* logo Box */}

      <Box
        flexDirection="row"
        alignItems="center"
        borderBottom={"1px solid lightGray"}
        sx={{ display: { md: "flex", xs: "none" }, justifyContent: "center" }}
        component={Link}
        href="/"
      >
        <Image
          src="/logs/6.png"
          width={69}
          height={69}
          alt="Picture of the author"
          style={{ display: "inline" }}
        ></Image>
      </Box>
      {/* tab list */}
      <Box
        flexGrow={1}
        sx={{
          overflow: "auto",
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
        }}
      >
        <Link href="/handicraft/profile" className={Navcss.navbar__link}>
          <Stack
            variant="body2"
            flexDirection={"row"}
            spacing={1}
            alignItems={"center"}
          >
            <AccountCircleIcon fontSize="large" sx={{ marginRight: 1 }} />{" "}
            {matchMD ? "profile" : ""}
          </Stack>
        </Link>
        <Link
          href="/handicraft/dashboard/items"
          className={Navcss.navbar__link}
        >
          <Stack
            variant="body2"
            flexDirection={"row"}
            spacing={1}
            alignItems={"center"}
          >
            <ShoppingCartIcon fontSize="large" sx={{ marginRight: 1 }} />{" "}
            {matchMD ? "items" : ""}
          </Stack>
        </Link>
        <Link
          href="/handicraft/dashboard/archived"
          className={Navcss.navbar__link}
        >
          <Stack
            variant="body2"
            flexDirection={"row"}
            spacing={1}
            alignItems={"center"}
          >
            <ArchiveIcon fontSize="large" sx={{ marginRight: 1 }} />{" "}
            {matchMD ? "archived" : ""}
          </Stack>
        </Link>
        <Link
          href="/handicraft/dashboard/publish-item"
          className={Navcss.navbar__link}
        >
          <Stack
            variant="body2"
            flexDirection={"row"}
            spacing={1}
            alignItems={"center"}
          >
            <AddCircleOutlineIcon fontSize="large" sx={{ marginRight: 1 }} />{" "}
            {matchMD ? "publish" : ""}
          </Stack>
        </Link>
        <Link
          href="/handicraft/dashboard/settings"
          className={Navcss.navbar__link}
        >
          <Stack
            variant="body2"
            flexDirection={"row"}
            spacing={1}
            alignItems={"center"}
          >
            <SettingsIcon fontSize="large" sx={{ marginRight: 1 }} />{" "}
            {matchMD ? "account" : ""}
          </Stack>
        </Link>
      </Box>

      {/* log out button */}
      <Button
        startIcon={<LogoutIcon sx={{ rotate: "180deg" }} />}
        sx={{
          borderTop: {
            xs: "none",
            md: "1px solid lightGray",
          },
        }}
        onClick={() => {handleLogout()}}
      >
        {matchMD ? "log out" : ""}
      </Button>
    </Stack>
  );
}

export default NavigationBar;
