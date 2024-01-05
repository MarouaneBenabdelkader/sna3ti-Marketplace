import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Groups2Icon from '@mui/icons-material/Groups2';
import Link from "next/link";
export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} href="/admin/dashboard/new-handicrafts">
      <ListItemIcon>
        <GroupAddIcon />
      </ListItemIcon>
      <ListItemText primary="new-Handicrafts" />
    </ListItemButton>

    <ListItemButton component={Link} href="/admin/dashboard/new-items">
      <ListItemIcon>
        <LibraryAddIcon />
      </ListItemIcon>
      <ListItemText primary="new-Items" />
    </ListItemButton>

    <ListItemButton component={Link} href="/admin/dashboard/handicrafts">
      <ListItemIcon>
        <PeopleAltIcon />
      </ListItemIcon>
      <ListItemText primary="Handicrafts" />
    </ListItemButton>

    <ListItemButton component={Link} href="/admin/dashboard/items">
      <ListItemIcon>
        <LocalOfferIcon />
      </ListItemIcon>
      <ListItemText primary="items" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListItemButton component={Link} href="/admin/dashboard/customers">
      <ListItemIcon>
        <Groups2Icon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
  </React.Fragment>
);
