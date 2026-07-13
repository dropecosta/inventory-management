"use client"

import React from 'react'
import { Bell, Menu } from 'lucide-react'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center w-full mb-7'>
      {/* LEFT SIDE */}
      <div className='flex justify-between items-center gap-5'>
        <button
          className='bg-gray-100 hover:bg-blue-100 py-3 px-3 rounded-full'
          onClick={() => {}}
        >
          <Menu className='w-4 h-4' />
        </button>
      </div>

      <div className="relative">
       <input type='search' placeholder='start type to search groups & products' className='pl-10 pr-4 py=2 w=50 md:w-80 border=2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500' />
      </div>
    </div>
  )
}

export default Navbar