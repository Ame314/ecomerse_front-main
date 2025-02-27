import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Products from "./pages/Products";
import OrderHistory from "./pages/OrderHistory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import OrderAll from "./pages/OrderAll";
import Checkout from "./pages/Checkout";
import AdminPage from "./pages/AdminPage";
import OrderProcessing from "./pages/OrderProcessing";
import RequestPasswordReset from "./pages/RequestPasswordReset";
import SetNewPassword from "./pages/SetNewPassword";
import Cart from "./pages/Cart"; 
import Profile from "./pages/Profile"; // Asegúrate de importar el componente Profile


function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas sin Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<RequestPasswordReset />} />
        <Route path="/reset-password/reset" element={<SetNewPassword />} />
        <Route path="/register" element={<Register />} />
        
        {/* Rutas con Layout */}
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/products"
          element={
            <Layout>
              <Products />
            </Layout>
          }
        />
        <Route
          path="/orders/history"
          element={
            <Layout>
              <OrderHistory />
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <Layout>
              <Products />
            </Layout>
          }
        />
        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/checkout"
          element={
            <Layout>
              <Checkout />
            </Layout>
          }
        />
        <Route
          path="/admin/product/create"
          element={
            <Layout>
              <AdminPage />
            </Layout>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <Layout>
              <OrderAll />
            </Layout>
          }
        />
        <Route
          path="/admin/orders/processing"
          element={
            <Layout>
              <OrderProcessing />
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
