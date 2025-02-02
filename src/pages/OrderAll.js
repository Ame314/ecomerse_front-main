// src/pages/OrderAll.js
import React, { useState, useEffect } from "react";
import { getAllOrders } from "../services/api";

// MUI
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

function OrderAll() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      alert("Error al obtener todas las órdenes");
      console.error(error);
    }
  };

  return (
    <>
      {/* Barra Superior */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Todas las Órdenes
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Contenedor Principal */}
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
                  <Typography variant="body1">
                    Usuario: {order.user.name} 
                    
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
                        No hay ítems en esta orden.
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

export default OrderAll;
