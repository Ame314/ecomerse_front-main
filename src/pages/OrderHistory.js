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
      <AppBar
        position="static"
        sx={{ backgroundColor: "#19274e", color: "#ffffff" }}
      >
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
              <Card
                elevation={3}
                sx={{
                  borderRadius: "8px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#f7f7f7",
                }}
              >
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
                  <Divider />

                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#19274e", fontWeight: 600 }}
                    >
                      Items:
                    </Typography>

                    {order.order_items?.length > 0 ? (
                      <List dense>
                        {order.order_items.map((item) => (
                          <ListItem
                            key={item.id}
                            disablePadding
                            sx={{
                              borderBottom: "1px solid #e0e0e0",
                              mb: 1,
                              paddingBottom: 1,
                            }}
                          >
                            <ListItemText
                              primary={
                                <Typography
                                  variant="body2"
                                  sx={{ color: "#19274e" }}
                                >
                                  Producto: {item.product?.name}
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  variant="body2"
                                  sx={{ color: "#536d88" }}
                                >
                                  Cantidad: {item.quantity}
                                </Typography>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ color: "#b49b85" }}
                      >
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
