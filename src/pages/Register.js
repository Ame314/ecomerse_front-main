// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

// Importar componentes de MUI
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button
} from "@mui/material";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(username, email, password);
      alert("Usuario registrado con éxito");
      navigate("/login");
    } catch (error) {
      alert("Error al registrar usuario");
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate("/login");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Registro
        </Typography>

        <Box
          component="form"
          onSubmit={handleRegister}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Nombre de usuario"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" color="primary" type="submit">
              Registrarme
            </Button>

            <Button variant="outlined" color="primary" onClick={handleCancel}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;
