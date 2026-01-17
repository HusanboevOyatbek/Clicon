import React from 'react'
import { useParams } from 'react-router-dom';
import useGet from '../../hook/useGet';

function SinglePage() {
  const {id} = useParams();
  const {data} = useGet({url:`products/${id}`})
  console.log(data);
  
  return (
    <div>SinglePage</div>
  )
}

export default SinglePage