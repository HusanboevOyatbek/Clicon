import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrease, increase, removeProduct } from '../../features/cartSlise';

function CartPage() {

  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  console.log(cart);

  // Umumiy narxni hisoblash
  const totalPrice = cart.reduce((sum, el) => {
    sum += (el.price - el.price * el.discountPercentage / 100) * el.qty;
    return sum
  }, 0);

  return (
    <>
      <div className='container mx-auto p-5'>
        <h1 className='text-3xl font-bold mb-6'>Savat</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mahsulotlar ro'yxati */}
          <div className="lg:col-span-2 space-y-4">
            {
              cart.map((el) => (
                <div key={el.id} className='bg-white rounded-lg shadow-md p-4 flex items-center gap-4'>
                  <button
                  onClick={() => dispatch(removeProduct(el))}
                  className='text-red-500 hover:text-red-700 font-bold text-xl'>×</button>

                  <img src={el.thumbnail} alt={el.title} className='w-24 h-24 object-cover rounded' />

                  <div className="flex-1 flex justify-between  items-center">

                    


                    <div className="">
                      <h2 className='font-semibold text-lg'>{el.title}</h2>
                      <p className='text-gray-600'>${el.price}</p>
                    </div>


                    <div className="flex">
                      <p className='font-bold text-red-600 line-through text-lg min-w-[80px] text-right'>
                        ${(el.price).toFixed(2)}
                      </p>

                      <p className='font-bold text-green-600 text-lg min-w-[80px] text-right'>
                        ${(el.price - el.price * el.discountPercentage / 100).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-2">
                    <button 
                    onClick={() => dispatch(decrease(el))}
                    className='w-8 h-8 flex items-center justify-center bg-white rounded hover:bg-gray-200 font-bold'>-</button>
                    <span className='font-semibold min-w-[30px] text-center'>{el.qty}</span>
                    <button 
                    onClick={() => dispatch(increase(el))}
                    className='w-8 h-8 flex items-center justify-center bg-white rounded hover:bg-gray-200 font-bold'>+</button>
                  </div>

                  <p className='font-bold text-blue-600 text-lg min-w-[80px] text-right'>
                    ${((el.price - el.price * el.discountPercentage/100 ) * el.qty).toFixed(2)}
                  </p>
                </div>
              ))
            }

            {cart.length === 0 && (
              <div className='text-center py-12 text-gray-500'>
                <p className='text-xl'>Savat bo'sh</p>
              </div>
            )}
          </div>

          {/* Umumiy narx paneli */}
          <div className="lg:col-span-1">
            <div className='bg-white rounded-lg shadow-md p-6 sticky top-5'>
              <h2 className='text-xl font-bold mb-4'>Buyurtma xulosasi</h2>

              <div className='space-y-3 mb-4'>
                <div className='flex justify-between text-gray-600'>
                  <span>Mahsulotlar soni:</span>
                  <span className='font-semibold'>{cart.length}</span>
                </div>

                <div className='flex justify-between text-gray-600'>
                  <span>Yetkazib berish:</span>
                  <span className='font-semibold text-green-600'>Bepul</span>
                </div>

                <div className='border-t pt-3 mt-3'>
                  <div className='flex justify-between text-xl font-bold'>
                    <span>Jami:</span>
                    <span className='text-blue-600'>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors'>
                To'lovga o'tish
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartPage