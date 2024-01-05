import {
  Stack,
  Box,
  Divider,
  Paper,
  Typography,
  Rating,
  Grid,
  Container,
} from "@mui/material";
import React from "react";
import useSWR from "swr";
import Pagination from "@mui/material/Pagination";
import Skeleton from "@mui/material/Skeleton";
import { HandicraftSearchBar } from "./SearchBars";
import HandicraftsTabSkeleton from "./HandicraftsTabSkeleton";
import Link from "next/link";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
function calculateAverageRating(ratings) {
  let sum = 0;
  for (let i = 0; i < ratings.length; i++) {
    sum += ratings[i].rate;
  }
  return sum / ratings.length;
}
function HandicraftsTab() {
  const { data, error } = useSWR("/api/resources/handicrafts", fetcher);

  if (error) return <div>Failed to load</div>;

  if (!data)
    return (
      <HandicraftsTabSkeleton />
    );

  const formatAddress = (address) => {
    if (address.length > 20) {
      return address.slice(0, 20) + "...";
    }
    return address;
  };
  return (
    <Container sx={{maxWidth:{xs:'95%',md:'90%'}}} margin={'auto'} component={"section"}
    >
      {/* search bar box */}
      <Box
        sx={{
          padding: 2,
          width: {
            xs: "100%",
            md: "80%",
          },
          alignSelf: "center",
          margin:'auto',
          position:'sticky',
        }}
      >
        {/* serch bar */}
        <HandicraftSearchBar />
        {/* sort */}
      </Box>

      <Divider />

      <Stack flexGrow={1} overflow={"auto"} p={2} gap={2}>
        <Grid container component={"section"} spacing={2}>
          {/* data is an array of handicrafts */}
          {data.data.map((handicraft) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={handicraft._id}>
              <Paper
                key={handicraft._id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 1,
                  width: "100%",
                }}
                elevation={3}
              >
                {/* handicraft image */}
                <img
                  src={handicraft.profileImage}
                  alt={handicraft.fullName}
                  style={{ width: "90%", borderRadius: "50%" }}
                />
                {/* handicraft infos */} 
                <Stack alignItems={"center"}>
                  <Typography variant="h6" fontWeight="bold" component={Link} href={`/handicrafts/${handicraft._id}`} >
                    {handicraft.fullName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {handicraft.craft}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {formatAddress(handicraft.address)}
                  </Typography>
                  <Stack flexDirection={"row"} alignItems={"center"}>
                    <Rating
                      name="read-only"
                      value={calculateAverageRating(handicraft.rates)}
                      precision={0.5}
                      readOnly
                    />
                    <Typography variant="body2" color="text.secondary">
                      ({handicraft.rates.length} reviews)
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Box alignSelf={"center"} justifySelf={"center"}>
          {/* bagination */}
          <Pagination count={10} color="primary" />
        </Box>
      </Stack>
    </Container>
  );
}

export default HandicraftsTab;
