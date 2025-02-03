import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box, Grid, Paper, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaAddressCard } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();

  // Estado para los datos del perfil
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Verificar si el usuario está logueado al cargar el componente
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("email");
    const storedAddress = localStorage.getItem("address");

    if (!storedUserName) {
      alert("Por favor, inicie sesión.");
      navigate("/login");  // Redirigir a la página de login
    } else {
      setUserName(storedUserName);
      setEmail(storedEmail || "");
      setAddress(storedAddress || "");
    }
  }, [navigate]);

  // Función para guardar los datos actualizados en localStorage
  const handleSave = () => {
    // Guardar datos actualizados en localStorage
    localStorage.setItem("userName", userName);
    localStorage.setItem("email", email);
    localStorage.setItem("address", address);

    setIsEditing(false); // Desactivar el modo de edición
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: 3 }}>
      <Paper sx={{ padding: 3, width: "100%", maxWidth: 600 }}>
        <Box sx={{ textAlign: "center", marginBottom: 3 }}>
          <Avatar sx={{ width: 100, height: 100, marginBottom: 2, backgroundColor: "primary.main" }}>
            {userName[0]?.toUpperCase()}
          </Avatar>
          <Typography variant="h4" gutterBottom>
            {userName}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {/* Campo Email */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FaEnvelope size={20} style={{ marginRight: 8 }} />
              <TextField
                label="Correo Electrónico"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
              />
            </Box>
          </Grid>

          {/* Campo Dirección */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FaAddressCard size={20} style={{ marginRight: 8 }} />
              <TextField
                label="Dirección"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={!isEditing}
              />
            </Box>
          </Grid>

          {/* Botones de acción */}
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            {!isEditing ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsEditing(true)}
                fullWidth
              >
                Editar Perfil
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  sx={{ marginRight: 2 }}
                >
                  Guardar Cambios
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Profile;
