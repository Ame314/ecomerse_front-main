import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, Button, Divider, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  
  // Cargar el carrito desde localStorage al inicio
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart)); // Actualizar estado con los datos de localStorage
    }
  }, []);

  // Función para actualizar el carrito y guardar en localStorage
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart)); // Sincronizar con localStorage
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    updateCart(newCart);
  };

  const increaseQuantity = (index) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    updateCart(newCart);
  };

  const decreaseQuantity = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
    }
    updateCart(newCart);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }
    alert("Procediendo al pago...");
    navigate("/checkout");
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const roundPrice = (price) => {
    return Math.round(price * 100) / 100; // Redondea a 2 decimales
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        backgroundColor: "#f7f7f7",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: "#19274e",
          fontWeight: 700,
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Carrito de Compras
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: "center", color: "#536d88" }}>
          El carrito está vacío.
        </Typography>
      ) : (
        <Box>
          {cart.map((item, index) => (
            <Box key={index} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src={item.image} // Mostrar la imagen del producto
                  alt={item.name}
                  style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "10px" }}
                />
                <Typography variant="body1" sx={{ color: "#536d88" }}>
                  {item.name} x {item.quantity}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button onClick={() => decreaseQuantity(index)}>-</Button>
                <TextField
                  value={item.quantity}
                  onChange={(e) => {
                    const newCart = [...cart];
                    const newQuantity = parseInt(e.target.value);
                    if (!isNaN(newQuantity) && newQuantity > 0) {
                      newCart[index].quantity = newQuantity;
                      updateCart(newCart);
                    }
                  }}
                  sx={{ width: "50px", textAlign: "center" }}
                />
                <Button onClick={() => increaseQuantity(index)}>+</Button>

                <Typography variant="body2" sx={{ marginLeft: "10px", color: "#19274e" }}>
                  Precio: ${roundPrice(item.price)} c/u
                </Typography>

                <IconButton onClick={() => removeFromCart(index)} size="small" sx={{ color: "#d32f2f", marginLeft: "10px" }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6" sx={{ color: "#19274e" }}>
              Total: ${roundPrice(calculateTotal())}
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#19274e",
                color: "#ffffff",
                "&:hover": { backgroundColor: "#0f132e" },
              }}
              onClick={handleCheckout}
            >
              Finalizar Compra
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Cart;
