import React from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Footer from './components/Footer'

import {ProductsPage,
       SingleProduct,
        Cart,
        Login,
        Register,
        VerifyEmail,
        ResetPassword,
        Reset,
        OrdersPage,
        OrdersAndPayments,
        SingleOrder,
        MpesaPayments,
        Admin,
        PrivateRoute,
        PrivateAdminRoute,
        AuthWrapper,
      } from './pages'







function App() {


  return (
  <AuthWrapper>
    <Router>

    <Navbar />
    <Sidebar />
    <Switch>
      <Route exact path='/' component={Home} />
     <Route exact path ='/login' component={Login} />
     <Route exact path ='/register' component={Register} />
     <Route exact path ='/user/verify-token' component={VerifyEmail} />



     <Route exact path ='/user/reset-password' component={Reset} />
     <Route exact path ='/resetpassword' component={ResetPassword} />
      <Route exact path='/products' component={ProductsPage} />
      <Route exact path='/products/:id' component={SingleProduct} />
      <Route exact path='/cart' component={Cart} />



    <PrivateRoute exact path='/ordersandPayments'>
           <OrdersAndPayments />
    </PrivateRoute>


      <PrivateRoute exact path='/orders'>
           <OrdersPage />
    </PrivateRoute>

      <PrivateRoute exact path='/paywithmpesa'>
           <MpesaPayments />
    </PrivateRoute>

      <PrivateRoute exact path='/orders/:id'>
           <SingleOrder />
    </PrivateRoute>

    <PrivateAdminRoute  path='/admin'>
        <Admin/>
    </PrivateAdminRoute>
    
      <Route exact path='*'><NotFound/></Route>
    </Switch>
    <Footer />
</Router>
    </AuthWrapper>

  )
}



export default App;
