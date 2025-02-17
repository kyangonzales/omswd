import React from 'react'

export default function TopNav({children}) {
  return (
    <div className='w-min-screen text-lg p-2 border-b'>
        {children}
    </div>
  )
}
