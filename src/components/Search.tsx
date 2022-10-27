import { Box, Grid } from '@mui/material';
import React from 'react';
import Asynchronous from './AsynchronousSearch';
import { createTheme } from "@mui/material/styles";

function Search() {
    //const classes = useStyles()
    return (
        <Box
        display="flex" 
        bgcolor="grey"
      >
        <Box m="auto">
          <Asynchronous />
        </Box>
      </Box>
    )
}

export default Search;