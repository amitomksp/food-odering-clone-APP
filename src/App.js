import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './screen/Login';
import Home from './screen/Home';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup1 from './screen/Signup1';
import { CartProvider } from './component/contextReducer';

function App() {
  return (
    <CartProvider>

    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/loginuser' element={<Login />} />   
          <Route exact path='/createuser' element={<Signup1 />} />
          
        </Routes>
      </div>
    </Router>
    </CartProvider>

  );
}

export default App;
