import { Box } from '@mui/material';
import Asynchronous from './AsynchronousSearch';

function Search() {
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