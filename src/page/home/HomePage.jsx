import React from 'react'
import useGet from '../../hook/useGet'
import { FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import { BsCartPlusFill, BsFillCartDashFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeToCart } from '../../features/cartSlise';
import { Link } from 'react-router-dom';


function HomePage() {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const { data } = useGet({ url: "products?limit=100" });
    const products = data?.products;
    const sliceProducts = products?.slice(34, 42)
    const product = products ? products[80] : "";
    console.log(sliceProducts);
    console.log(products);



    return (
        <>
            <section>
                <div className="container  mx-auto px-30">
                    <div className="flex gap-5">
                        <div className="">
                            <img src="/imgs/Xbox.png" alt="" />
                        </div>
                        <div className="">
                            <div className="">
                                <img src="/imgs/phone.png" alt="" />
                            </div>
                            <div className="mt-[20px]">
                                <img src="/imgs/ipro.png" alt="" />
                            </div>
                        </div>
                    </div>

                    <ul className='grid  grid-cols-4 my-10  '>
                        <li className='flex gap-[20px] p-[10px]  justify-center max-w-[300px] border border-gray-400 items-center '>
                            <div className="">
                                <img src="/imgs/Package.png" alt="" />
                            </div>
                            <div className="">
                                <h1 className='texet-[14px]'>
                                    Fasted Delivery
                                </h1>
                                <p className='text-[#5F6C72] '>
                                    Delivery in 24/H
                                </p>
                            </div>
                        </li>

                        <li className='flex gap-[20px] p-[10px] justify-center    max-w-[300px] border border-gray-400 items-center '>
                            <div className="">
                                <img src="/imgs/Trophy.png" alt="" />
                            </div>
                            <div className="">
                                <h1 className='texet-[14px]'>
                                    24 Hours Return
                                </h1>
                                <p className='text-[#5F6C72] '>
                                    100% money-back guarantee
                                </p>
                            </div>
                        </li>

                        <li className='flex gap-[20px] p-[10px] justify-center    max-w-[300px] border border-gray-400 items-center '>
                            <div className="">
                                <img src="/imgs/CreditCard.png" alt="" />
                            </div>
                            <div className="">
                                <h1 className='texet-[14px]'>
                                    Secure Payment
                                </h1>
                                <p className='text-[#5F6C72] '>
                                    Your money is safe
                                </p>
                            </div>
                        </li>

                        <li className='flex gap-[20px] p-[10px] justify-center    max-w-[300px] border border-gray-400 items-center '>
                            <div className="">
                                <img src="/imgs/Headphones.png" alt="" />
                            </div>
                            <div className="">
                                <h1 className='texet-[14px]'>
                                    Support 24/7
                                </h1>
                                <p className='text-[#5F6C72] '>
                                    Live contact/message
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>


            </section>

            <section className=" ">
                <div className="container mx-auto px-30 ">

                    <h1 className='text-[24px] font-bold'>
                        Best Deals
                    </h1>

                    <p>
                        Deals ends in
                    </p>

                    <div className="flex gap-4">
                        <div className="bg-white shadow-lg rounded-lg p-6 max-w-[400px] w-full h-[620px] hover:shadow-xl transition-shadow">
                            <div className="bg-gray-100 rounded-lg  mb-4 h-[300px]">
                                <img className='w-full object-contain h-full' src={product?.thumbnail} alt="" />
                            </div>
                            <h1 className='line-clamp-2 text-[24px] font-bold text-gray-900'>
                                {product?.title}
                            </h1>
                            <p className='mt-3 line-clamp-3 text-gray-600 text-sm leading-relaxed'>{product?.description}</p>
                            <p className='mt-4 text-blue-500 text-[20px] font-bold'>$ {product?.price}</p>
                            <button className="w-full mt-4 bg-[#FF7010] text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                                Add to Cart
                            </button>
                        </div>


                        <div className="grid grid-cols-4 gap-5 flex-1">
                            {sliceProducts?.map((el) => (
                                <div key={el.id} className="group bg-white rounded-lg shadow-md h-[300px] overflow-hidden hover:shadow-xl transition-all"
                                >
                                    {/* IMAGE BLOCK */}
                                    <div className="relative bg-gray-100 h-[150px]">
                                        <img
                                            src={el.thumbnail}
                                            alt=""
                                            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                                        />

                                        {/* OVERLAY */}
                                        <div
                                            className="absolute inset-0 flex items-center justify-center gap-4 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300"
                                        >
                                            {/* LIKE */}
                                            <button
                                                className="w-12 h-12 rounded-full bg-white text-gray-700 flex items-center justify-center translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#FF7010] hover:text-white"
                                            >
                                                <FaHeart size={20} />
                                            </button>

                                            {/* CART */}
                                            {
                                                cart?.find((item) => item.id === el.id) ? ( <button
                                                    onClick={() => dispatch(removeToCart(el))}
                                                    className="w-12 h-12 rounded-full bg-white text-gray-700 flex items-center justify-center translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100 hover:bg-[#FF7010] hover:text-white"
                                                >
                                                    <BsFillCartDashFill size={20} />
                                                </button>) : (<button
                                                    onClick={() => dispatch(addToCart(el))}
                                                    className="w-12 h-12 rounded-full bg-white text-gray-700 flex items-center justify-center translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100 hover:bg-[#FF7010] hover:text-white"
                                                >
                                                    <BsCartPlusFill size={20} />
                                                </button>
                                           ) }

                                            {/* VIEW */}
                                            <Link
                                            to={`/products/${el.id}`}
                                                className="w-12 h-12 rounded-full bg-white text-gray-700 flex items-center justify-center translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-200 hover:bg-[#FF7010] hover:text-white"
                                            >
                                                <FaEye size={20} />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* CONTENT */}
                                    <div className="p-[8px] h-[100px] ">
                                        <h1 className="line-clamp-2 text-[16px] font-semibold text-gray-900">
                                            {el.title}
                                        </h1>
                                        <p className='line-clamp-2 text-[10]'>
                                            {el.description}
                                        </p>
                                        <p className="text-blue-500 font-bold text-[15px]">
                                            $ {el.price}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default HomePage;