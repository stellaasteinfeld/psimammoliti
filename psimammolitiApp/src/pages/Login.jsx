import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Paper, TextField, Typography, Alert } from "@mui/material";
import { useAuth } from "../context";


export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      await login(email.trim(), password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "No se pudo iniciar sesión");
    } finally { setLoading(false); }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100dvh", display: "grid", placeItems: "center" }}>
      <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 }, width: "100%" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Iniciar sesión</Typography>
        <Box component="form" onSubmit={onSubmit} sx={{ display: "grid", gap: 2 }}>
          <TextField
            label="Email" type="email" value={email}
            onChange={(e) => setEmail(e.target.value)} fullWidth required
            autoComplete="email"
          />
          <TextField
            label="Contraseña" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} fullWidth required
            autoComplete="current-password"
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button type="submit" variant="contained" size="large" disabled={loading}>
            {loading ? "Ingresando..." : "Entrar"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
