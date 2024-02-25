import React from 'react'
import ProductsCard from './ProductsCard'

function Products({ productProp }) {
  
  return (
    <div className='py-18'>
        <div className='flex flex-col items-center gap-4'>
            <h1 className='text-2xl bg-black text-white py-2 w-80 text-center mt-4'>Shop everyday</h1>
            <span className='w-20 h-[3px] bg-black'></span>
            <p className='max-w-[700px] text-gray-600 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis beatae facere consectetur, nemo assumenda repellat quasi impedit iure sit ipsa fugiat aut atque. Beatae quod corrupti ut error magni commodi!</p>
        </div>

        <div className='max-w-screen-xl mx-auto py-10 grid grid-cols-4 gap-10 '>
         {productProp.map((item) => {
          return <ProductsCard key = {item._id} productProp = {item}/>
         })}
        </div>
    </div>
  )
}

export default Products