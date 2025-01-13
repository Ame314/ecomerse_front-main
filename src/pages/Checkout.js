// src/pages/Checkout.js
import React, { useState } from "react";
import { createOrder } from "../services/api";
import { useNavigate } from "react-router-dom";

// Material UI
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";

function Checkout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateOrder = async () => {
    setLoading(true);
    setError(null);

    try {
      const cartData = localStorage.getItem("cart");
      if (!cartData) {
        setError("No hay carrito en localStorage.");
        setLoading(false);
        return;
      }

      const cart = JSON.parse(cartData);
      if (cart.length === 0) {
        setError("El carrito está vacío.");
        setLoading(false);
        return;
      }

      // Crea la orden en el backend
      await createOrder(
        cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity
        }))
      );

      // Limpia el carrito de localStorage
      localStorage.removeItem("cart");
      alert("Orden creada exitosamente");

      // Redirige al historial de órdenes
      navigate("/orders/history");
    } catch (error) {
      console.error("Error al crear la orden:", error);
      setError("Error al crear la orden. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>

        {loading && (
          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2
            }}
          >
            <CircularProgress />
            <Typography variant="body1">Procesando la compra...</Typography>
            {/* Ícono de perrito */}
            <PetsIcon sx={{ fontSize: 48, color: "secondary.main" }} />
          </Box>
        )}

        {error && (
          <Box sx={{ mt: 2, color: "error.main" }}>
            <Typography variant="body1">{error}</Typography>
          </Box>
        )}

        {!loading && !error && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateOrder}
            sx={{ mt: 2 }}
          >
            Procesar Orden
          </Button>
        )}
      </Paper>
    </Container>
  );
}

export default Checkout;
