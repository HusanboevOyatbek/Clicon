import axios from 'axios';
import React, { useEffect, useState } from 'react'

function useGet({url}) {
    const [data , setData] = useState([]);
    const [loading , setLoadin] = useState(true);
    const baseUrl = import.meta.env.VITE_BASE_URL;

   async function getData(){
        try{
            let res = await axios.get(`${baseUrl}${url}`)
            setData(res.data);
        }catch(err){
            console.log(err);  
        }finally{
            setLoadin(false)
        }
    }

    useEffect(() =>{
        getData()
    } , [url])
    console.log(data);
    

  return ({data , loading})
}

export default useGet