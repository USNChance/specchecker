import { Box } from '@mui/material';
import FrontCard from './FrontCard';

function Home() {
      return (
          <Box
          display="flex" 
          bgcolor="grey"
        >
          <Box m="auto" padding="100px">
            <FrontCard />
          </Box>
        </Box>
      )
}

export default Home;