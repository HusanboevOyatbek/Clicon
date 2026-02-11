// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';




// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import useGet from '../../hook/useGet';
import { addToCart, removeToCart } from '../../features/cartSlise';
import { FaEye, FaHeart } from 'react-icons/fa';
import { BsCartPlusFill, BsFillCartDashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function Portfolios() {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const { data } = useGet({ url: "products?limit=100" });
    const products = data?.products;
    const sliceProducts = products?.slice(77, 82)


    return (
        <>
            
            <Swiper
            
                spaceBetween={30}
                breakpoints={{
                    0: { slidesPerView: 2, spaceBetween: 10 },
                    640: { slidesPerView: 2, spaceBetween: 10 },
                    1024: { slidesPerView: 4, spaceBetween: 20 },
                }}
            

                slidesPerView={3}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="pagination mt-5  "
            >
                {
                    sliceProducts?.map((el) => (
                        <SwiperSlide key={el.id} className=' mt-[20px] '> 
                            <div className="">
                                <div className="group border max-w-[450px] w-full ">

                                    {/* IMAGE */}
                                    <div className="relative  h-[200px]">
                                        <img
                                            src={el.thumbnail}
                                            alt={el.title}
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
                                                cart?.find((item) => item.id === el.id) ? (<button
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
                                                )}

                                            {/* VIEW */}
                                            <Link
                                                to={`/products/${el.id}`}
                                                className="w-12 h-12 rounded-full bg-white text-gray-700 flex items-center justify-center translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-200 hover:bg-[#FF7010] hover:text-white"
                                            >
                                                <FaEye size={20} />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* INFO */}
                                    <div className="p-2">
                                        <h1 className="line-clamp-1 text-[16px]  font-semibold text-gray-900">
                                            {el.title}
                                        </h1>

                                        <p className="line-clamp-2 text-[12px] text-gray-500">
                                            {el.description}
                                        </p>

                                        <p className="text-blue-500 font-bold text-[15px]">
                                            $ {el.price}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </SwiperSlide>

                    ))
                }


            </Swiper>
        </>
    );
}
