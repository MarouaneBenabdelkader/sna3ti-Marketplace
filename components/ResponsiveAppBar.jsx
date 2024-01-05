import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Divider from "@mui/material/Divider";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { ListItemIcon } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import NoSsr from "@mui/base/NoSsr";
import SignInModal from "@/components/modals/SignInModal";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/reduxFolder/actions/userActions";

const pages = ["Handicrafts", "Items"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const { user } = useSelector((state) => state);
  const [openSignIn, setOpenSignIn] = React.useState(false);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* larg screen */}
            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
              <Image
                src="/logs/6.png"
                width={74}
                height={74}
                alt="Picture of the author"
              />
            </Box>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                color: "inherit",
                textDecoration: "none",
                textTransform: "uppercase", // Corrected property name
                fontFamily: "sans-serif",
                fontWeight: 700,
              }}
            >
              MyCraft
            </Typography>

            {/* small screen */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem
                  key={"home"}
                  component={Link}
                  href={"/"}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>

                <MenuItem
                  key={"handicrafts"}
                  component={Link}
                  href={"/handicrafts"}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">Handicrafts</Typography>
                </MenuItem>

                <MenuItem
                  key={"items"}
                  component={Link}
                  href={"/items"}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">Items</Typography>
                </MenuItem>
              </Menu>
            </Box>

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <Image
                src="/logs/6.png"
                width={74}
                height={74}
                alt="Picture of the author"
              />
            </Box>
            <Typography
              variant="h5"
              noWrap
              component={Link}
              href="/"
              sx={{
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "sans-serif",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
                textTransform: "uppercase", // Corrected property name
              }}
            >
              MyCraft
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                key={"home"}
                component={Link}
                href={`/`}
                sx={{
                  my: 2,
                  color: "white",
                  fontWeight: "bold",
                  fonSize: "2rem",
                  display: "block",
                }}
              >
                Home
              </Button>

              <Button
                key={"handicrafts"}
                // onClick={handleCloseNavMenu}
                component={Link}
                href={`/handicrafts`}
                sx={{
                  my: 2,
                  color: "white",
                  fontWeight: "bold",
                  fonSize: "2rem",
                  display: "block",
                }}
              >
                Handicrafts
              </Button>

              <Button
                key={"items"}
                // onClick={handleCloseNavMenu}
                component={Link}
                href={`/items`}
                sx={{
                  my: 2,
                  color: "white",
                  fontWeight: "bold",
                  fonSize: "2rem",
                  display: "block",
                }}
              >
                items
              </Button>
            </Box>
            <NoSsr>
              {user && user.role ? (
                <CustomMenu
                  user={user}
                  handleOpenUserMenu={handleOpenUserMenu}
                  anchorElUser={anchorElUser}
                  handleCloseUserMenu={handleCloseUserMenu}
                />
              ) : (
                <Button
                  onClick={() => setOpenSignIn(true)}
                  sx={{
                    my: 2,
                    px: { xs: 2, md: 4 },
                    color: "white",
                    backgroundColor: "black",
                  }}
                >
                  Login
                </Button>
              )}
            </NoSsr>
          </Toolbar>
        </Container>
      </AppBar>
      <SignInModal open={openSignIn} setOpen={setOpenSignIn} />
    </>
  );
}

/* custome menu for users */
const CustomMenu = ({
  user,
  handleOpenUserMenu,
  anchorElUser,
  handleCloseUserMenu,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
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
  if (user.role == "handicraft") {
    return (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <NoSsr>
              <Avatar alt={user.fullName} src={user.profileImage} />
            </NoSsr>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem component={Link} href="/handicraft/profile/">
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            Profile
          </MenuItem>

          <MenuItem component={Link} href="/handicraft/dashboard/">
            <ListItemIcon>
              <ViewComfyIcon fontSize="small" />
            </ListItemIcon>
            dashboard
          </MenuItem>

          <Divider />

          <MenuItem component={Link} href="/handicraft/dashboard/publish-item/">
            <ListItemIcon>
              <AddCircleOutlineIcon fontSize="small" />
            </ListItemIcon>
            publish an item
          </MenuItem>

          <MenuItem component={Link} href="/handicraft/account/settings/">
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>

          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    );
  }
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <NoSsr>
            <Avatar alt={user.fullName} src={user.profileImage} />
          </NoSsr>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem component={Link} href="/customer/account/profile/">
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          Profile
        </MenuItem>

        <Divider />

        <MenuItem component={Link} href="/customer/account/settings/">
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        <MenuItem component={Link} href="/customer/account/bookmarked/">
          <ListItemIcon>
            <BookmarkIcon fontSize="small" />
          </ListItemIcon>
          Bookmared
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};
export default ResponsiveAppBar;
