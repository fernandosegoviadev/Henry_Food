import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'; // Para envolver la app con el estado global
import store from './redux/store'; // Me traigo el store
import axios from 'axios';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); 

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001/';

// store: tienda de redux todos puedan acceder
root.render(
  <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
