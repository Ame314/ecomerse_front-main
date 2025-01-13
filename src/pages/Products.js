import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/api";

import {
  Container,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (cat, s) => {
    try {
      const data = await getProducts(cat, s);
      setProducts(data);
    } catch (error) {
      alert("Error al obtener productos");
      console.error(error);
    }
  };

  const handleFilter = () => {
    fetchProducts(category, search);
  };

  const addToCart = (product) => {
    const existing = cart.find((p) => p.id === product.id);
    if (existing) {
      setCart(
        cart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleCheckout = () => {
    console.log("Carrito antes de guardar en localStorage:", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/checkout");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Lista de Productos
      </Typography>

      {/* Filtro por categoría y búsqueda */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          variant="outlined"
        />
        <TextField
          label="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={handleFilter}>
          Filtrar
        </Button>
      </Box>

      {/* Listado de productos */}
      <Grid container spacing={2}>
        {products.map((prod) => (
          <Grid item xs={12} sm={6} md={4} key={prod.id}>
            <Card>
              {prod.image && (
                <CardMedia
                  component="img"
                  height="140"
                  image={prod.image}
                  alt={prod.name}
                />
              )}
              <CardContent>
                <Typography variant="h6">{prod.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Categoría: {prod.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Precio: {prod.price}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => addToCart(prod)}
                  >
                    Agregar al carrito
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Sección Carrito */}
      <Typography variant="h6" gutterBottom>
        Carrito
      </Typography>
      {cart.map((item) => (
        <Box key={item.id} sx={{ mb: 1 }}>
          <Typography variant="body1">
            {item.name} x {item.quantity}
          </Typography>
        </Box>
      ))}

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleCheckout}
        disabled={cart.length === 0}
      >
        Finalizar Compra
      </Button>
    </Container>
  );
}

export default Products;
