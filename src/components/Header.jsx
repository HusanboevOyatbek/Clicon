import React from 'react'
import { FaRegHeart } from 'react-icons/fa';
import { FiShoppingCart } from "react-icons/fi";
import { IoPersonOutline, IoSearch } from 'react-icons/io5';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom'

function Header() {
    return (
        <>
            <header className='bg-[#1B6392]'>
                <div className=" container mx-auto  py-[15px] px-[20px] flex items-center text-center  " >
                    <Link to={"/"} className="flex items-center gap-2 md:gap-3">
                        <img className=" " src="/imgs/Logo.png" alt="Kuda Pizza Logo" />

                    </Link>



                    <form className="max-w-[750px] w-full mx-auto ">

                        <div className="relative">
                            <input
                                type="search"
                                id="search"
                                placeholder="Search"
                                className="w-full h-[44px] px-3 pe-10 text-sm bg-white
                                 rounded-[2px]
                                 outline-none 
                                 "/>

                            <div className="absolute inset-y-0 end-0 flex items-center pe-3">
                                <IoSearch />

                            </div>
                        </div>
                    </form>


                    <ul className='flex justify-center text-center  gap-[20px]'>
                        <li>
                            <NavLink>
                                <FiShoppingCart className='text-white max-w-[25px] w-full h-[25px]' />
                            </NavLink>
                        </li>

                        <li>
                            <NavLink>
                                <FaRegHeart className='text-white max-w-[25px] w-full h-[25px]' />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink>
                                <IoPersonOutline className='text-white max-w-[25px] w-full h-[25px]' />
                            </NavLink>
                        </li>
                    </ul>




                </div>
            </header>
        </>
    )
}

export default Header