import React, { useState, useEffect } from "react";
import { getAllOrders, updateOrderStatus } from "../services/api";
import { Button, Select, MenuItem, FormControl, InputLabel, Box, Typography, Card, CardContent, Grid, Container } from "@mui/material";

function OrderProcessing() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all"); // Filtro inicial: "all" (todas las órdenes)

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      alert("Error al obtener las órdenes");
      console.error(error);
    }
  };

  const handleUpdateOrderStatusDespachado = async (orderId) => {
    try {
      await updateOrderStatus(orderId, "picked");
      alert(`Orden ${orderId} actualizada a Despachado`);
      fetchOrders(); // Refresca las órdenes después de actualizar
    } catch (error) {
      alert("Error al actualizar el estado de la orden");
      console.error(error);
    }
  };

  const handleUpdateOrderStatusEntregado = async (orderId) => {
    try {
      await updateOrderStatus(orderId, "delivered");
      alert(`Orden ${orderId} actualizada a Entregado`);
      fetchOrders(); // Refresca las órdenes después de actualizar
    } catch (error) {
      alert("Error al actualizar el estado de la orden");
      console.error(error);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Filtrar órdenes según el filtro seleccionado
  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true; // Mostrar todas las órdenes
    if (filter === "pending") return order.status === "pending"; // Solo pendientes
    if (filter === "picked") return order.status === "picked"; // Solo despachados
    return true;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, backgroundColor: "#f7f7f7", padding: 4, borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#19274e", fontWeight: 700, textAlign: "center", mb: 4 }}
      >
        Gestión de Órdenes
      </Typography>

      {/* Filtro de órdenes */}
      <FormControl sx={{ mb: 3, minWidth: 200 }}>
        <InputLabel id="filter-label" sx={{ color: "#536d88" }}>Filtrar Órdenes</InputLabel>
        <Select
          labelId="filter-label"
          value={filter}
          onChange={handleFilterChange}
          label="Filtrar Órdenes"
          sx={{ color: "#19274e" }}
        >
          <MenuItem value="all">Todas las Órdenes</MenuItem>
          <MenuItem value="pending">Órdenes Pendientes</MenuItem>
          <MenuItem value="picked">Órdenes Despachadas</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={3}>
        {filteredOrders.map((order) => (
          <Grid item xs={12} md={6} key={order.id}>
            <Card sx={{ backgroundColor: "#f7f7f7", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "#19274e", fontWeight: 700 }}
                >
                  Orden ID: {order.id}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#536d88", mb: 1 }}
                >
                  Estado: {order.status}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#536d88", mb: 2 }}
                >
                  Total: ${order.total_price}
                </Typography>

                <Typography variant="subtitle1" sx={{ color: "#19274e", fontWeight: 600 }}>
                  Items:
                </Typography>
                <Box sx={{ pl: 2 }}>
                  {order.order_items?.map((item) => (
                    <Typography key={item.id} variant="body2" sx={{ color: "#536d88" }}>
                      Producto: {item.product?.name || "Desconocido"} - Cantidad: {item.quantity || 0}
                    </Typography>
                  ))}
                </Box>

                <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                  {order.status === "pending" && (
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#19274e", color: "#ffffff", "&:hover": { backgroundColor: "#0f132e" } }}
                      onClick={() => handleUpdateOrderStatusDespachado(order.id)}
                    >
                      Marcar como Despachado
                    </Button>
                  )}

                  {order.status === "picked" && (
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#536d88", color: "#ffffff", "&:hover": { backgroundColor: "#b49b85" } }}
                      onClick={() => handleUpdateOrderStatusEntregado(order.id)}
                    >
                      Marcar como Entregado
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default OrderProcessing;
