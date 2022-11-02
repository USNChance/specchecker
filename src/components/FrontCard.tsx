import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography display ="block" variant="h5" component="div">
        An Overview of SpecChecker:
      </Typography>
      <Typography sx={{ fontSize: 19 }} color="text.secondary" gutterBottom>
      An enjoyable pastime many people enjoy whenever they want to unwind is playing video games and most of these gamers are turning their attention to desktop and laptop gaming. 
      However, it’s a shame when some of these same people aren’t allowed to enjoy new game releases and play with friends alike who are able to share these gaming experiences 
      with one another when their computer is not able to run it. At the same time, people do not want to drop a small fortune on hardware components that they might not use 
      to their full potential or purpose. Wouldn’t it be nice if there was a web application that could tell you, without having to do any research, what the basic 
      hardware components are required to run a new game release? Fortunately for you, there is SpecChecker. SpecChecker is a quick and efficient web application ‘tool’ 
      that can tell you exactly what the minimum or personally recommended computer hardware components are required to play a certain game. This will help you save time and 
      money in the process by not having to do research to find computer components that may or may not be the right part you may need. So, whether it be the RAM, GPU, PSU, 
      or a new processor, make sure you choose SpecChecker for the right parts for your computer system setup.
      </Typography>

      <Typography display ="block" variant="h5" component="div">
        Updates in the Near Future:
      </Typography>
      <Typography sx={{ fontSize: 19 }} color="text.secondary" gutterBottom>
      Coming soon in the near future a store retailer recommendation system will be implemented. 
      With this future update, users will now be able to find their minimum/recommended hardware components for their personal computer from trusted and 
      reputable online stores including:
      </Typography>

      <Typography>
        {bull} Amazon
      </Typography>
      <Typography>
        {bull} eBay
      </Typography>
      <Typography>
        {bull} iBuyPower
      </Typography>
      <Typography>
        {bull} Microcenter
      </Typography>
      <Typography>
        {bull} NewEgg
      </Typography>
      <Typography>
        {bull} And others
      </Typography>

      <Typography sx={{ fontSize: 19 }} color="text.secondary" gutterBottom>
      We appreciate you for using our service and will be glad to see you back soon when the time comes to upgrade your computer’s hardware components.
      </Typography>


    </CardContent>

  </React.Fragment>
);

export default function FrontCard() {
  return (
    <Box sx={{ minWidth: 200 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}