import { Card, Rating, Stack, Typography, Box, Grid } from "@mui/material";
// import { useSelector } from "react-redux";
// import Image from "next/image";
// import MyItem from "./MyItem";
import ItemCard from "@/components/shared/ItemCard";
import ItemModale from "@/components/shared/ItemModale";
function HandicraftProfile({user}) {
  const [selectedItem, setSelectedItem] = React.useState(null);

  return (
    <Stack
      flexGrow={1}
      flexDirection="column"
      alignItems={"stretch"}
      justifyContent={"flex-start"}
      height={"100%"}
      width={"100%"}
    >
      <Box padding={2} borderBottom={"1px solid lightGray"}>
        <Stack direction="row" alignItems="center" spacing={2}>
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
          <Stack direction="column" spacing={1}>
            <Typography variant="h5">{user.fullName}</Typography>
            <Stack direction="row" spacing={2} alignItems={"center"}>
              <Typography variant="subtitle1" display={"inline"}>
                {user.craft}
              </Typography>
              <Rating name="read-only" value={1.5} precision={0.5} readOnly />
            </Stack>
          </Stack>
        </Stack>
      </Box>

      <Stack flexGrow={1} overflow={"auto"} p={2} gap={2}>
        <Grid container component={"section"} spacing={1}>
          {user.items.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id} >
              <ItemCard item={item} setSelectedItem={setSelectedItem} />
            </Grid>
          ))}
        </Grid>
      </Stack>
      <ItemModale item={selectedItem} setSelectedItem={setSelectedItem} />
    </Stack>
  );
}
export default HandicraftProfile;
