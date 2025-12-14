import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';


console.log('DEBUG main.jsx — App:', App);

const rootEl = document.getElementById('root');

if (!rootEl) {
  console.error('No #root element found in index.html');
} else {
  createRoot(rootEl).render(<App />);
}

createRoot(document.getElementById('root')).render(<App.jsx />);