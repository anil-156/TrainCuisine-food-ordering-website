import React from 'react'
import { CartItems } from '../Components/CartItems/CartItems'
import { Navbar } from '../Components/Navbar/Navbar'

export const Cart = () => {
  return (
    <div>
      <Navbar />
      <CartItems />
    </div>
  )
}
