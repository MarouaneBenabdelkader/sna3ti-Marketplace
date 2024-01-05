import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function CustomError({ error }) {
  console.log(error);
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      textAlign="center"
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Oops, something went wrong!
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        <code>{error.status}</code> |
        {error.message}
      </Typography>
      
    </Box>
  );
}

export default CustomError;
