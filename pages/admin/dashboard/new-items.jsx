import { useState, useEffect } from "react";
import AdminDashboardLayout from "@/components/dashborads/admin/AdminDashboardLayout";
import CustomError from "@/components/dashborads/admin/CustomError";
import axios from "axios";
import {
  Avatar,
  Divider,
  Grid,
  NoSsr,
  Paper,
  Stack,
  Typography,
  Box,
  Button,
  Collapse,
  Alert,
  Snackbar,
  Skeleton,
  Slide,
} from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function newItems() {
  const [loading, setLoading] = useState(true);
  const [unCheckedItems, setUnCheckedItems] = useState({});
  const [error, setError] = useState(null);
  const [acceptRejectMessage, setAcceptRejectMessage] =
    useState("success message");
  const [open, setOpen] = useState(false);
  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("right");
  const [severity, setSeverity] = useState("success");

  function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const aproveItem = (item) => {
    axios
      .put(`/api/admins/accept-items/${item._id}`)
      .then((response) => {
        setAcceptRejectMessage(response.data.message);
        setSeverity("success");
        setOpen(true);
        setUnCheckedItems(
          unCheckedItems.filter((unCheckedItem) => unCheckedItem._id !== item._id)
        );
      })
      .catch((error) => {
        console.log(error.response.data);
        setAcceptRejectMessage(error.response.data.message);
        setSeverity("error");
        setOpen(true);
      });
  };
  const rejectItem = (item) => {
    axios
      .delete(`/api/admins/items/${item._id}`)
      .then((response) => {
        console.log(response.data);
        setAcceptRejectMessage(response.data.message);
        setSeverity("info");
        setOpen(true);
        setUnCheckedItems(
          unCheckedItems.filter((unCheckedItem) => unCheckedItem._id !== item._id)
        );
      })
      .catch((error) => {
        console.log(error.response.data);
        setAcceptRejectMessage(error.response.data.message);
        setSeverity("error");
        setOpen(true);
        setError(error.response.data);
      });
  };

  useEffect(() => {
    axios
      .get("/api/admins/items?itemStatus=false")
      .then((response) => {
        setUnCheckedItems(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response.data);
        setLoading(false);
      });
  }, []);

  if (error) {
    return <CustomError error={error} />;
  }

  if (loading) {
    return (
      <>
        <Typography variant={"h3"}>New Items</Typography>
        <Grid container spacing={1}>
          {Array(8)
            .fill()
            .map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <Skeleton variant="circular" height={54} width={54} />
                  <Skeleton variant="text" width={120} />
                </Stack>
                <Skeleton
                  variant="rounded"
                  height={350}
                  width={"100%"}
                  sx={{ my: 0.5 }}
                />
              </Grid>
            ))}
        </Grid>
      </>
    );
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
      >
        <Alert severity={severity} sx={{ width: "100%" }}>
          {acceptRejectMessage}
        </Alert>
      </Snackbar>
      <Typography variant={"h3"}>New Items</Typography>
      <Divider sx={{ my: 1 }} />
      <Grid container spacing={1}>
        {unCheckedItems.map((item) => (
          <Grid item xs={12} sm={4} key={item._id}>
            <Item item={item} rejectItem={rejectItem} aproveItem={aproveItem} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default newItems;
newItems.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
function Item({ item, rejectItem, aproveItem }) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 1,
      }}
    >
      <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
        <Avatar src={item.owner.profileImage} alt={item.owner.fullName} />
        <Typography variant={"body1"}>{item.owner.fullName}</Typography>
      </Stack>
      <Divider
        sx={{
          my: 1,
        }}
      />
      <NoSsr>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          centeredSlides={true}
          speed={700} // Set the transition speed in milliseconds
          effect="fade" // Choose the transition effect (e.g., slide, fade)
          lazyPreloadPrevNext={true}
          style={{
            width: "100%",
          }}
        >
          {item.images?.map((image) => (
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
                  maxWidth: "100%",
                  maxHeight: 300,
                  minWidth: "100%",
                  minHeight: 300,
                  borderRadius: 5,
                }}
                src={image}
                alt={item.itemName}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </NoSsr>
      <Box>
        <Typography variant={"h6"}>{item.itemName}</Typography>
        <Box>
          <Button
            variant={"text"}
            onClick={() => setShowDescription(!showDescription)}
          >
            {showDescription ? "Hide description" : "Show Description"}
          </Button>
          <Collapse in={showDescription}>
            <Typography variant={"body2"}>{item.description}</Typography>
          </Collapse>
        </Box>
        <Divider
          sx={{
            mb: 1,
          }}
        />
        <Stack flexDirection={"row"} justifyContent={"flex-end"} gap={1}>
          <Button
            onClick={() => aproveItem(item)}
            variant={"contained"}
            color="success"
          >
            Approve
          </Button>
          <Button
            onClick={() => rejectItem(item)}
            variant={"contained"}
            color="secondary"
          >
            Reject
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
