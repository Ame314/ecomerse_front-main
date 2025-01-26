import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetRequest } from "../services/api";

// Importar componentes de MUI
import { Container, Box, Paper, Typography, TextField, Button } from "@mui/material";

function RequestPasswordReset() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetRequest(email);
      alert("Se ha enviado un correo con instrucciones para restablecer tu contraseña");
      navigate("/login"); // Redirige al login después de enviar el correo
    } catch (error) {
      console.error("Error:", error);
      alert("Error al solicitar la recuperación de contraseña");
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
            Recuperar Contraseña
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
              label="Correo electrónico"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                input: { color: "#19274e" },
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
              Enviar
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default RequestPasswordReset;
