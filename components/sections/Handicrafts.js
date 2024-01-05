import { Box } from '@mui/system'
import { Button, NoSsr, Skeleton, Stack, Typography } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import { useEffect, useState } from 'react';
import 'swiper/css';
import { Pagination, A11y, Autoplay } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Link from 'next/link';
function Handicrafts() {
    const [topRatedHandicrafts, setTopRatedHandicrafts] = useState(undefined)
    useEffect(() => {
        const fetchTopRatedHandicrafts = async () => {
            try {
                const { data } = await axios.get('/api/resources/top-rated-handicrafts')
                setTopRatedHandicrafts(data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchTopRatedHandicrafts()
    }, [])
    if (!topRatedHandicrafts) return (<Box
        id='handicrafts'
        component='section'
        sx={{
            width: {
                xs: '100%',
                md: '50%',
            },
            height: {
                xs: '85vh',
                md: '100%',
            },
            borderRight: {
                xs: 'none',
                md: '1px solid #e0e0e0'
            },
            borderBottom: {
                xs: '1px solid #e0e0e0',
                md: 'none'
            }
        }}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}

    >
        <Skeleton variant="circular" width={300} height={300} />
        <Skeleton variant="text" width={150} height={40} />
        <Skeleton variant="rounded" width={300} height={30} />

    </Box>)

    return (
        <Box
            id='handicrafts'
            component='section'
            sx={{
                width: {
                    xs: '100%',
                    md: '50%',
                },
                height: {
                    xs: '85vh',
                    md: '100%',
                },
                borderRight: {
                    xs: 'none',
                    md: '1px solid #e0e0e0'
                },
                borderBottom: {
                    xs: '1px solid #e0e0e0',
                    md: 'none'
                }
            }}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <NoSsr>
                <Swiper
                    modules={[Pagination, A11y, Autoplay]}
                    slidesPerView={1}
                    loop={true}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    className='handicarfts_swiper'
                    centeredSlides={true}
                    speed={700} // Set the transition speed in milliseconds
                    effect='fade' // Choose the transition effect (e.g., slide, fade)
                >

                    {
                        topRatedHandicrafts.map((handicraft) => (
                            <SwiperSlide className='custom_slide' key={handicraft._id} >
                                <Link href={`/handicrafts/${handicraft._id}`} style={{ color: 'black', textDecoration: 'none' }} >
                                    <Stack alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
                                        <img
                                            src={handicraft.profileImage}
                                            loading="lazy"
                                            alt={handicraft.fullName}
                                            width={300}
                                            height={300}
                                            style={{ borderRadius: '50%' }}
                                        />
                                        {/* </Image> */}
                                        <Typography
                                            variant="h5"

                                        >
                                            {handicraft.fullName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {handicraft.craft}
                                        </Typography>
                                    </Stack>
                                    <Stack alignItems={'center'} justifyContent={'center'} flexDirection={'row'} sx={{ mt: 2 }}>
                                        <Rating name="read-only" value={handicraft.avgRating} precision={0.5} readOnly />
                                        <Typography variant="body2" color="text.secondary">
                                            ({handicraft.numberOfReviewers > 1 ? handicraft.numberOfReviewers + 'reviews' : handicraft.numberOfReviewers + 'review'} )
                                        </Typography>
                                    </Stack>
                                </Link>
                            </SwiperSlide>
                        ))
                    }

                    {/* Add more slides as needed */}
                </Swiper>
            </NoSsr>
            <Button variant='contained' component={Link} href='/handicrafts' sx={{ width: { xs: '90%', sm: '40%' }, mt: 2 }}>
                View All Handicrafts
            </Button>

        </Box >
    )
}

export default Handicrafts
