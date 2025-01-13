// src/pages/OrderHistory.js
import React, { useState, useEffect } from "react";
import { getMyOrders } from "../services/api";

// Material UI
import {
  AppBar,
  Toolbar,
  Typography,

  Container,
  Grid,
  Card,
  CardContent,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getMyOrders();
      setOrders(data);
    } catch (error) {
      alert("Error al obtener tus órdenes");
      console.error(error);
    }
  };

  return (
    <>
      {/* Barra Superior */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Mis Órdenes
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Contenido Principal */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          {orders.map((order) => (
            <Grid item xs={12} key={order.id}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Orden ID: {order.id}
                  </Typography>
                  <Typography variant="body1">
                    Estado: {order.status}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Total: {order.total_price}
                  </Typography>
                  <Divider />

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Items:
                    </Typography>

                    {order.order_items?.length > 0 ? (
                      <List dense>
                        {order.order_items.map((item) => (
                          <ListItem key={item.id} disablePadding>
                            <ListItemText
                              primary={`Producto: ${item.product?.name}`}
                              secondary={`Cantidad: ${item.quantity}`}
                            />
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No se encontraron ítems en esta orden.
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default OrderHistory;
