import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './GlobalStyles.css';

import { HelmetProvider } from 'react-helmet-async'; // ✅ Importa o provider
import mixpanel from "mixpanel-browser";

// Create an instance of the Mixpanel object, your token is already added to this snippet
mixpanel.init('d34ec5ff7da40a3d35c3656cc422b8f9', {
  autocapture: true,
  record_sessions_percent: 100,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider> {/* ✅ Envolve a App */}
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
