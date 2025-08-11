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
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
