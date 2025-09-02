import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './GlobalStyles.css';

import { HelmetProvider } from 'react-helmet-async'; // ✅ Importa o provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider> {/* ✅ Envolve a App */}
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
