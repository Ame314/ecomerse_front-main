// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";

// Importar componentes de MUI
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button
} from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      alert("Login exitoso");

      if (data.user.role === "admin") {
        navigate("/admin/product/create");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert("Error al iniciar sesión");
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Iniciar Sesión
        </Typography>

        {/* FORMULARIO */}
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Correo"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />

          <Button variant="contained" color="primary" type="submit">
            Entrar
          </Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            ¿Eres nuevo?{" "}
            <Link to="/register" style={{ color: "#1976d2" }}>
              Regístrate
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;

