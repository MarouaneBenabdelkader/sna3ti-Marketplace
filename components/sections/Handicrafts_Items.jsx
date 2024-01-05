import React from 'react'
import { Stack } from '@mui/material';
import {Handicrafts,Items} from './';
function Handicrafts_Items() {
  return (
    <Stack
        flexDirection={'row'}
        flexWrap={'wrap'}
        width={'100%'}
        sx={{
          height: {
            md: '80vh'
          }
        }}
        spacing={{ xs: 2, sm: 0 }}
        p={2}
        alignItems={'center'}
      >
        <Handicrafts></Handicrafts>
        <Items></Items>
      </Stack>
  )
}

export default Handicrafts_Items