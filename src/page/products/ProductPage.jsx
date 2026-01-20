import React from 'react'

function ProductPage() {
  return (
    <section>
      <div className="container mx-auto p-5">
        <div className="max-w-[300px] w-full border text-center ">
          <h1 className="text-4xl font-bold mb-8 uppercase">CATEGORY</h1>

          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="category"
                className="w-5 h-5 appearance-none border-2 border-gray-300 rounded-full checked:border-orange-500 checked:bg-orange-500 cursor-pointer transition relative
                 before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-white before:rounded-full before:opacity-0 checked:before:opacity-100"
                defaultChecked
              />
              <span className="text-sm text-gray-700 group-hover:text-orange-500 transition">
                Electronics Devices
              </span>
            </label>


            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="category"
                className="w-5 h-5 appearance-none border-2 border-gray-300 rounded-full checked:border-orange-500 checked:bg-orange-500 cursor-pointer transition relative
               before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-white before:rounded-full before:opacity-0 checked:before:opacity-100"
                defaultChecked
              />
              <span className="text-sm text-gray-700 group-hover:text-orange-500 transition">
                Electronics Devices
              </span>
            </label>



          </div>
        </div>
      </div>

    </section>
  )
}

export default ProductPage