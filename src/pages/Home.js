import React from "react";
import { Typography, Box, Grid, Paper, Button } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f7f7f7", // Fondo claro
        minHeight: "100vh",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "40px",
      }}
    >
      {/* Título principal */}
      <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
        <Typography
          variant="h3"
          sx={{
            color: "#19274e",
            fontWeight: 700,
            marginBottom: "10px",
          }}
        >
          El Tesoro de las Monjitas
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#536d88",
            fontStyle: "italic",
          }}
        >
          Artesanía con tradición y amor.
        </Typography>
      </Box>

      {/* Descripción breve */}
      <Box
        sx={{
          width: "80%",
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: "#19274e",
          }}
        >
          Somos un emprendimiento dedicado a crear productos únicos con
          dedicación y amor. Cada pieza cuenta una historia inspirada en la
          tradición y la paz.
        </Typography>
      </Box>

      {/* Sección de imágenes */}
      <Grid
        container
        spacing={4}
        sx={{
          width: "80%",
        }}
      >
        <Grid item xs={12} md={6}>
          <Paper
            elevation={2}
            sx={{
              overflow: "hidden",
              borderRadius: "8px",
            }}
          >
            <img
              src="images/example1.jpg"
              alt="Producto 1"
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: "#ffffff",
              padding: "20px",
              borderRadius: "8px",
              height: "100%",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#19274e",
                marginBottom: "10px",
              }}
            >
              Nuestra Inspiración
            </Typography>
            <Typography variant="body1" sx={{ color: "#536d88" }}>
              Inspirados en las tradiciones y valores que nos han acompañado
              desde siempre, buscamos ofrecer productos que conecten con el
              alma y llenen de paz cada hogar.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Otra imagen en tamaño completo */}
      <Box
        sx={{
          width: "80%",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <img
          src="images/example2.jpg"
          alt="Producto destacado"
          style={{
            width: "100%",
            height: "400px",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Mapa con título */}
      <Box
        sx={{
          width: "80%",
          padding: "20px",
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#19274e",
            marginBottom: "10px",
          }}
        >
          Encuéntranos aquí
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "400px",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <iframe
            title="Ubicación del Monasterio Trapense"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7978.148355354229!2d-79.81944368164263!3d0.9601755999999989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e2adadd84f8c88f%3A0x6fbcedc735d6f32f!2sMonasterio%20Trapense%20St.%20Maria%20de%20la%20Esperanza!5e0!3m2!1ses!2sec!4v1612460480464!5m2!1ses!2sec"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </Box>
      </Box>

      {/* Sección de contacto */}
      <Box
        sx={{
          width: "80%",
          padding: "20px",
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#19274e",
            marginBottom: "10px",
          }}
        >
          Contáctanos
        </Typography>
        <Typography variant="body1" sx={{ color: "#536d88", marginBottom: "10px" }}>
          Dirección: Monasterio Trapense St. Maria de la Esperanza, Esmeraldas
        </Typography>
        <Typography variant="body1" sx={{ color: "#536d88", marginBottom: "10px" }}>
          Teléfono: (099876384)
        </Typography>
        <Typography variant="body1" sx={{ color: "#536d88", marginBottom: "20px" }}>
          Correo electrónico: (agrob@pucese.edu.ec)
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#19274e",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#0f132e",
            },
          }}
        >
          Escríbenos
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
