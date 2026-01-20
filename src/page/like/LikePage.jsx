import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

function LikePage() {

    const getProducts = async() => {
        return await axios.get(`https://dummyjson.com/products`)
    }

    const {data , isLoading , error } = useQuery({
        queryKey:["products"] ,
        queryFn: getProducts  ,
        staleTime: 60 * 1000 * 5
    })

    console.log(data);


    if(isLoading){
        return <div className="">Loading...</div>
    }

    // if (isFetched) {
    //     return <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    //         <div className="text-center">
    //             <div className="relative inline-block">
    //                 {/* Spinning Circle */}
    //                 <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
    //                 {/* Inner Circle */}
    //                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-4 border-indigo-200 border-b-indigo-600 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
    //             </div>
    //             <h2 className="mt-6 text-2xl font-bold text-gray-800">Yuklanmoqda...</h2>
    //             <p className="mt-2 text-gray-600">Iltimos, kuting</p>
    //             <div className="flex justify-center gap-2 mt-4">
    //                 <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
    //                 <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
    //                 <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    //             </div>
    //         </div>
    //     </div>
    // }
    
  return (
    <div>LikePage</div>
  )
}

export default LikePage