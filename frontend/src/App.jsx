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
import WYSIWYG from './pages/WYSIWYGCollectionOnly'
import General from './pages/GeneralCollectionOnly'
// import Fish from './pages/Fishonly'
// import Cites from './pages/Cites'
// import Logout from './pages/Logout'



const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ">

      <Navbar />
      <SearchBar />
      <Routes>
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
        <Route path='/wysiwygonly' element={<WYSIWYG />} />
        <Route path='/Stocklist_Only' element={<General />} />
        {/* <Route path='/Fish&Invert' element={<Fish />} /> */}
        {/* <Route path='/cites' element={<Cites />} /> */}
        {/* <Route path='/logout' element={<Logout />} /> */}
      </Routes>
      <Footer />
    </div>


  )
}

export default App