import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/api";

// Importar componentes de MUI
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function SetNewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Leer el token desde la URL
  const token = searchParams.get("token");

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await resetPassword(token, newPassword);
      setMessage(response.message); // Mostrar mensaje de éxito

      // Redirigir al usuario al login o página de inicio si es exitoso
      if (response.message === "Contraseña actualizada correctamente") {
        navigate("/login"); // Cambia la ruta si deseas redirigir a otra página
      }
    } catch (error) {
      console.error(error);
      setMessage("Error al restablecer la contraseña.");
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(45deg, #536d88, #b49b85)",
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
            backgroundColor: "rgba(25, 39, 78, 0.8)",
            borderRadius: "12px",
            boxShadow: 8,
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              color: "#eac195",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: 3,
            }}
          >
            Establecer Nueva Contraseña
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              padding: "20px",
            }}
          >
            <TextField
              label="Nueva contraseña"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              fullWidth
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                input: { color: "#19274e" },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Confirmar contraseña"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              fullWidth
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                input: { color: "#19274e" },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
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
              Establecer Contraseña
            </Button>
          </Box>

          {message && (
            <Typography
              variant="body1"
              sx={{
                color: message.includes("Error") ? "red" : "#eac195",
                textAlign: "center",
                marginTop: 3,
              }}
            >
              {message}
            </Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default SetNewPassword;
