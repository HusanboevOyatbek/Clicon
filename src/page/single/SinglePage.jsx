import React from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function SinglePage() {
  const {id} = useParams();

  const getData = async() => await axios.get(`https://dummyjson.com/products/${id}`)

  const { data, isLoading , error} = useQuery({
    queryKey: ["products" , id],
    queryFn: getData,
    staleTime: 60 * 1000 * 5
  })

  console.log(data);

  
  const singelProducts = data?.data
  return (
    <div><img src={singelProducts?.thumbnail} alt="" /></div>
  )
}

export default SinglePage