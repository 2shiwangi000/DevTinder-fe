import React from 'react'
import Navbar from './common/Navbar'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      {/* footer */}
    </div>
  )
}

export default Body
