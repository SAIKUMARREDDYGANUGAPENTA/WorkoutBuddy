import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './context/WorkoutContext';
import { AuthcontextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthcontextProvider>
  <WorkoutsContextProvider>
    <App />
    </WorkoutsContextProvider>
    </AuthcontextProvider>
  </React.StrictMode>
);


