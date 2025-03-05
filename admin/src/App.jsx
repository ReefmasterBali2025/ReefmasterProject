import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { CurrencyProvider } from './context/currencyContext.jsx'
import AddStockList from './pages/Add_Stock_List.jsx'
import AddWysiwyg from './pages/AddWysiwyg.jsx'
import ListStockList from './pages/ListStockList.jsx'
import ListWysiwyg from './pages/ListWysiwyg.jsx'
import { SearchProvider } from './context/searchContext.jsx'
import User from './pages/User.jsx'

export const backendUrl = import.meta.env.VITE_BACKEND_URL

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : "");

  console.log(`tokennya : ${token}`);

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])


  return (

    <CurrencyProvider>
      <div className='bg-gray-50 min-h-screen overflow-scroll'>
        <ToastContainer />

        {token === ""
          ? <Login setToken={setToken} />
          : <>
            <Navbar setToken={setToken} />
            <hr />
            <div className='flex w-full'>
              <Sidebar />
              <div className='w-[70%] mx-auto mk-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                <Routes>
                  <Route path='/add' element={<Add token={token} />} />
                  <Route path="/add-stock-list" element={<AddStockList token={token} />} />
                  <Route path="/add-wysiwyg" element={<AddWysiwyg token={token} />} />
                  <Route path='/list' element={<List token={token} />} />
                  <Route path='/list-stock-list' element={<ListStockList token={token} />} />
                  <Route path='/list-wysiwyg' element={<ListWysiwyg token={token} />} />
                  <Route path='/orders' element={<Orders token={token} />} />
                  <Route path='/listUser' element={<User token={token} />} />
                </Routes>
              </div>
            </div>
          </>
        }


      </div>
    </CurrencyProvider>



  )
}

export default App