import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import CartPage from './page/cart/CartPage'
import ProductPage from './page/products/ProductPage'
import RegisterPage from './page/register/RegisterPage'
import HomePage from './page/home/HomePage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<HomePage/>} />
                    <Route path='cart' element={<CartPage />} />
                    <Route path='products' element={<ProductPage/>} />
                    <Route path='register' element={<RegisterPage/>} />
                    <Route path='products/:id' element={<HomePage/>} />
                    
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App