import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './Index.css'
import { WorkoutContextProvider } from './context/WorkoutContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutContextProvider>
        <App />
      </WorkoutContextProvider>
    </AuthContextProvider>
    
  </React.StrictMode>
);


