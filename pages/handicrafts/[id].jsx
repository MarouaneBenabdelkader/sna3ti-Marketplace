import React from "react";
import axios from "axios";
import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  Button,
  NoSsr,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import ItemCard from "@/components/shared/ItemCard";
import ItemModale from "@/components/shared/ItemModale";
import DefualtLayout from "@/components/dashborads/DefualtLayout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import Divider from "@mui/material/Divider";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import HoverRatingItem from "@/components/HoverRatingItem";

// Import Swiper styles
import "swiper/css";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useSelector, useDispatch } from "react-redux";
import {
  addFollowing,
  removeFollowing,
} from "@/reduxFolder/actions/userActions";
import HoverRating from "@/components/HoverRating";
function HandicraftProfile({ handicraft: user }) {
  const [selectedItem, setSelectedItem] = React.useState({});
  const [openModale, setOpenModale] = React.useState(false);

  const despatch = useDispatch();
  /* connected user */
  const connectedUser = useSelector((state) => state.user);

  const clickHandler = (item) => {
    setSelectedItem(item);
    setOpenModale(true);
  };
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
  const handleClose = () => setOpenModale(false);
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
  const handelfollow = async () => {
    let res;
    if (isFollowing) {
      res = await fetch(`/api/customers/unfollow-handicraft/${user._id}`, {
        method: "POST",
      });
      despatch(removeFollowing(user._id));
      setIsFollowing(false);
    } else {
      res = await fetch(`/api/customers/follow-handicraft/${user._id}`, {
        method: "POST",
      });
      despatch(addFollowing(user._id));
      setIsFollowing(true);
    }
    const data = await res.json();
    console.log(data);
  };
  const [isFollowing, setIsFollowing] = React.useState(
    connectedUser && connectedUser.following?.includes(user._id)
  );

  return (
    <Box
      sx={{
        maxWidth: { xs: "95%", md: "90%" },
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        mt: 2,
        gap: 2,
        boxShadow: {
          xs: `0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)`,
          md: `0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)`,
        },
      }}
      margin={"auto"}
      component={"section"}
      p={2}
      minHeight={"80vh"}
    >
      {/* profile Card */}
      <Paper
        elevation={0}
        sx={{
          padding: 1,
          display: "flex",
          flexDirection: "column",
          maxWidth: { md: 330 },
          height: "fit-content",
          gap: 1,
          border: "1px solid #e0e0e0",
        }}
      >
        <Stack
          sx={{
            flexDirection: {
              xs: "row",
              md: "column",
            },
            alignItems: "center",
            gap: 1,
          }}
        >
          <img
            src={user.profileImage}
            width={100}
            height={100}
            alt="Picture of the author"
            style={{
              display: "inline",
              borderRadius: "50%",
            }}
          />
          <Stack direction="column" spacing={1} mt={0}>
            <Typography variant="h5" sx={{ textAlign: { md: "center" } }}>
              {user.fullName}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ textAlign: { md: "center" } }}
              display={"inline"}
            >
              {user.craft}
            </Typography>
            {/* <Rating name="read-only" value={0} precision={0.5} /> */}
            <NoSsr>
              <HoverRating handicraft={user}></HoverRating>
            </NoSsr>
            {/* follow button */}
            <NoSsr>
              {connectedUser && connectedUser.role == "customer" && (
                <Button variant="contained" size="small" onClick={handelfollow}>
                  {isFollowing ? "Unfollow" : "Follow"}
                </Button>
              )}
            </NoSsr>
          </Stack>
        </Stack>
        <Accordion defaultExpanded={true} sx={{ border: "1px solid #e0e0e0" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Contacts</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Link href={`tel:${user.phoneNumber.number}`}>
              <Stack direction="row" spacing={1} alignItems={"center"}>
                <CallIcon />
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ fontWeight: "bold" }}
                >
                  {user.phoneNumber.number}
                </Typography>
              </Stack>
            </Link>
            <Link href={`mailto:${user.email}`}>
              <Stack direction="row" spacing={1} alignItems={"center"}>
                <EmailIcon />
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ fontWeight: "bold" }}
                >
                  {user.email}
                </Typography>
              </Stack>
            </Link>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ border: "1px solid #e0e0e0" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Address</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Link
              target="_blank"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                user.address
              )}`}
            >
              <Stack direction="row" gap={1} alignItems={"center"}>
                <LocationOnIcon />
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ fontWeight: "bold" }}
                >
                  {user.address}
                </Typography>
              </Stack>
            </Link>
          </AccordionDetails>
        </Accordion>
        {/* <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Show"
        />
        <Collapse in={checked} collapsedSize={40}>
          <email>{user.email}</email>
        </Collapse> */}
      </Paper>
      <Divider orientation="vertical" flexItem />
      <Grid
        container
        component={"section"}
        spacing={1}
        sx={{ maxHeight: { md: "600px", xs: "auto" }, overflow: "auto" }}
      >
        {user.items.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={item._id}
            onClick={() => clickHandler(item)}
          >
            <ItemCard item={item} />
          </Grid>
        ))}
        {user.items.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={item._id}
            onClick={() => clickHandler(item)}
          >
            <ItemCard item={item} />
          </Grid>
        ))}
        {user.items.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={item._id}
            onClick={() => clickHandler(item)}
          >
            <ItemCard item={item} />
          </Grid>
        ))}
        {user.items.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={item._id}
            onClick={() => clickHandler(item)}
          >
            <ItemCard item={item} />
          </Grid>
        ))}
        {user.items.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={item._id}
            onClick={() => clickHandler(item)}
          >
            <ItemCard item={item} />
          </Grid>
        ))}
      </Grid>
      {/* item Modal */}
      {/* <ItemModale
        item={selectedItem}
        setSelectedItem={setSelectedItem}
        open={openModale}
        setOpen={setOpenModale}
      /> */}
      <Modal open={openModale} onClose={handleClose}>
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
              flexGrow={1}
              display={"flex"}
              alignItems={"center"}
            >
              {selectedItem.itemName}
            </Typography>
            <Stack sx={{ flexDirection: "row" }}>
              <Typography fontSize={"120%"} sx={{ flexGrow: 1 }}>
                {selectedItem.price} <strong>MAD</strong>
              </Typography>
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
    </Box>
  );
}

HandicraftProfile.getLayout = function getLayout(page) {
  return <DefualtLayout>{page}</DefualtLayout>;
};
export default HandicraftProfile;

/* export async function getStaticPaths() {
  try {
    const res = await axios.get(
      "http://localhost:3000/api/resources/handicrafts"
    );
    const handicrafts = res.data.data;
    const paths = handicrafts.map((handicraft) => ({
      params: { id: handicraft._id },
    }));

    return { paths, fallback: "blocking" };
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    // throw new Error(`Failed to fetch handicrafts, error: ${error}`);
    return {
      notFound: true,
    };
  }
} */

/* export async function getStaticProps({ params }) {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/resources/handicrafts/${params.id}?includeItems=true`
    );
    const handicraft = res.data.data[0];

    return {
      props: { handicraft },
    };
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    return {
      notFound: true,
    };
  }
} */

export async function getServerSideProps({ params }) {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/resources/handicrafts/${params.id}?includeItems=true`
    );
    const handicraft = await res.data.data[0];

    return {
      props: { handicraft },
    };
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    return {
      notFound: true,
    };
  }
}
