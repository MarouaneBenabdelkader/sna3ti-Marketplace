import React from 'react'
import { Container, Stack, Typography, Box } from '@mui/material'
import Grid from '@mui/material/Grid'
import Image from 'next/image'
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import Link from '@mui/material/Link';

function Contact() {
    return (
        <>
            {/* The Footer Container */}
            <Stack
                id='contact'
                component='footer'
                sx={{
                    minHeight: '50vh',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: { xs: 'flex-start' },
                    alignItems: 'center',
                }}

            >
                {/* Logo of the plateform */}
                <Image src="/logs/6.png"
                    width={250}
                    height={250}
                    style={{ borderRadius: '50%' }}
                    alt="website logo"
                />

                {/* The Contacts and services container */}
                <Stack spacing={2} sx={{ flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'space-around' } }}>

                    <Stack spacing={2} >
                        <Typography variant='h5' component='h5' sx={{ fontWeight: 'bold' }} textAlign={'center'} >
                        Espace Bureau Allal Ben Abdellah 54 Av. Allal Ben Abdellah, 3ème étage Bur. 24, Fès 30000 .
                        </Typography>

                        <Stack direction='row' spacing={2} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }} >
                            <Link href="tel:+1234567890" underline="none"  >
                                <Stack direction='row' spacing={1} >
                                    <CallIcon />
                                    <Typography variant='body1' component='p' sx={{ fontWeight: 'bold' }} >
                                        Call Us
                                    </Typography>
                                </Stack>
                            </Link>
                            <Link href="mailto:someone@example.com" underline="none"  >
                                <Stack direction='row' spacing={1} >
                                    <EmailIcon />
                                    <Typography variant='body1' component='p' sx={{ fontWeight: 'bold' }} >
                                        E-mail
                                    </Typography>
                                </Stack>
                            </Link>
                        </Stack>

                    </Stack>

                    <Box padding={3} >
                        <Typography
                            variant='h6' component='h4' sx={{ fontWeight: 'bold' }}
                        >
                            Customer Service
                        </Typography>
                        <ul>
                            <li> Terms and Conditions </li>
                            <li> Delivery and Returns </li>
                            <li> User Privecy</li>
                        </ul>
                    </Box>

                </Stack>
            </Stack>
        </>

    )
}

export default Contact