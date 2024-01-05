import { useEffect, useState } from "react";
import DefualtLayout from "@/components/dashborads/DefualtLayout";
import {
  Container,
  Skeleton,
  Typography,
  Stack,
  Box,
  Paper,
  Rating,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { Grid, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import NoSsr from "@mui/base/NoSsr";
import axios from "axios";
import Link from "next/link";
function calculateAverageRating(ratings) {
  let sum = 0;
  for (let i = 0; i < ratings.length; i++) {
    sum += ratings[i].rate;
  }
  return sum / ratings.length;
}
function profile() {
  const user = useSelector((state) => state.user);
  const [following, setFollowing] = useState(user?.following || []);
  const [handicrafts, setHandicrafts] = useState([]);

  useEffect(() => {
    async function getHandicrafts() {
      let copy = [];
      for (let i = 0; i < following.length; i++) {
        const res = await axios.get(`/api/resources/handicrafts/${following[i]}`);
        const responseBody = await res.data;
        const data = responseBody.data[0];
        copy.push(data);
        setHandicrafts((prev) => copy);
        // console.log(handicrafts)
      }
    }
    getHandicrafts();
  }, [following]);

  return (
    <DefualtLayout>
      <Box
        sx={{
          maxWidth: { xs: "95%", md: "75%" },
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
        minHeight={"70vh"}
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
              md: 1 / 4,
            },
            minHeight: 200,
            gap: 1,
            border: "1px solid #e0e0e0",
          }}
        >
          <Stack
            sx={{
              flexDirection: {
                md: "column",
              },
              alignItems: "center",
              gap: 1,
            }}
          >
            <NoSsr>
              <img
                src={user?.profileImage}
                width={200}
                height={200}
                alt="Picture of the author"
                style={{
                  display: "inline",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />

              <Stack direction="column" spacing={1} mt={0}>
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                  {user?.fullName}
                </Typography>
                <Typography variant="subtitle1" display={"inline"}>
                  {user?.email}
                </Typography>
              </Stack>
            </NoSsr>
          </Stack>
        </Paper>

        <Divider orientation="vertical" flexItem />
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            maxHeight: { md: "600px", xs: "auto" },
            overflow: "auto",
            width: {
              md: 3 / 4,
              xs: 1,
            },
            gap: 1,
          }}
        >
          <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Handicrafts I Follow 
          </Typography>
          <GroupIcon />
          </Stack>
          <Divider />
          <ListOfHandicraftsIfollow handicrafts={handicrafts} />
        </Container>
      </Box>
    </DefualtLayout>
  );
}

export default profile;

function ListOfHandicraftsIfollow({ handicrafts }) {
  return (
    <>
      <Grid container component={"section"} spacing={1}>
        <NoSsr>
          {handicrafts.map((handicraft) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={handicraft._id}>
              <Paper
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
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    component={Link}
                    href={`/handicrafts/${handicraft._id}`}
                  >
                    {handicraft.fullName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {handicraft.craft}
                  </Typography>
                  <Stack
                    flexDirection={"row"}
                    flexWrap={"wrap"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
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
        </NoSsr>
      </Grid>
    </>
  );
}
