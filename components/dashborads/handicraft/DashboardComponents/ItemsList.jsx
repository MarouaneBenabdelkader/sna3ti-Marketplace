import Error from "@/components/Error";
import MyItemCard from "@/components/dashborads/handicraft/DashboardComponents/MyItemCard";
import { Container, Grid, Paper, Skeleton } from "@mui/material";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
export default function ItemsList({
  error,
  items,
  setResponseMessage,
  setOpen,
  setSeverity,
  setItems,
  setDialogDeleteOpen,
  itemsToRender,
  setSelectedItemDelete,
  setItemToBeModified,
  setIsEditModalOpen
}) {
  if (error) return <Error error={error} />;
  if (!items)
    return (
      <Grid container spacing={1}>
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
                  m: 0,
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

  if (items.filter((item) => item.visibility === itemsToRender).length == 0)
    return (
      <Container>
        <FilterNoneIcon sx={{ fontSize: 100 }} />
        <h1>You have no items</h1>
      </Container>
    );
  else
    return (
      <Grid container spacing={1}>
        {items.map((item) => {
          if (item.visibility !== itemsToRender) return;
          return (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <MyItemCard
                item={item}
                setResponseMessage={setResponseMessage}
                setOpen={setOpen}
                setSeverity={setSeverity}
                setItems={setItems}
                setDialogDeleteOpen={setDialogDeleteOpen}
                setSelectedItemDelete={setSelectedItemDelete}
                setItemToBeModified={setItemToBeModified}
                setIsEditModalOpen={setIsEditModalOpen}
              />
            </Grid>
          );
        })}
      </Grid>
    );
}
