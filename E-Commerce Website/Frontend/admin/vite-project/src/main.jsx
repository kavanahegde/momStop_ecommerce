import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom correctly
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
