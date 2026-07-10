"use client"

import React from 'react'
import { Menu } from 'lucide-react'

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
    </div>
  )
}

export default Navbar