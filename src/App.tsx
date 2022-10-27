import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import Navbar from './components/Navbar';
import Router from './routes/Router';
import './styles/App.css';

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  
  return (
    <>
    <ThemeProvider theme={theme} >
    <Navbar />
    <div style={{ marginTop: 10 }}></div>
    <Router />
    </ThemeProvider>
    </>
  );
}

export default App;
