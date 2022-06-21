import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // Para el ruteo
import { Provider } from 'react-redux'; // Para envolver la app con el estado global
import store from './redux/store'; // Me traigo el store
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001/';

// store: tienda de redux todos puedan acceder
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
