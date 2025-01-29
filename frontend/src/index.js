import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the ReactDOM.createRoot API
import App from './App'; // Import the main App component
import './index.css'; // Optional: Import global styles if you have them

// Get the root element from the HTML file
const rootElement = document.getElementById('root');

// Create the root for rendering
const root = ReactDOM.createRoot(rootElement);

// Render the App component inside the root
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
