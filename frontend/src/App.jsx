import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
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
import Unboxing from './pages/Unboxing'
import Scan from './pages/Scan'



const App = () => {
  return (
    <div >

      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Navigate to={'/login'} />} />
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Navigate to={'/login'} />} />
        <Route path='/home' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/WYSIWYG_Only' element={<WYSIWYG />} />
        <Route path='/Stocklist_Only' element={<General />} />
        <Route path='/Fish_Only' element={<Fish />} />
        <Route path='/Invert_Only' element={<Invert />} />
        <Route path='/cites' element={<Cites />} />
        <Route path='/MyProfile' element={<Profile />} />
        <Route path='/Unboxing' element={<Unboxing />} />
        <Route path='/Scan' element={<Scan />} />
      </Routes>
      <Footer />
    </div>


  )
}

export default App