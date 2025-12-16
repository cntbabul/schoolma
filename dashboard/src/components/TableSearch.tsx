import Image from 'next/image'
import React from 'react'

const TableSearch = () => {
    return (
        <div className='hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2'>
            <Image src="/search.png" alt="search" width={12} height={12} />
            <input type='text' placeholder='Search...' className='w-[200px] p-2 bg-transparent outline-none' />
        </div>
    )
}

export default TableSearch