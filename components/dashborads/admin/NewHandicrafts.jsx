import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Stack,
  Paper,
  Box,
  Typography,
  Divider,
  Button,
  Collapse,
  Alert,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { Skeleton } from "@mui/material";
import axios from "axios";
import CustomError from "./CustomError";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { HandicraftSearchBar } from "@/components/dashborads/admin/searchBars/handicrafts";
import Slide from "@mui/material/Slide";
function NewHandicrafts() {
  const [loading, setLoading] = useState(true);
  const [unCheckedHandicrafts, setUnCheckedHandicrafts] = useState({});
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
  const accepteHandicraft = (handicraft) => {
    axios
      .put(`/api/admins/accept-handicrafts/${handicraft._id}`)
      .then((response) => {
        setAcceptRejectMessage(response.data.message);
        setSeverity("success");
        setOpen(true);
        setUnCheckedHandicrafts(
          unCheckedHandicrafts.filter((unCheckedHandicraft) => unCheckedHandicraft._id !== handicraft._id)
        );
      })
      .catch((error) => {
        console.log(error.response.data);
        setAcceptRejectMessage(error.response.data.message);
        setSeverity("error");
        setOpen(true);
      });
  };
  const rejectHandicraft = (handicraft) => {
    axios
      .delete(`/api/admins/handicrafts/${handicraft._id}`)
      .then((response) => {
        setAcceptRejectMessage(response.data.message);
        setSeverity("info");
        setOpen(true);
        setUnCheckedHandicrafts(
          unCheckedHandicrafts.filter((unCheckedHandicraft) => unCheckedHandicraft._id !== handicraft._id)
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
      .get("/api/admins/handicrafts?checked=false")
      .then((response) => {
        setUnCheckedHandicrafts(response.data.data);
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
      <Grid container spacing={1}>
        {Array(6)
          .fill()
          .map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Skeleton
                key={index}
                variant="rectangular"
                height={350}
                width={"100%"}
                sx={{ my: 0.5 }}
              />
            </Grid>
          ))}
      </Grid>
    );
  }

  if (unCheckedHandicrafts.length === 0) {
    return <h1>No new handicrafts Today</h1>;
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
      <HandicraftSearchBar />
      <Grid container spacing={1} mt={2}>
        {unCheckedHandicrafts.map((handicraft) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={handicraft._id}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 2,
              borderRadius: "5px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <Box maxHeight={"50%"} width={"100%"}>
              <img
                src={handicraft.profileImage}
                alt={handicraft.name}
                style={{
                  minHeight: "100%",
                  minWidth: "100%",
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            </Box>
            <Typography
              textAlign={"center"}
              variant="h6"
              component="h2"
              gutterBottom
            >
              {handicraft.fullName}
            </Typography>
            <Divider />
            <Stack
              sx={{ flexDirection: "row", gap: 1, alignItems: "center" }}
              gap={1}
            >
              <HandymanOutlinedIcon fontSize={"inherite"} />
              <Typography variant="body2" component="span" gutterBottom>
                {handicraft.craft}
              </Typography>
            </Stack>

            <Stack sx={{ flexDirection: "row", gap: 1, alignItems: "center" }}>
              <PhoneOutlinedIcon fontSize={"inherite"} />
              <Typography variant="body2" component="p" gutterBottom>
                {handicraft.phoneNumber.number}
              </Typography>
              <Collapse in={handicraft.phoneNumber.isVerified}>
                <VerifiedIcon color="success" />
              </Collapse>
            </Stack>
            <Stack sx={{ flexDirection: "row", gap: 1, alignItems: "center" }}>
              <AlternateEmailOutlinedIcon fontSize={"inherite"} />
              <Typography variant="body2" component="span" gutterBottom>
                {handicraft.email}
              </Typography>
            </Stack>
            <Stack sx={{ flexDirection: "row", gap: 1, alignItems: "center" }}>
              <LocationOnIcon fontSize={"inherite"} />
              <Typography variant="body2" component="span" gutterBottom>
                {handicraft.address}
              </Typography>
            </Stack>
            <Divider />
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "flex-end",
                justifySelf: "flex-end",
              }}
              gap={1}
            >
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  accepteHandicraft(handicraft);
                }}
              >
                Accept
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  rejectHandicraft(handicraft);
                }}
              >
                Reject
              </Button>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default NewHandicrafts;
