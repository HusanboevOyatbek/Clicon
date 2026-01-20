import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import CartPage from './page/cart/CartPage'
import ProductPage from './page/products/ProductPage'
import RegisterPage from './page/register/RegisterPage'
import HomePage from './page/home/HomePage'
import SinglePage from './page/single/SinglePage'
import OrderPage from './page/order/OrderPage'
import LikePage from './page/like/LikePage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClien = new QueryClient();
function App() {
    return (
       <QueryClientProvider client={queryClien}>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path='/' element={<HomePage />} />
                        <Route path='cart' element={<CartPage />} />
                        <Route path='products' element={<ProductPage />} />
                        <Route path='register' element={<RegisterPage />} />
                        <Route path='products/:id' element={<SinglePage />} />
                        <Route path='order' element={<OrderPage />} />
                        <Route path='like' element={<LikePage />} />

                    </Route>
                </Routes>
            </BrowserRouter>
       </QueryClientProvider>
    )
}

export default App