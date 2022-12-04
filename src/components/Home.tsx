import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import FrontCard from './FrontCard';

function Home() {
  const [game, setGame] = useState({
    slug: "",
    results: [],
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const axios = require("axios").default;

  useEffect(() => {
    if (game.slug !== "") {
      const timeoutId = setTimeout(() => {
        const fetch = async () => {
          try {
            const res = await axios.get("https://localhost:7217/api/FindGame?gamename="+game.slug)
            setGame({ ...game, results: res.data });
            setIsLoaded(true);
          } catch (err) {
            console.error(err);
          }
        };
        fetch();
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [game.slug])


      return (
          <Box
          display="flex" 
          bgcolor="grey"
        >
          <Box m="auto">
            {isLoaded ?
            <>
            <FrontCard />
            
            {game.results[1].appId}
            {game.results[1].name}
            </>
            :
            <>Loading....</>
}
          </Box>
        </Box>
      )
}

export default Home;