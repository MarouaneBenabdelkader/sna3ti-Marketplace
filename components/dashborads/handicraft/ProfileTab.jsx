import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import MyItem from "./MyItem";
import Error from "@/components/Error";
import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import Divider from "@mui/material/Divider";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Container, NoSsr } from "@mui/material";
import { calculateAverageRating } from "@/lib";
function ProfileTab() {
  const user = useSelector((state) => state.user) || {};
  return (
    <Box
      sx={{
        maxWidth: { xs: "95%", md: "90%" },
        height: {
          xs: "auto",
          md: "80vh",
        },
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
      height={"80vh"}
      overflow={"auto"}
    >
      {/* profile Card */}
      <Paper
        elevation={0}
        sx={{
          padding: 1,
          display: "flex",
          flexDirection: "column",
          width: {
            xs: 1,
            md: 3 / 12,
          },
          height: "fit-content",
          gap: 1,
          border: "1px solid #e0e0e0",
        }}
      >
        <NoSsr>
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
              <Stack direction="row" spacing={1} alignItems={"center"}>
                <Rating
                  name="read-only"
                  value={calculateAverageRating(user.rates)}
                  precision={0.5}
                  readOnly
                />
                <Typography variant="subtitle1" display={"inline"}>
                  (
                  {user.rates?.length > 1
                    ? `${user.rates?.length} reviews`
                    : `${user.rates?.length} review`}
                  )
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Accordion sx={{ border: "1px solid #e0e0e0" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Contacts</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Link href={`tel:${user.phoneNumber?.number}`}>
                <Stack direction="row" spacing={1} alignItems={"center"}>
                  <CallIcon />
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ fontWeight: "bold" }}
                  >
                    {user.phoneNumber?.number}
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
        </NoSsr>
      </Paper>

      <Divider orientation="vertical" flexItem />

      <ItemsContainer />
    </Box>
  );
}
export default ProfileTab;
function ItemsContainer() {
  // const { data, error } = useSWR("/api/handicrafts/myProfile", fetcher)
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("/api/handicrafts/myProfile")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  }, []);

  if (error) return <Error error={error} />;
  if (!data)
    return (
      <Grid
        container
        sx={{
          width: {
            xs: 1,
            md: 9 / 12,
          },
        }}
        component={"section"}
        spacing={1}
      >
        {Array(10)
          .fill()
          .map((number, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  padding: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  width: "100%",
                }}
              >
                <Skeleton variant="text" width={"59%"}></Skeleton>

                <Skeleton variant="rectangular" width={"100%"} height={200} />
                <Skeleton variant="text" width={"100%"}></Skeleton>
              </Paper>
            </Grid>
          ))}
      </Grid>
    );
  return (
    <Grid
      container
      sx={{
        width: {
          xs: 1,
          md: 9 / 12,
        },
      }}
      overflow={"auto"}
      component={"section"}
      spacing={1}
    >
      {data.items.map((item) => {
        if (item.checked === true && item.visibility === true ) {
          return (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <MyItem item={item} />
            </Grid>
          );
        }
        return ;
      })}
    </Grid>
  );
}
