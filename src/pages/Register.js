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
    <Box
      sx={{
        background: "linear-gradient(45deg, #536d88, #77f2de)", // Fondo degradado similar
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            padding: "40px",
            backgroundColor: "rgba(15, 19, 46, 0.85)", // Fondo oscuro translúcido
            borderRadius: "12px",
            boxShadow: 15,
            backdropFilter: "blur(10px)", // Desenfoque suave
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              color: "#eac195", // Color dorado suave para el título
              fontWeight: 700,
              textAlign: "center",
              marginBottom: 3,
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Registro
          </Typography>

          {/* FORMULARIO */}
          <Box
            component="form"
            onSubmit={handleRegister}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              padding: "20px",
            }}
          >
            <TextField
              label="Nombre de usuario"
              type="text"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                input: {
                  color: "#19274e", // Azul oscuro
                },
              }}
            />

            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                input: {
                  color: "#19274e", // Azul oscuro
                },
              }}
            />

            <TextField
              label="Contraseña"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                input: {
                  color: "#19274e", // Azul oscuro
                },
              }}
            />

            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#eac195", // Botón dorado
                  "&:hover": {
                    backgroundColor: "#b49b85", // Hover más suave
                  },
                  padding: "15px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  marginTop: "20px",
                }}
              >
                Registrarme
              </Button>

              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{
                  borderColor: "#eac195",
                  color: "#eac195",
                  "&:hover": {
                    borderColor: "#b49b85",
                    color: "#b49b85",
                  },
                  padding: "15px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  marginTop: "20px",
                }}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Register;
