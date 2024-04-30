import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import add_product_icon from '../../Assests/Product_Cart.svg'
import list_product_icon from '../../Assests/Product_list_icon.svg'

export const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to='/admin/addproduct' style={{textDecoration:"none"}}>
            <div className='sidebar-item'>
                <img src={add_product_icon} alt='' />
                <p>Add Food Item</p>
            </div>
        </Link>

        <Link to='/admin/listproduct' style={{textDecoration:"none"}}>
            <div className='sidebar-item'>
                <img src={list_product_icon} alt='' />
                <p>Food Item List</p>
            </div>
        </Link>
    </div>
  )
}
