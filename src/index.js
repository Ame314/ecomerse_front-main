// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 1. Importar librerías de MUI para tema
import { createTheme, ThemeProvider } from '@mui/material/styles';

// 2. Definir tu tema con 5 colores
const theme = createTheme({
  palette: {
    primary: {
      main: '#673ab7',  // tu color principal
    },
    secondary: {
      main: '#ff4081',  // tu color secundario
    },
    success: {
      main: '#4caf50',  // éxito
    },
    warning: {
      main: '#ff9800',  // advertencia
    },
    error: {
      main: '#f44336',  // error
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 3. Envolver toda la app en ThemeProvider */}
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
