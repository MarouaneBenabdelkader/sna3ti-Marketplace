import { Container } from '@mui/material'
import React from 'react'

function CustomerLayout({children}) {
  return (
    <Container sx={{height:'100vh'}} >
        <nav>customer navbar</nav>
        <main>{children}</main>
    </Container>
  )
}

export default CustomerLayout