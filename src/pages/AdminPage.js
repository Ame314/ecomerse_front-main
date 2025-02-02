import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct, getProducts } from "../services/api";
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

function AdminPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole !== "admin") {
      alert("Acceso denegado. No eres administrador.");
      navigate("/login");
    } else {
      fetchProducts();
    }
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      alert("Error al obtener productos - conecta bien lo de la base de datos");
      console.error(error);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name,
        description,
        price,
        stock,
        category,
        image,
      };
      await createProduct(productData);
      alert("Producto creado con éxito");
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategory("");
      setImage("");
      fetchProducts();
    } catch (error) {
      alert("Error al crear producto");
      console.error(error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, backgroundColor: "#f7f7f7", borderRadius: "8px", padding: "20px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
      <Typography variant="h4" sx={{ mb: 3, color: "#19274e", fontWeight: 700 }}>
        Panel de Administración
      </Typography>

      {/* Formulario para crear producto */}
      <Paper sx={{ p: 3, mb: 4, backgroundColor: "#f7f7f7", borderRadius: "8px" }} elevation={3}>
        <Typography variant="h6" gutterBottom sx={{ color: "#19274e" }}>
          Agregar Producto
        </Typography>
        <Box
          component="form"
          onSubmit={handleCreateProduct}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{ borderColor: "#536d88" }}
          />
          <TextField
            label="Descripción"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ borderColor: "#536d88" }}
          />
          <TextField
            label="Precio"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            sx={{ borderColor: "#536d88" }}
          />
          <TextField
            label="Stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            sx={{ borderColor: "#536d88" }}
          />
          <TextField
            label="Categoría"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            sx={{ borderColor: "#536d88" }}
          />
          <TextField
            label="URL de Imagen (opcional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            sx={{ borderColor: "#536d88" }}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: "#19274e", color: "#ffffff", "&:hover": { backgroundColor: "#0f132e" } }}
            type="submit"
          >
            Crear Producto
          </Button>
        </Box>
      </Paper>

      {/* Lista de productos */}
      <Typography variant="h6" gutterBottom sx={{ color: "#19274e" }}>
        Productos Existentes
      </Typography>
      <Grid container spacing={2}>
        {products.length > 0 ? (
          products.map((prod) => (
            <Grid item xs={12} sm={6} md={4} key={prod.id}>
              <Card sx={{ borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", backgroundColor: "#f7f7f7" }}>
                {prod.image && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={prod.image}
                    alt={prod.name}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" sx={{ color: "#19274e" }}>{prod.name}</Typography>
                  <Typography variant="body2" sx={{ color: "#536d88" }}>Categoría: {prod.category}</Typography>
                  <Typography variant="body2" sx={{ color: "#536d88" }}>Precio: {prod.price}</Typography>
                  <Typography variant="body2" sx={{ color: "#536d88" }}>Stock: {prod.stock}</Typography>
                  <Typography variant="body2" sx={{ color: "#536d88" }}>{prod.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography sx={{ m: 2, color: "#b49b85" }}>No hay productos aún.</Typography>
        )}
      </Grid>
    </Container>
  );
}

export default AdminPage;
