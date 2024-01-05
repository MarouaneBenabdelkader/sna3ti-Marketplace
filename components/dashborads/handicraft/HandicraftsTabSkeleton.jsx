import React from 'react'
import { Box, Container, Divider, Grid, Paper, Stack } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'

function HandicraftsTabSkeleton() {
  return (
    <Container
        gap={1}
        sx={{maxWidth:{xs:'95%',md:'90%'}}}  component={"section"}
      >
        <Box
          sx={{
            padding: 2,
            width: {
              xs: "100%",
              md: "80%",
            },
            alignSelf: "center",
          }}
        >
          {/* serch bar */}
          <Skeleton variant="rounded" width={"100%"} height={40} />
          {/* sort */}
        </Box>

        <Divider />

        <Stack flexGrow={1} overflow={"auto"} p={2} gap={2}>
          <Grid container component={"section"} spacing={2}>
            {/* data is an array of handicrafts */}
            {Array.from("ABCDEFGH").map((index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Paper
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 1,
                    width: "100%",
                    gap: 1,
                  }}
                  elevation={3}
                >
                  {/* handicraft image */}
                  <Skeleton
                    variant="rounded"
                    sx={{ borderRadius: "50%" }}
                    height={250}
                    width={250}
                  />
                  {/* handicraft infos */}
                  <Stack alignItems={"center"} spacing={1} >
                    <Skeleton variant="rounded" width={210} height={20} />
                    <Skeleton variant="rounded" width={180} height={18} />
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
  )
}

export default HandicraftsTabSkeleton