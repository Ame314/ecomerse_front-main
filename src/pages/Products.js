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
  Typography,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || [] // Cargar el carrito desde el almacenamiento
  );
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart)); // Guardar el carrito en localStorage
  }, [cart]);

  const fetchProducts = async (cat, s) => {
    try {
      const data = await getProducts(cat, s);
      
      // Filtra los productos que tienen stock mayor a 0
      const availableProducts = data.filter((product) => product.stock > 0);
      
      setProducts(availableProducts); // Establece solo los productos disponibles en el estado
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
    navigate("/checkout");
  };

  const handleOpenProduct = (index) => {
    setSelectedProduct(products[index]);
    setCurrentIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handlePrevProduct = () => {
    const prevIndex = (currentIndex - 1 + products.length) % products.length;
    setSelectedProduct(products[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  const handleNextProduct = () => {
    const nextIndex = (currentIndex + 1) % products.length;
    setSelectedProduct(products[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
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
        Nuestros Productos
      </Typography>

      {/* Filtros */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
          justifyContent: "center",
        }}
      >
        <TextField
          label="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ width: "30%" }}
        />
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          displayEmpty
          variant="outlined"
          size="small"
          sx={{ width: "30%" }}
        >
          <MenuItem value="">Todas las Categorías</MenuItem>
          <MenuItem value="Manualidades">Manualidades</MenuItem>
          <MenuItem value="Cuidado Personal">Cuidado Personal</MenuItem>
          <MenuItem value="Alimentos">Alimentos</MenuItem>
          <MenuItem value="Artesanías">Artesanías</MenuItem>
        </Select>
        <Button
          variant="contained"
          onClick={handleFilter}
          sx={{
            backgroundColor: "#19274e",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#0f132e",
            },
          }}
        >
          Buscar
        </Button>
      </Box>

      {/* Listado de productos */}
      <Grid container spacing={2}>
        {products.map((prod, index) => (
          <Grid item xs={12} sm={6} md={4} key={prod.id}>
            <Card
              sx={{
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                "&:hover": { transform: "scale(1.05)" },
                transition: "0.3s",
              }}
              onClick={() => handleOpenProduct(index)}
            >
              {prod.image && (
                <CardMedia
                  component="img"
                  height="180"
                  image={prod.image}
                  alt={prod.name}
                />
              )}
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ color: "#19274e", fontWeight: 700 }}
                >
                  {prod.name}
                </Typography>
                <Typography sx={{ color: "#536d88" }}>
                  ${prod.price}
                </Typography>
                <Typography
                  sx={{
                    color: "#536d88",
                    fontSize: "0.85rem",
                    fontStyle: "italic",
                    mt: 1,
                  }}
                >
                  Ver detalles
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal de Producto */}
      {selectedProduct && (
        <Dialog open={!!selectedProduct} onClose={handleCloseModal} fullWidth maxWidth="md">
          <DialogContent
            sx={{
              position: "relative",
              textAlign: "center",
              backgroundColor: "#f7f7f7",
            }}
          >
            <IconButton
              onClick={handleCloseModal}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                color: "#19274e",
              }}
            >
              <CloseIcon />
            </IconButton>
            <IconButton
              onClick={handlePrevProduct}
              sx={{ position: "absolute", left: 10, top: "50%" }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton
              onClick={handleNextProduct}
              sx={{ position: "absolute", right: 10, top: "50%" }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
            <Typography variant="h5" sx={{ color: "#19274e" }}>
              {selectedProduct.name}
            </Typography>
            <CardMedia
              component="img"
              height="400"
              image={selectedProduct.image}
              alt={selectedProduct.name}
              sx={{ margin: "20px auto", maxHeight: "400px", maxWidth: "100%" }}
            />
            <Typography sx={{ color: "#536d88" }}>
              Categoría: {selectedProduct.category}
            </Typography>
            <Typography sx={{ color: "#536d88", fontWeight: 700 }}>
              Precio: ${selectedProduct.price}
            </Typography>
            <Typography sx={{ mt: 2, color: "#536d88" }}>
              {selectedProduct.description || "Sin descripción disponible."}
            </Typography>
            <Button
              variant="contained"
              onClick={() => addToCart(selectedProduct)}
              sx={{
                mt: 2,
                backgroundColor: "#536d88",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#b49b85",
                },
              }}
            >
              Agregar al carrito
            </Button>
          </DialogContent>
        </Dialog>
      )}

      <Divider sx={{ my: 4 }} />

      {/* Sección Carrito */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          color: "#19274e",
          fontWeight: 700,
        }}
      >
        Carrito
      </Typography>
      {cart.map((item) => (
        <Box key={item.id} sx={{ mb: 1 }}>
          <Typography variant="body1" sx={{ color: "#536d88" }}>
            {item.name} x {item.quantity}
          </Typography>
        </Box>
      ))}

      <Button
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: "#19274e",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#0f132e",
          },
        }}
        onClick={handleCheckout}
        disabled={cart.length === 0}
      >
        Finalizar Compra
      </Button>
    </Container>
  );
}

export default Products;
