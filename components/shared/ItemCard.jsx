import * as React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Paper from "@mui/material/Paper";
import VerifiedIcon from "@mui/icons-material/Verified";
import Rating from "@mui/material/Rating";
import { NoSsr } from "@mui/material";
import HoverRatingItem from "@/components/HoverRatingItem";

import { IconButton, Stack, Typography, Box } from "@mui/material";
function ItemCard({ item, setSelectedItem, setOpenModale }) {
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
        height: 360,
      }}
      key={item._id}
    >
      <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
        <Typography fontSize={20} fontWeight="lg" flexGrow={1}>
          {item.price} <strong>MAD</strong>
        </Typography>
        <VerifiedIcon
          style={{ color: item.checked ? "#00e676" : "gray" }}
          size="2x"
        />
      </Stack>

      <img
        src={item.images[0]}
        style={{
          maxWidth: "100%",
          maxHeight: 200,
          borderRadius: 10,
          objectFit: "cover",
          flexGrow: 1,
        }}
      />

      <Stack>
        <Typography variant="subtitle1" fontWeight={"bold"} flexGrow={1}>
          {item.itemName}
        </Typography>
        <Typography variant="subtitle2">{formatDate(item.date)}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <NoSsr>
            <HoverRatingItem item={item} />
          </NoSsr>
        </Box>
      </Stack>
    </Paper>
  );
}

export default ItemCard;
