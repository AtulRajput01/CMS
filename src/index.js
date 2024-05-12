import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Optional: import your styles here

// Create the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root element
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
