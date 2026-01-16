import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function Layout() {
  return (
    <>
    <Header/>
      <main className='py-[90px] bg-gray-50 '>
        <Outlet/>
    </main>

    <Footer/>

    </>
  )
}

export default Layout