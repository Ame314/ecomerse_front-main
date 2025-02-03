import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  CssBaseline,
  IconButton,
  Badge,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"; // Para cerrar
import ChevronRightIcon from "@mui/icons-material/ChevronRight"; // Para abrir
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Perfil
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // Carrito

const drawerWidth = 240; // Ancho del menú lateral


const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState("user"); // Rol por defecto
  const [open, setOpen] = useState(true); // Estado para mostrar u ocultar el menú lateral
  const [userName, setUserName] = useState(""); // Nombre del usuario
  const [cartItems, setCartItems] = useState(0); // Cantidad de artículos en el carrito

  // Obtener el rol y nombre del usuario desde localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedUserName = localStorage.getItem("userName"); // Asumiendo que el nombre del usuario está guardado
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || 0; // Cantidad de artículos en el carrito

    setRole(storedRole || "user");
    setUserName(storedUserName);
    setCartItems(storedCartItems);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("cartItems");
    navigate("/login");
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleProfile = () => {
    navigate("/profile"); // Asumir que tienes una página de perfil
  };

  const handleCart = () => {
    navigate("/cart"); // Ir al carrito
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />

      {/* Barra principal */}
      <AppBar position="fixed" sx={{ backgroundColor: role === "admin" ? "#19274e" : "#536d88" }}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Monasterio de Santa María de la Esperanza
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Nombre del usuario */}
            <Typography variant="body1" sx={{ color: "#fff", marginRight: 2 }}>
              {userName}
            </Typography>

            {/* Ícono de Perfil */}
            <Tooltip title="Ver perfil">
              <IconButton onClick={handleProfile} sx={{ color: "#fff" }}>
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>

            {/* Ícono de Carrito */}
            <Tooltip title="Ver carrito">
              <IconButton onClick={handleCart} sx={{ color: "#fff" }}>
                <Badge badgeContent={cartItems} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Ícono de Cerrar Sesión */}
            <Tooltip title="Cerrar Sesión">
              <IconButton onClick={handleLogout} sx={{ color: "#fff" }}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Contenedor del contenido principal */}
      <Box sx={{ display: "flex", flexGrow: 1, mt: 8 }}> {/* mt: 8 deja espacio debajo de la barra */}
        {/* Menú lateral */}
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            width: open ? drawerWidth : 60, // Cambiar ancho cuando se abre/cierra
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: open ? drawerWidth : 60,
              boxSizing: "border-box",
              top: 64,
              backgroundColor: role === "admin" ? "#19274e" : "#536d88", // Cambiar el fondo según el rol
              color: "#fff", // Letras blancas
              transition: "width 0.3s ease", // Transición suave para abrir/cerrar
              overflowX: "hidden", // Esconder contenido cuando el menú está cerrado
            },
          }}
          PaperProps={{
            elevation: 1,
          }}
        >
          <List>
            <ListItem button onClick={() => navigate("/home")}>
              <ListItemText
                primary="Inicio"
                sx={{ display: open ? "block" : "none" }} // Ocultar texto cuando el menú está cerrado
              />
            </ListItem>
            <ListItem button onClick={() => navigate("/products")}>
              <ListItemText
                primary="Productos"
                sx={{ display: open ? "block" : "none" }}
              />
            </ListItem>
            <ListItem button onClick={() => navigate("/orders/history")}>
              <ListItemText
                primary="Order History"
                sx={{ display: open ? "block" : "none" }}
              />
            </ListItem>
            <ListItem button onClick={() => navigate("/cart")}>
              <ListItemText
                primary="Carrito"
                sx={{ display: open ? "block" : "none" }}
              />
            </ListItem>

            {role === "admin" && (
              <>
                <ListItem button onClick={() => navigate("/admin/orders")}>
                  <ListItemText
                    primary="Órdenes (Admin)"
                    sx={{ display: open ? "block" : "none" }}
                  />
                </ListItem>
                <ListItem button onClick={() => navigate("/admin/orders/processing")}>
                  <ListItemText
                    primary="Órdenes (Processing)"
                    sx={{ display: open ? "block" : "none" }}
                  />
                </ListItem>
                <ListItem button onClick={() => navigate("/admin/product/create")}>
                  <ListItemText
                    primary="Crear Producto"
                    sx={{ display: open ? "block" : "none" }}
                  />
                </ListItem>
              </>
            )}
          </List>

          {/* Íconos para cerrar o abrir el menú en pantallas pequeñas */}
          <Box sx={{ position: "absolute", top: 20, right: 10 }}>
            <IconButton onClick={toggleDrawer} sx={{ color: "#fff" }}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Box>
        </Drawer>

        {/* Contenido principal */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
