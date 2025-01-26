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
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 200; // Ancho del menú lateral

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState("user"); // Rol por defecto

  // Obtener el rol del usuario desde localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole || "user");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />

      {/* Barra principal */}
      <AppBar position="fixed" sx={{ backgroundColor: role === "admin" ? "#19274e" : "#536d88" }}>
        <Toolbar>
          <Typography variant="hMi Aplicación6" noWrap sx={{ flexGrow: 1 }}>
          El tesoro de las monjitas -tienda
          </Typography>
          <Tooltip title="Cerrar Sesión">
            <LogoutIcon
              onClick={handleLogout}
              sx={{ cursor: "pointer", color: "#fff" }}
            />
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Contenedor del contenido principal */}
      <Box sx={{ display: "flex", flexGrow: 1, mt: 8 }}> {/* mt: 8 deja espacio debajo de la barra */}
        {/* Menú lateral */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box", top: 64 },
          }}
          PaperProps={{
            elevation: 1,
          }}
        >
          <List>
            <ListItem button onClick={() => navigate("/home")}>
              <ListItemText primary="Inicio" />
            </ListItem>
            <ListItem button onClick={() => navigate("/products")}>
              <ListItemText primary="Productos" />
            </ListItem>
            {/*por aca hay que poner lo del carrito  */}
            <ListItem button onClick={() => navigate("/orders/history")}>
              <ListItemText primary="Order History" />
            </ListItem>
            {role === "admin" && (
              <>
                <ListItem button onClick={() => navigate("/admin/orders")}>
                  <ListItemText primary="Órdenes (Admin)" />                
                </ListItem>
                <ListItem button onClick={() => navigate("/admin/orders/processing")}>
                  <ListItemText primary="Órdenes (Processing)" />                
                </ListItem>
                <ListItem button onClick={() => navigate("/admin/product/create")}>
                  <ListItemText primary="Crear Producto" />
                </ListItem>
              </>
            )}
          </List>
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
