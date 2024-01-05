import { Box } from '@mui/system'
import { Button, NoSsr, Stack, Typography } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react';
import Rating from '@mui/material/Rating';
import 'swiper/css';
import { Pagination, A11y, Autoplay } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Link from 'next/link';
import axios from 'axios';
import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
function Items() {
    const [topRatedItems, setTopRatedItems] = useState(undefined)
    useEffect(() => {
        axios.get('/api/resources/top-rated-items')
            .then((res) => {
                setTopRatedItems(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    if (!topRatedItems) return (<Box
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
            id='items'
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
                        reverseDirection: true,
                    }}
                    className='handicarfts_swiper'
                    centeredSlides={true}
                    speed={700} // Set the transition speed in milliseconds
                    effect='fade' // Choose the transition effect (e.g., slide, fade)
                >
                    {
                        topRatedItems.map((item) => (
                            <SwiperSlide className='custom_slide' key={item._id} >
                                <Link href={`/items?item=${item._id}`} style={{ color: 'black', textDecoration: 'none' }} >
                                    <Stack alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
                                        <img
                                            src={item.images[0]}
                                            loading="lazy"
                                            alt={item.iteName}
                                            width={300}
                                            height={300}
                                            style={{ borderRadius: '50%' }}
                                        />

                                        <Typography
                                            variant="h5"

                                        >
                                            {item.itemName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.price} MAD
                                        </Typography>
                                        <Stack alignItems={'center'} justifyContent={'center'} flexDirection={'row'} sx={{ mt: 2 }}>
                                            <Rating name="read-only" value={item.avgRating} precision={0.5} readOnly />
                                            <Typography variant="body2" color="text.secondary">
                                                ({item.numberOfReviewers > 1 ? item.numberOfReviewers + 'reviews' : item.numberOfReviewers + 'review'} )
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Link>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </NoSsr>
            <Button variant='contained' component={Link} href='/items' sx={{ width: { xs: '90%', sm: '40%' }, mt: 2 }}>
                View All Items
            </Button>

        </Box >
    )
}

export default Items
