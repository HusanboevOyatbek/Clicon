import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import { FaRegHeart } from 'react-icons/fa';
import { FiShoppingCart } from "react-icons/fi";
import { IoPersonOutline, IoSearch } from 'react-icons/io5';
import { LuTextSearch } from 'react-icons/lu';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'

function Header() {

    const cart = useSelector((state) => state.cart)
    const [search, setSearch] = useState("")
    const getSearch = async () => await axios.get(`https://dummyjson.com/products/search?q=${search}`)

    const { data, isLoading } = useQuery({
        queryKey: ["products", search],
        queryFn: getSearch,
        staleTime: 60 * 1000,

    })

    const searchProducts = data?.data?.products


    return (
        <>
            <header className='bg-[#1B6392] fixed top-0 left-0 w-full z-50 shadow-md'>
                <div className=" container mx-auto  py-[15px] px-[20px] flex items-center text-center  " >
                    <Link to={"/"} className="flex items-center gap-2 md:gap-3">
                        <img className=" " src="/imgs/Logo.png" alt="Kuda Pizza Logo" />

                    </Link>



                    <form className="max-w-[750px] w-full mx-auto ">

                        <div className="relative">
                            <input
                                onChange={(e) => setSearch(e.target.value)}
                                type="search"
                                value={search}
                                id="search"
                                placeholder="Search"
                                className="w-full h-[44px] px-3 pe-10 text-sm bg-white
                                 rounded-[2px]
                                 outline-none 
                                 "/>
                            {
                                search === "" ? (
                                    ""
                                ) :

                                    <div
                                        className="fixed top-[70px] left-1/2 -translate-x-1/2 
             w-[400px] max-h-[250px] 
             bg-white rounded-xl 
             px-[10px]
             overflow-y-auto z-50 border shadow-lg"
                                    >
                                        {searchProducts?.length > 0 ? (
                                            searchProducts.map((el) => (
                                                <Link
                                                onClick={() => setSearch("") }
                                                to={`/products/${el.id}`}
                                                    key={el.id}
                                                    className="flex items-center gap-4 p-3 
                   hover:bg-gray-100 cursor-pointer transition"
                                                >
                                                    <img
                                                        src={el.thumbnail}
                                                        alt=""
                                                        className="w-14 h-14 object-cover rounded-lg border"
                                                    />
                                                    <p className="text-gray-800 font-medium text-sm line-clamp-2">
                                                        {el.title}
                                                    </p>
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-10 text-center">
                                                <p className="text-gray-400 text-sm flex items-center gap-[5px]">
                                                    <LuTextSearch/>
                                                    Mahsulot topilmadi
                                                </p>
                                                <p className="text-gray-300 text-xs mt-1">
                                                    Boshqa nom bilan qidirib ko‘ring
                                                </p>
                                            </div>
                                        )}
                                    </div>




                            }

                            <div className="absolute inset-y-0 end-0 flex items-center pe-3">
                                <IoSearch />

                            </div>
                        </div>
                    </form>


                    <ul className='flex justify-center text-center  gap-[20px]'>
                        <li className="relative">
                            <NavLink
                                to={"cart"}
                                className="relative flex items-center">
                                <FiShoppingCart className="text-white w-[25px] h-[25px]" />

                                {/* Badge */}
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white
                     text-xs w-5 h-5 flex items-center justify-center
                     rounded-full font-bold">
                                    {
                                        cart?.length
                                    }
                                </span>
                            </NavLink>
                        </li>


                        <li>
                            <NavLink
                                to={"like"}
                            >
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