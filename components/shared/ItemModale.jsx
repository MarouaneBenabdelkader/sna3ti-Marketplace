import React from "react";
export default ItemModale;
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Divider, Rating, Stack } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  maxWidth: {
    xs: "90%",
    sm: "80%",
    md: 470,
  },
  maxHeight: {
    xs: "90%",
    sm: "80%",
    md: "60%",
    lg: "80%",
  },
  // border: '2px solid #000',
  boxShadow: "none",
  display: "flex",
  flexDirection: "column",
  border: "none",
  borderRadius: "10px",
  gap:1
};

function ItemModale({ item, setSelectedItem, open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
    // setSelectedItem({})
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          alignSelf={"stretch"}
          p={1}
          flexWrap={'wrap'}
        >
          <Typography fontSize={"1.3rem"} sx={{ p: 1 }}>
            {item.price} <strong>MAD</strong>
          </Typography>
          <Typography
            id="modal-modal-title"
            variant="h6"
            flexGrow={1}
            component="h2"
            p={1}
            
          >
            {item.itemName}
          </Typography>
          <Rating value={0} precision={0.5} />
        </Stack>
        <Divider />
        <Swiper
          style={{  flexGrow: 1, width: "100%" }}
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
          {item?.images?.map((image) => (
            <SwiperSlide key={image} style={{ flexGrow:1,maxWidth: "100%",display:'flex',justifyContent:"center" }}>
              <img
                style={{ objectFit: "cover",borderRadius:'10px' }}
                src={image}
                alt={item.name}
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Divider  />

        {item?.description && (
          <Typography variant="body1" sx={{ p: 1 }}>{item.description}</Typography>
        )}
        <Stack direction="row" alignItems={"center"} sx={{ p: 1 }}>
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
              }}
            href={`https://wa.me/212652-652-652?text=I%20want%20to%20order%20${item.itemName}%20from%20your%20website`}
            startIcon={<WhatsAppIcon />}
          >
            order via whatsapp
          </Button>
          <Button variant="variant" color="primary" onClick={handleClose}>
            Close
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
