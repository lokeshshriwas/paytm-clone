import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import Sendmoney from './pages/Sendmoney';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/sendMoney" element={<Sendmoney/>} />
      </Routes>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
