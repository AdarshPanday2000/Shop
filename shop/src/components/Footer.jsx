import React from 'react'
import { FaGithub, FaYoutube, FaFacebook, FaTwitter, FaInstagram ,FaHome, FaUser} from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdContactSupport } from "react-icons/md";

function Footer() {
  return (
    <div className='bg-black text-[#949494] py-20 font-titleFont'>
        <div className='max-w-screen-xl mx-auto grid grid-cols-4'>
            {/* LogoIcon */}
            <div className='flex flex-col gap-4'>
                <h1 className='text-white text-4xl font-semibold'>eShop</h1>
                <p className='text-white text-sm tracking-wide'>ap3497017@gmail.com</p>
                <div className='flex gap-4'>
                    <FaFacebook  className='hover:text-white duration-300 cursor-pointer'/>
                    <FaGithub    className='hover:text-white duration-300 cursor-pointer'/>
                    <FaInstagram className='hover:text-white duration-300 cursor-pointer'/>
                    <FaTwitter   className='hover:text-white duration-300 cursor-pointer'/>
                    <FaYoutube  className='hover:text-white duration-300 cursor-pointer'/>
                </div>
            </div>

            {/* locate us */}
            <div className='text-base flex flex-col gap-2'>
               <h2 className='text-2xl font-semibold text-white mb-4'>Locate Us</h2>
               <p>Cantt area, Lucknow</p>
               <p>Mobile: 789532124</p>
               <p>E-mail: ap3497017@gmail.com</p>
            </div>

            {/* profile */}
            <div>
              <h2 className='text-2xl font-semibold text-white mb-4'>Profile</h2>
              <p className='flex items-center gap-3 hover:text-white duration-200 cursor-pointer'><span><FaUser/></span> My account</p>
              <p className='flex items-center gap-3 hover:text-white duration-200 cursor-pointer'><span><IoBagCheckOutline/></span> Checkout</p>
              <p className='flex items-center gap-3 hover:text-white duration-200 cursor-pointer'><span><FaHome/></span> Order tracking</p>
              <p className='flex items-center gap-3 hover:text-white duration-200 cursor-pointer'><span><MdContactSupport/></span> Help & Support</p>
            </div>

            {/* subscribe button */}
            <div className='flex flex-col justify-center'>
                <input className='bg-transparent border px-4 py-2 text-sm' type = "text" placeholder='E-mail'/>
                <button className='text-sm border text-white border-t-0 hover:bg-gray-900 active:bg-white active:text-black'>
                    Subscribe</button>
            </div>
        </div>
    </div>
  )
}

export default Footer