import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import {AppProvider} from './context/productContext'
import {FilterProvider} from './context/filterContext'
import {AuthProvider } from './context/authContext'
import {CartProvider } from './context/cartContext'
import {OrdersProvider } from './context/ordersContext'
import { AdminProvider } from './context/adminContext'

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <FilterProvider>
        <AuthProvider>
          <CartProvider>
            <OrdersProvider>
              <AdminProvider>
                <Router>
                  <App />
              </Router>
              </AdminProvider>
    </OrdersProvider>
    </CartProvider>
    </AuthProvider>
    </FilterProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


