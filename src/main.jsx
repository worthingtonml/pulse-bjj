import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Tiny global styles (keyframes + responsive bubble)
const style = document.createElement('style');
style.textContent = `
  @keyframes bounce {
    0%, 80%, 100% { transform: scale(1); opacity: 0.5; }
    40% { transform: scale(1.3); opacity: 1; }
  }
  .bubble { max-width: 85%; }
  @media (min-width: 768px) { .bubble { max-width: 70%; } }
  * { box-sizing: border-box; }
  html, body, #root { height: 100%; }
  body { margin: 0; padding: 0; }
`;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);// Update Mon Aug 11 23:08:39 CDT 2025
