import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import WYSIWYG from './pages/WYSIWYGonly'
import General from './pages/Generalonly'
import Fish from './pages/Fishonly'
import Cites from './pages/Cites'
import Invert from './pages/Invertonly'
import Profile from './pages/Profile'
import { ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL

const App = () => {


  const navigate = useNavigate(); // ✅ Tambahkan useNavigate untuk redirect
  const [token, setToken] = useState(localStorage.getItem('token') || "");

  useEffect(() => {
// 🔥 Simpan token ke localStorage setiap kali berubah

    console.log("🔥 Token diperbarui:", token);
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token'); // Jika tidak ada token, hapus dari localStorage
    }
  }, [token]);

  useEffect(() => {
    // ✅ Jika tidak ada token, redirect ke halaman login
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <div>
      <ToastContainer />

      {/* 🔹 Jika belum login, hanya tampilkan halaman login */}
      {!token ? (
        <Routes>
          <Route path='/login' element={<Login setToken={setToken} />} />
          <Route path='*' element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <>
          <Navbar setToken={setToken} />
          <SearchBar />
          <Routes>
              <Route path='/home' element={<Home token={token} />} />
              <Route path='/collection' element={<Collection />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/product/:commonName/:coralLocation?' element={<Product />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/place-order' element={<PlaceOrder />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/WYSIWYG_Only' element={<WYSIWYG />} />
              <Route path='/Stocklist_Only' element={<General />} />
              <Route path='/Fish_Only' element={<Fish />} />
              <Route path='/Invert_Only' element={<Invert />} />
              <Route path='/cites' element={<Cites />} />
              <Route path='/MyProfile' element={<Profile />} />
              <Route path='*' element={<Navigate to="/home" />} /> {/* Redirect jika path tidak ditemukan */}
            </Routes>
            <Footer />
        </>
      )}
    </div>
  );
}

export default App