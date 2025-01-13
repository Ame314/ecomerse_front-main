import React, { useState, useEffect } from "react";
import { getAllOrders, updateOrderStatus } from "../services/api";
import { Button, Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";

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
      console.log(`Actualizando estado de la orden ${orderId} a Despachado`); // Debug
      const response = await updateOrderStatus(orderId, "picked");
      console.log("Respuesta del servidor (Despachado):", response); // Debug
      alert(`Orden ${orderId} actualizada a Despachado`);
      fetchOrders(); // Refresca las órdenes después de actualizar
    } catch (error) {
      alert("Error al actualizar el estado de la orden");
      console.error("Error al actualizar el estado (Despachado):", error);
    }
  };
  
  const handleUpdateOrderStatusEntregado = async (orderId) => {
    try {
      console.log(`Actualizando estado de la orden ${orderId} a Entregado`); // Debug
      const response = await updateOrderStatus(orderId, "delivered");
      console.log("Respuesta del servidor (Entregado):", response); // Debug
      alert(`Orden ${orderId} actualizada a Entregado`);
      fetchOrders(); // Refresca las órdenes después de actualizar
    } catch (error) {
      alert("Error al actualizar el estado de la orden");
      console.error("Error al actualizar el estado (Entregado):", error);
    }
  };
  

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Filtrar órdenes según el filtro seleccionado
  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true; // Mostrar todas las órdenes
    if (filter === "pending") return order.status === "pending"; // Solo pendientes
    if (filter === "pedido despachado") return order.status === "picked"; // Solo despachados
    return true;
  });

  return (
    <div style={{ margin: "20px" }}>
      <h2>Todas las Órdenes</h2>

      {/* Filtro de órdenes */}
      <FormControl sx={{ mb: 3, minWidth: 200 }}>
        <InputLabel id="filter-label">Filtrar Órdenes</InputLabel>
        <Select
          labelId="filter-label"
          value={filter}
          onChange={handleFilterChange}
          label="Filtrar Órdenes"
        >
          <MenuItem value="all">Todas las Órdenes</MenuItem>
          <MenuItem value="pending">Órdenes Pendientes</MenuItem>
          <MenuItem value="picked">Órdenes Despachado</MenuItem>
        </Select>
      </FormControl>

      {filteredOrders.map((order) => (
        <div key={order.id} style={{ border: "1px solid #ccc", margin: "5px", padding: "10px" }}>
          <p>Orden ID: {order.id}</p>
          <p>Status: {order.status}</p>
          <p>Total: {order.total_price}</p>
          <div>
            <strong>Items:</strong>
            {order.order_items?.map((item) => (
              <div key={item.id}>
                Producto: {item.product?.name} - Cantidad: {item.quantity}
              </div>
            ))}
          </div>

          {/* Botones para cambiar el estado de la orden */}
          {order.status === "pending" && (
            <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleUpdateOrderStatusDespachado(order.id)}
              >
                Marcar como Despachado
              </Button>
            </Box>
          )}

          {/* Botones para cambiar el estado de la orden */}
          {order.status === "picked" && (
            <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleUpdateOrderStatusEntregado(order.id)}
              >
                Marcar como Entregado
              </Button>
            </Box>
          )}
        </div>
      ))}
    </div>
  );
}

export default OrderProcessing;
