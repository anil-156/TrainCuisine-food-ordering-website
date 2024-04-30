import React from 'react'
import './AdminDisplay.css'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import { AddProduct } from '../../components/AddProduct/AddProduct'
import { ListProduct } from '../../components/ListProduct/ListProduct'

export const AdminDisplay = () => {
  return (
    <div className='admin'>
        <Sidebar />

        <Routes>
            <Route path='/addproduct' element={<AddProduct />} />
            <Route path='/listproduct' element={<ListProduct />} />
        </Routes>
    </div>
  )
}
