import React from 'react'
import {shopLogo, shoppingBagLogo,userLogo } from '../assets/index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const productData = useSelector((state) => state.shop.productData);
  const userInfo = useSelector((state) => state.shop.userInfo);
  console.log(userInfo)
  return (
    <div className='sticky top-0 z-50 w-full h-20 bg-white border-b-[1px] border-b-gray-800 font-titleFont'>
        <div className='max-w-screen-xl h-full mx-auto flex items-center justify-between'>
           <Link to='/'>
           <div className='flex flex-row'>
                <img className=" h-10 " src = {shopLogo}/>
                <h2 className='px-4 font-extrabold text-3xl'>eShop</h2>
            </div>
           </Link>
            <div className='flex items-center gap-8'>
              <ul className='flex items-center gap-8'>
                <Link to='/' className='text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>Home</Link>
                <li className='text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>Pages</li>
                <li className='text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>Shop</li>
                <li className='text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>Element</li>
                <li className='text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>Blog</li>
              </ul>
             <Link to='/cart'>
              <div className=' relative'>
                <img  className = "w-9" src= {shoppingBagLogo}/>
                <span className='absolute w-6 top-4 left-0 text-xs font-extrabold flex items-end justify-center'>{productData.length}</span>
              </div>
             </Link>
             <Link to = '/login'>
              <img className='w-8 h-8 rounded-full'
                src={userInfo ? userInfo.iamge : userLogo}
                alt = "userlogo"/>
              </Link>
              { userInfo && <p className='text-base font-titleFont font-semibold underline underline-offset-2'>{userInfo.name}</p>}
            </div>
        </div>
    </div>
  )
}

export default Header