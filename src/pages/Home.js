import React from "react";
import { Typography, Box } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Bienvenido al sistema de pedidos online
      </Typography>
      <Typography variant="h6" color="text.secondary">
        Selecciona una opción del menú para continuar.
      </Typography>
    </Box>
  );
};

export default Home;
