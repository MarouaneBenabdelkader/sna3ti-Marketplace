import React from 'react';
import { useRouter } from 'next/router';
import { Drawer, List, ListItem, ListItemText, Grid } from '@mui/material';
import SignInModal from './modals/SignInModal';

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
import { useDispatch } from "react-redux";
import { logoutUser } from "@/reduxFolder/actions/userActions";

const Navbar = () => {
    const router = useRouter();
    const { user } = useSelector((state) => state);
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
    const [open, setOpen] = React.useState(false);
    const [openSignIn, setOpenSignIn] = React.useState(false);
    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const drawerItems = (
        <List sx={{
            display: {
                md: 'flex',
            },
            flexDirection: {
                sm: 'column',
                md: 'row',

            },
            cursor: 'pointer'
        }} >
            <ListItem >
                <Button variant='text' href='#home' sx={{ color: 'inherit' }} >Home</Button>
            </ListItem>
            <ListItem >
                <Button variant='text' href='#handicrafts' sx={{ color: 'inherit' }} >Handicrafts</Button>
            </ListItem>
            <ListItem >
                <Button variant='text' href='#items' sx={{ color: 'inherit' }} >Items</Button>
            </ListItem>
            <ListItem >
                <Button variant='text' href='#about' sx={{ color: 'inherit' }} >About</Button>
            </ListItem>
            <ListItem >
                <Button variant='text' href='#contact' sx={{ color: 'inherit' }} >Contacts</Button>
            </ListItem>
        </List>

        /*
         <ListItem >
                <Link href="#home" underline="hover" sx={{ color: 'black' }} >
                    <ListItemText primary="Home" />
                </Link>
            </ListItem>
            <ListItem >
                <Link href="#handicrafts" underline="hover" sx={{ color: 'black' }} >
                    <ListItemText primary="Handicrafts" />
                </Link>
            </ListItem>
            <ListItem >
                <Link href="#items" underline="hover" sx={{ color: 'black' }} >
                    <ListItemText primary="Items" />
                </Link>
            </ListItem>
            <ListItem >
                <Link href="#about" underline="hover" sx={{ color: 'black' }} >
                    <ListItemText primary="About" />
                </Link>
            </ListItem>
            <ListItem  >
                <Link href="#contact" underline="hover" sx={{ color: 'black' }} >
                    <ListItemText primary="contact" variant='body1' />
                </Link>
            </ListItem> */
    );
        React.useEffect(() => {
            if (router.query?.openLogin) {
                setOpenSignIn(true);
            }
        },[router.query])
    return (
        <>
            <AppBar sx={{
                bgcolor: 'white',
                color: 'black',
                position: 'sticky',
                opacity: 0.95,
                // zIndex: (theme) => theme.zIndex.drawer + 1

            }}
            >
                <Toolbar>

                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{
                            marginRight: (theme) => theme.spacing(2), display: {
                                xs: 'block',
                                sm: 'block',
                                md: 'none'
                            }
                        }}

                    >
                        <MenuIcon />
                    </IconButton>

                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        sx={{
                            flexGrow: 1,
                            justifyContent: {
                                xs: 'center',
                                sm: 'center',
                                md: 'flex-start'
                            }
                        }}
                    >
                        <Grid item >
                            <Image
                                src="/logs/6.png"
                                width={74}
                                height={74}
                                alt="Picture of the author"
                                style={{ display: 'inline' }}
                            >
                            </Image>

                        </Grid>

                        <Grid item >
                            <Typography variant="h5"  >
                                MyCraft
                            </Typography>
                        </Grid>

                    </Grid>


                    <Box sx={{
                        display: {
                            xs: 'none',
                            sm: 'none',
                            md: 'flex'
                        }
                    }} >
                        {drawerItems}
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
                                variant="contained"
                                sx={{ color: 'white', minWidth: '100px' }}
                                onClick={() => setOpenSignIn(true)}
                            >Sign In</Button>
                        )}
                    </NoSsr>

                </Toolbar>

            </AppBar >

            <Drawer
                variant="temporary"
                anchor="top"
                open={open}
                onClose={handleDrawerToggle}
                sx={{ width: 240, flexShrink: 0, alignItems: 'center', justifyContent: 'center', top: '6vh' }}


            >
                <div sx={{ width: 240 }}>
                    {drawerItems}
                </div>
            </Drawer>
            <SignInModal open={openSignIn} setOpen={setOpenSignIn} />
        </>
    );
};

export default Navbar;
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