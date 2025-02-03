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
      localStorage.setItem("username",data.user.username);

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
    <Box
      sx={{
        background: "linear-gradient(45deg, #536d88, #b49b85)", // Fondo degradado
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={5}
          sx={{
            padding: "40px",
            backgroundColor: "rgba(25, 39, 78, 0.8)", // Fondo translúcido y elegante
            borderRadius: "12px",
            boxShadow: 8,
            backdropFilter: "blur(10px)", // Efecto de desenfoque sutil
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              color: "#eac195",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: 3,
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Iniciar Sesión
          </Typography>

          {/* FORMULARIO */}
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              padding: "20px",
            }}
          >
            <TextField
              label="Correo"
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
                  color: "#19274e",
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
                  color: "#19274e",
                },
              }}
            />

            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#eac195",
                "&:hover": {
                  backgroundColor: "#b49b85",
                },
                padding: "15px",
                fontSize: "16px",
                borderRadius: "8px",
                marginTop: "20px",
              }}
            >
              Entrar
            </Button>
          </Box>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body1" sx={{ color: "#eac195" }}>
              ¿Olvidaste tu contraseña?{" "}
              <Link to="/reset-password" style={{ color: "#eac195", fontWeight: 500 }}>
                Recuperar contraseña
              </Link>
            </Typography>
          </Box>


          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body1" sx={{ color: "#eac195" }}>
              ¿Eres nuevo?{" "}
              <Link to="/register" style={{ color: "#eac195", fontWeight: 500 }}>
                Regístrate
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;
