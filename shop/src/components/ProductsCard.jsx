import React from 'react'
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../redux/Slice';
import { ToastContainer, toast } from 'react-toastify';

function ProductsCard({ productProp }) {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const _id = productProp.title;
  function toString(_id){
    return String(_id).toLowerCase().split(' ').join('')
  }
  const rootId = toString(_id)
 
  function handleDetails(){
    navigate(`/product/${rootId}`, {
      state :{
        item : productProp,
      }
    })
  }
  
  return (
    <div className='group relative'>
      <div onClick = {handleDetails} className='w-full h-96 cursor-pointer overflow-hidden'>
        <img className ="w-full h-full object-cover group-hover:scale-110 duration-500"
             src={productProp.image} 
             alt="productImg"/>
      </div>

      <div className='w-full border-[1px] px-2 py-4'>
          <div className='flex justify-between items-center'>
            <div>
               <h2 className='font-titleFont text-base font-bold'>{productProp.title.substring(0,15)}</h2>
            </div>
            <div className='flex gap-2 relative overflow-hidden w-28 text-sm justify-end'>
              <div className=' flex gap-2 transform group-hover:translate-x-24 transition-transform duration-500'>
               <p className='line-through text-gray-500'>${productProp.oldPrice}</p>
               <p className='font-semibold'>${productProp.price}</p>
              </div>
              <p  onClick = {() => dispatch(addToCart({
                _id: productProp._id,
                title: productProp.title,
                image: productProp.image,
                price : productProp.price,
                quantity: 1,
                description : productProp.description,
              })) & toast.success(`${productProp.title} is added`)
              } 
              className='absolute z-20 w-[100px] text-gray-5000 hover:text-gray-900 flex items-center gap-1 top-0 transform -translate-x-32 group-hover:translate-x-0
                             transition-transform cursor-pointer duration-500'>
                Add to cart<span><MdOutlineArrowRightAlt /></span></p>
            </div>
          </div>
          <div>
            <p>{productProp.category}</p>
          </div>
          <div className=' absolute top-4 right-0'>
            {productProp.isNew && (<p className='bg-black text-white font-semibold font-titleFont px-6 py-1'>Sale</p>)}
          </div>
      </div>
      <ToastContainer
          position="top-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          />
    </div>
  )
}

export default ProductsCard;