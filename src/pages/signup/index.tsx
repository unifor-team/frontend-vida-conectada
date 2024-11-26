import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signup } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';

import { notifyFail, notifySuccess } from '../../utils/toast';
import bg from '/bg-page.png';

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params = {
      email: String(data.get('email')),
      password: String(data.get('password')),
      name: String(data.get('fullName'))
    };

    const response = await signup(params);
    
    if (response.status >= 400) {
      notifyFail(response.message)();
    } else {
      notifySuccess(response.message)();
      notifySuccess("Você está sendo redirecionado automáticamente...")();
      setTimeout(() => navigate("/"), 2000);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main"  sx={{ height: '100vh' }}>
        <CssBaseline />      
        <Grid item xs={12}
        sx={{
            backgroundImage: `url(${bg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Cadastro
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Nome completo"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, background: '#1AA0B9' }}
            >
              Cadastrar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Você já possui uma conta? Logar-se
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}