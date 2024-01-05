import React from "react";
import { Avatar, Container, Divider, Grid, NoSsr } from "@mui/material";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import { IconButton, Stack, Typography, Box, Button } from "@mui/material";
import Link from "next/link";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Pagination as MuiPagination } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Modal from "@mui/material/Modal";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

function Items({ items }) {
  const [selectedItem, setSelectedItem] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const fomateItemName = (name) => {
    if (name.length > 12) {
      return name.slice(0, 9) + "...";
    }
    return name;
  };
  const handleClickOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "white",
    maxWidth: {
      xs: "90%",
      md: "60%",
    },
    maxHeight: {
      xs: "90%",
      md: "70%",
    },
    // border: '2px solid #000',
    boxShadow: "none",
    display: {
      xs: "flex",
      sm: "flex",
      md: "grid",
      lg: "grid",
    },
    flexDirection: {
      xs: "column",
      sm: "column",
      md: "row",
      lg: "row",
    },
    gridTemplateAreas: {
      xs: `"image" "info" "description"`,

      md: `"image image info"
           "image image description"
           "image image description"
           "image image description"`,
    },
    gridTemplateRows: {
      xs: "1fr",
      md: "1fr 1fr 1fr 1fr",
    },
    gridTemplateColumns: {
      xs: "1fr",
      md: "1fr 1fr",
    },
    border: "none",
    borderRadius: "10px",
  };
  function calculateAverageRating(rates) {
    let sum = 0;
    if (rates.length === 0) return 0;
    rates.forEach((rate) => {
      sum += rate.rate;
    });
    return sum / rates.length;
  }
  return (
    <>
      <Grid
        container
        sx={{ maxWidth: { xs: "95%", md: "90%" } }}
        margin={"auto"}
        component={"section"}
        spacing={1}
        p={1}
      >
        {/* list of items */}

        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
            <Paper
              elevation={3}
              sx={{
                padding: 1,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                overflow: "auto",
              }}
              key={item._id}
            >
              <Stack
                flexDirection={"row"}
                gap={1}
                bgcolor={"#ffee"}
                p="3px"
                alignItems={"center"}
              >
                <Avatar
                  src={item.owner.profileImage}
                  size="large"
                  sx={{ width: 50, height: 50 }}
                  alt={item.owner.fullName}
                />
                <Typography
                  flexGrow={1}
                  variant="subtitle1"
                  fontWeight={"bold"}
                  component={Link}
                  href={`/handicrafts/${item.owner._id}`}
                  alt={item.owner.fullName}
                >
                  {item.owner.fullName}
                </Typography>
                <NoSsr>
                  <CustomBookMarkedIcon item={item} />
                </NoSsr>
              </Stack>

              <img
                src={item.images[0]}
                style={{
                  maxWidth: "100%",
                  minWidth: "100%",
                  minHeight: 230,
                  maxHeight: 230,
                  borderRadius: 10,
                  objectFit: "cover",
                  flexGrow: 1,
                }}
                onClick={() => handleClickOpen(item)}
              />

              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Typography variant="body1" fontWeight={"bold"}>
                  {fomateItemName(item.itemName)}
                </Typography>
                <Stack flexDirection={"column"} justifySelf={"flex-end"}>
                  <Stack flexDirection={"row"}>
                    <Rating
                      name="read-only"
                      value={calculateAverageRating(item.rates)}
                      precision={0.5}
                      readOnly
                    />
                    <Typography variant="subtitle2" color="text.secondary">
                      ({item.rates.length})
                    </Typography>
                  </Stack>
                  <Typography fontSize={"1.2rem"} alignSelf={"flex-end"}>
                    {item.price} <strong>MAD</strong>
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        ))}

        {/* item Modale */}

        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle}>
            <Stack
              sx={{
                flexDirection: "column",
                order: {
                  xs: 1,
                  md: 2,
                },
                padding: 1,
                gridArea: "info",
                borderBottom: "1px solid #ccc",
              }}
            >
              <Typography
                variant="h5"
                // flexGrow={1}
                display={"flex"}
                alignItems={"center"}
              >
                {selectedItem.itemName}
              </Typography>
              <Stack sx={{ flexDirection: "row" }}>
                <Typography fontSize={"120%"} sx={{ flexGrow: 1 }}>
                  {selectedItem.price} <strong>MAD</strong>
                </Typography>
                {/* <Rating value={0} precision={0.5} /> */}
                <NoSsr>
                  <HoverRatingItem item={selectedItem} />
                </NoSsr>
              </Stack>
            </Stack>

            <Box
              sx={{
                order: {
                  xs: 2,
                  md: 1,
                },
                gridArea: "image",
                maxHeight: {
                  xs: "70%",
                  md: "100%",
                },
                overflow: "hidden",
              }}
            >
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                slidesPerView={1}
                loop={true}
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                centeredSlides={true}
                speed={700} // Set the transition speed in milliseconds
                effect="fade" // Choose the transition effect (e.g., slide, fade)
                lazyPreloadPrevNext={true}
              >
                {selectedItem.images?.map((image) => (
                  <SwiperSlide
                    key={image}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <img
                      style={{
                        objectFit: "cover",
                      }}
                      src={image}
                      alt={selectedItem.itemName}
                      loading="lazy"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>

            <Box
              sx={{
                order: {
                  xs: 3,
                  md: 3,
                },
                gridArea: "description",
              }}
              display={"flex"}
              flexDirection={"column"}
            >
              <Box width={320} margin={"auto"} marginTop={1}>
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>description</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {selectedItem.description
                        ? selectedItem.description
                        : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leolobortis eget."}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
              <Stack
                direction="row"
                alignItems={"center"}
                sx={{ p: 1, order: { xs: 3, md: 3 } }}
                alignSelf={"flex-end"}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    mr: 1,
                    backgroundColor: "#25D366",
                    "&:hover": {
                      backgroundColor: "#25D366",
                    },
                    color: "white",
                    flexGrow: 1,
                    fonsize: {
                      xs: "0.5rem",
                      md: "1rem",
                    },
                  }}
                  href={`https://wa.me/212688139882?text=I%20want%20to%20order%20${selectedItem.itemName}%20from%20your%20website`}
                  target="_blank"
                  startIcon={<WhatsAppIcon />}
                >
                  order via whatsapp
                </Button>
                <Button variant="variant" color="primary" onClick={handleClose}>
                  Close
                </Button>
              </Stack>
            </Box>
          </Box>
        </Modal>

        {/* bagination */}
      </Grid>
      <Divider></Divider>
      <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
        <MuiPagination
          count={10}
          color="primary"
          sx={{ margin: "auto", padding: 2 }}
        />
      </Box>
    </>
  );
}

export default Items;
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import HoverRatingItem from "@/components/HoverRatingItem";
import {
  addItemToSavedItems,
  removeItemFromSavedItems,
} from "@/reduxFolder/actions/userActions";
import axios from "axios";
function CustomBookMarkedIcon({ item }) {
  const user = useSelector((state) => state.user);
  const getInitialValue = () => {
    if (user && user.savedItems?.find((savedItem) => savedItem == item._id)) {
      return true;
    } else {
      return false;
    }
  };
  const [isSaved, setIsSaved] = useState(getInitialValue());
  const dispatch = useDispatch();

  const saveItemhandler = async () => {
    try {
      if (isSaved) {
        setIsSaved(false);
        let serverReponse = await axios.post(
          `/api/customers/unsave-item/${item._id}`,
          { itemId: item._id }
        );
        dispatch(removeItemFromSavedItems(item._id));
      } else {
        setIsSaved(true);
        let serverReponse = await axios.post(
          `/api/customers/save-item/${item._id}`,
          { itemId: item._id }
        );
        dispatch(addItemToSavedItems(item._id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (user && user.role == "customer") {
    return (
      <IconButton aria-label="bookmark" onClick={saveItemhandler}>
        {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>
    );
  } else {
    return <></>;
  }
}
