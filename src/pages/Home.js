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
          Artesanía con tradición, fe y amor.
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
          La Orden Cisterciense de la Estrecha Observancia, también conocida como “Trapenses”, forma parte de la familia Benedictina y tiene su origen en el año 1098. Somos una comunidad dedicada a la contemplación y la búsqueda de la unión con Dios, siguiendo la Regla de San Benito. Nuestra vida está centrada en la oración, el trabajo y la meditación, buscando siempre la paz interior y la devoción a Dios. A pesar de llevar una vida retirada en nuestros monasterios, donde el silencio y la serenidad nos permiten enfocarnos en la oración, nuestras acciones también impactan al mundo, siendo testigos de la fe y ofreciendo un refugio espiritual para aquellos que nos visitan.

Nuestra vida monástica tiene como objetivo principal el amor de Cristo. Es una respuesta a su llamado para apartarnos de las distracciones del mundo y dedicarnos a Él con todo nuestro ser. A través de la oración continua y el trabajo en comunidad, cultivamos la paz y nos preparamos para la vida eterna con Dios.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#536d88",
            marginTop: "10px",
          }}
        >
          Todo comenzó hace décadas, cuando un pequeño grupo de monjas decidió
          compartir su talento y creatividad con la comunidad. Inspiradas por
          la belleza de la naturaleza que las rodea, las hermanas encontraron en
          la artesanía una forma de expresar su fe y gratitud. Desde entonces,
          "El Tesoro de las Monjitas" ha crecido para convertirse en un símbolo
          de tradición, espiritualidad y calidad.
        </Typography>
      </Box>

      {/* Sección de imágenes con texto */}
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
              src="https://ocso.org/wp-content/uploads/2016/06/esmeraldas_11.jpg"
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
            En el corazón de Esmeraldas, "El Tesoro de las Monjitas" es mucho más que un simple taller artesanal. Es un espacio donde la paz y la dedicación a Dios se reflejan en cada pieza creada. Nuestras hermanas transforman materiales sencillos en objetos cargados de significado, cada uno de ellos nacido de la contemplación y la devoción. Estas creaciones no solo decoran, sino que tocan el alma, invitando a quien las vea a conectar con la serenidad y la belleza del mundo espiritual.

Inspiradas por la naturaleza y la vida monástica, nuestras piezas reflejan la paz, la fe y la gratitud que nos acompañan en nuestra vida diaria. Cada objeto que creamos busca transformar lo cotidiano en algo extraordinario, invitando a todos a encontrar tranquilidad y equilibrio en medio del ajetreo de la vida moderna.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Imagen destacada grande */}
      <Box
        sx={{
          width: "80%",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <img
          src="https://ocso.org/wp-content/uploads/2016/06/esmeraldas_02-600x450_c.jpg"
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
          Teléfono: 593 (6) 370 0561
        </Typography>
        <Typography variant="body1" sx={{ color: "#536d88", marginBottom: "20px" }}>
          Correo electrónico: ma.delaesperanza@gmail.com
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
