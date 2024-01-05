import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Image from "next/image";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { BookmarkAdd, DeleteForever } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Paper from "@mui/material/Paper";
import VerifiedIcon from "@mui/icons-material/Verified";
import Rating from "@mui/material/Rating";
/* const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
})); */

import { IconButton, Stack, Typography, Box, Grid } from "@mui/material";
import { calculateAverageRating } from "@/lib";
function MyItem({ item }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 1,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        height: 330,
      }}
      // key={item._id}
    >
      <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
        <Typography fontSize={20} fontWeight="lg" flexGrow={1}>
          2,900 <strong>MAD</strong>
        </Typography>
        <VerifiedIcon
          style={{ color: item.checked ? "#00e676" : "gray" }}
          size="2x"
        />
      </Stack>
      <Box
        sx={{
          height: 300,
          overflow: "hidden",
        }}
      >
        <img
          src={item.images[0]}
          style={{
            maxWidth: "100%",
            minWidth: "100%",
            maxWidth: "100%",
            minHeight: "100%",
            maxHeight: "100%",
            borderRadius: 10,
            objectFit: "cover",
          }}
        />
      </Box>

      <Stack>
        <Typography variant="subtitle1" fontWeight={"bold"} flexGrow={1}>
          {item.itemName}
        </Typography>
        <Typography variant="subtitle2">{formatDate(item.date)}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Rating
            name="read-only"
            value={calculateAverageRating(item.rates)}
            precision={0.5}
            readOnly
          />
          <Typography variant="subtitle2" color="text.secondary">
            (
            {item.rates.length > 1
              ? `${item.rates.length} reviews`
              : `${item.rates.length} review`}{" "}
            )
          </Typography>
        </Box>
        {/* <IconButton
          onClick={handleClick}
          id="demo-customized-button"
          sx={{ alignSelf: "flex-end", justifySelf: "flex-end", p: 0 }}
        >
          <MoreVertIcon />
        </IconButton> */}
      </Stack>

      {/* <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <DeleteForever />
          Delete
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <ArchiveIcon />
          Archive
        </MenuItem>
      </StyledMenu> */}
    </Paper>
  );
}

export default MyItem;
