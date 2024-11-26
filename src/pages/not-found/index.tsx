import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import bg from '../../../public/bg.png';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import React from 'react';

const defaultTheme = createTheme();

export default function PageNotFound() {
  const navigate = useNavigate();


  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) window.location.reload();
  })

  return (
    <ThemeProvider theme={defaultTheme}>
      <Button style={{ position: 'absolute', left: 16, top: 16, color: "#000" }} onClick={() => navigate("/")}>Voltar</Button>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              height: '100%'
            }}
          >
            <Typography component="h1" variant="h5" sx={{ fontSize: 36, color: '#34565D' }}>
              Error <span style={{ fontSize: 60 }}> 404</span>
            </Typography>
            <Typography component="h1" variant="h5" sx={{ fontSize: 48, color: '#34565D' }}>
              Página não encontrada
            </Typography>

          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}