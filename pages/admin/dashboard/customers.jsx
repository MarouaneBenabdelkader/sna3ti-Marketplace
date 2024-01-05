import React from "react";
import AdminDashboardLayout from "@/components/dashborads/admin/AdminDashboardLayout";
import { useState, useEffect } from "react";
import {
  Grid,
  Stack,
  Box,
  Typography,
  Divider,
  Button,
  Collapse,
  Alert,
  Snackbar,
  Skeleton,
  Slide,
} from "@mui/material";
import CustomError from "@/components/dashborads/admin/CustomError";
import axios from "axios";
import { CustomersSearchBar } from "@/components/dashborads/admin/searchBars/Customers";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
function Customers() {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState({});
  const [error, setError] = useState(null);

  const [removeCustomreResponse, setRemoveCustomerResponse] = useState("");
  const [open, setOpen] = useState(false);
  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("right");
  const [severity, setSeverity] = useState("success");

  const removeCustomer = (customer) => {
    axios
      .delete(`/api/admins/customers/${customer._id}`)
      .then((response) => {
        setRemoveCustomerResponse(response.data.message);
        setSeverity("info");
        setOpen(true);
        setCustomers(customers.filter((c) => c._id !== customer._id));
      })
      .catch((error) => {
        console.log(error.response.data);
        setRemoveCustomerResponse(error.response.data.message);
        setSeverity("error");
        setOpen(true);
        setError(error.response.data);
      });
  };
  function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    axios
      .get("/api/admins/customers")
      .then((response) => {
        setCustomers(response.data.data);
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
                height={400}
                width={"100%"}
                sx={{ my: 0.5 }}
              />
            </Grid>
          ))}
      </Grid>
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
          {removeCustomreResponse}
        </Alert>
      </Snackbar>
      <CustomersSearchBar />
      <Grid container spacing={1} mt={2}>
        {customers.map((customer) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={customer._id}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 2,
              borderRadius: "5px",
              boxShadow: "0 0 5px rgba(0,0,0,0.1)",
              gap: 1,
            }}
          >
            <img
              src={customer.profileImage}
              alt={customer.name}
              style={{
                minHeight: 200,
                minWidth: 200,
                maxHeight: 200,
                maxWidth: 200,
                objectFit: "cover",
                borderRadius: "50%",
                alignSelf: "center",
              }}
            />
            <Typography
              textAlign={"center"}
              variant="h6"
              component="h2"
              gutterBottom
            >
              {customer.fullName}
            </Typography>
            <Divider />

            <Stack sx={{ flexDirection: "row", gap: 1, alignItems: "center" }}>
              <PhoneOutlinedIcon fontSize={"inherite"} />
              <Typography variant="body2" component="p" gutterBottom>
                {customer.phoneNumber.number}
              </Typography>
              <Collapse in={customer.phoneNumber.isVerified}>
                <VerifiedIcon color="success" />
              </Collapse>
            </Stack>
            <Stack sx={{ flexDirection: "row", gap: 1, alignItems: "center" }}>
              <AlternateEmailOutlinedIcon fontSize={"inherite"} />
              <Typography variant="body2" component="span" gutterBottom>
                {customer.email}
              </Typography>
              <Collapse in={customer.emailVerified}>
                <VerifiedIcon color="success" />
              </Collapse>
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
                color="secondary"
                onClick={() => removeCustomer(customer)}
              >
                remove
              </Button>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Customers;
Customers.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
