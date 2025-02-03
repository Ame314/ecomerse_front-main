// src/pages/Profile.js
import React, { useState, useEffect } from "react";
import { getCurrentUser, updateUser } from "../services/api";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Profile({ setLayoutTrigger }) {
  // NOTA: Recibimos `setLayoutTrigger` como prop, 
  // que nos pasará el Layout con React.cloneElement.

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    role: "",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    // Al montar, obtenemos la info del usuario
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUserData({
          username: data.username,
          email: data.email,
          role: data.role,
        });
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
        // Si el token no es válido, se podría redirigir al login
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleSave = async () => {
    try {
      // 1. Actualizamos los datos en la base
      const updatedData = await updateUser({
        username: userData.username,
        email: userData.email,
      });
      // updatedData = { id, username, email, role }

      // 2. Actualizamos el estado local
      setUserData({
        ...updatedData,
      });
      setEditing(false);

      // 3. Guardamos el username y el rol en localStorage
      localStorage.setItem("username", updatedData.username);
      localStorage.setItem("role", updatedData.role);

      // 4. Forzamos re-render en el Layout (incrementa el "trigger")
      if (setLayoutTrigger) {
        setLayoutTrigger((prev) => prev + 1);
      }

      alert("Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      alert("Hubo un error al actualizar el perfil");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Mi Perfil
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Nombre de Usuario"
            name="username"
            value={userData.username}
            onChange={handleChange}
            disabled={!editing}
            fullWidth
          />
          <TextField
            label="Correo"
            name="email"
            value={userData.email}
            onChange={handleChange}
            disabled={!editing}
            fullWidth
          />
          <TextField
            label="Rol"
            name="role"
            value={userData.role}
            disabled
            fullWidth
          />

          {!editing ? (
            <Button variant="contained" onClick={handleEdit}>
              Editar
            </Button>
          ) : (
            <Box>
              <Button variant="contained" onClick={handleSave} sx={{ mr: 2 }}>
                Guardar
              </Button>
              <Button variant="outlined" onClick={handleCancel}>
                Cancelar
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default Profile;
