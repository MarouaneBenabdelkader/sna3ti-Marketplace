import React from 'react'
import { Box, Button, Collapse, Container, Typography } from '@mui/material'
import Image from 'next/image';
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}
function About() {
  const [showMore, setShowMore] = React.useState(false);

  return (
    <Container
      id='about'
      component='section'
      disableGutters={true}
      sx={{
        minHeight: '70vh',
        minWidth: '100%',
        bgcolor: 'orange',
        display: 'flex',
        flexDirection: {
          sm: 'column',
          md: 'row',
        },
        p: {
          xs: 2,
          md: 8,

        },
        flexWrap: 'wrap-reverse',
        gap: 1
      }}
    >
      <Box sx={{ width: { xs: '100%', md: '48%' } }} >
        <Typography component="h1" variant='h3' sx={{
          fontSize: {
            xs: '1.4rem',
            md: '3rem',
          }
        }} color="inherit" gutterBottom>
          Elevate your artisan business with Sna3ti - The platform that showcases your talent!
        </Typography>
        <Collapse in={showMore} collapsedSize={120} >
          <Typography variant="body1" color="inherit"  paragraph>
            <b>myCraft</b>, the premier online platform dedicated to showcasing the extraordinary beauty and cultural richness of Moroccan handicraft.
            We connect artisans with a global audience, creating a space where their exquisite creations can shine.
            At <b>myCraft</b>, we value preserving traditional craftsmanship while embracing modern technology.
            Explore our digital marketplace to discover authentic Moroccan artistry, ranging from stunning ceramics and textiles to mesmerizing metalwork and leather goods.
            Join us in celebrating the artisans who bring their passion and skill to every masterpiece, making the world more vibrant and culturally diverse.
            Experience the artistry, beauty, and authenticity of Moroccan handicraft at <b>myCraft</b>.
          </Typography>
        </Collapse>
        <Button variant={'contained'}
          disableElevation={true}
          sx={{
            color: 'white',
            bgcolor: 'black',
            mt: 2,
          }}
          onClick={() => setShowMore((showMore) => !showMore)}>{showMore ? 'show less' : 'read more'}</Button >
      </Box>

      <Box sx={{ width: { xs: '100%', md: '50%' } }} >
        <img src={'/images/About2jpg.jpg'} loading='lazy' width={'100%'} style={{ objectFit: 'cover', boxShadow: '10px 10px' }} >

        </img>
      </Box>

    </Container>
  )
}

export default About
