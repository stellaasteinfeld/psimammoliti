import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../context";

export default function HomePage() {
  const { user, logout, session } = useAuth();
  const left = session?.expiresAt ? Math.max(0, session.expiresAt - Date.now()) : null;

  return (
    <Box sx={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <AppBar position="static">
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Demo App</Typography>
          <Typography variant="body2" sx={{ mr: 1 }}>{user?.email}</Typography>
          <Button color="inherit" onClick={logout}>Cerrar sesión</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: { xs: 3, sm: 4 }, flexGrow: 1 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>Bienvenida 👋</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Estás autenticada. Esta página está protegida por ruta.
        </Typography>
        {left !== null && (
          <Typography variant="body2" color="text.secondary">
            La sesión vence en ~{Math.ceil(left / (1000 * 60))} min.
          </Typography>
        )}
      </Container>
    </Box>
  );
}
