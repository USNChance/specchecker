import React from 'react';
import { Box, Grid } from '@mui/material';
import FrontCard from './FrontCard';
import BackCard from './BackCard';

function Home() {
    return (
        <Box
        display="flex" 
        bgcolor="grey"
      >
        <Box m="auto">
          <FrontCard />
        </Box>
      </Box>
    )
}

export default Home;