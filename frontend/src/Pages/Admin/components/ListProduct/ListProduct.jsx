import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../Assests/cross_icon.png'

export const ListProduct = () => {

  const [allProducts,setAllProducts] = useState([])

  const fetchInfo = async ()=>{
    await fetch('http://localhost:4000/product/allproducts')
    .then((res)=>res.json())
    .then((data)=>setAllProducts(data.foodDetails))
  }

  useEffect(()=>{
    fetchInfo();
  },[])

  const removeProduct = async (id)=>{
    await fetch("http://localhost:4000/product/removeproduct",{
      method:"POST",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json",
        'token':`${localStorage.getItem('token')}`,
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo()
  }

  return (
    <div className='list-product'>
      <h1>All Product List</h1>

      <div className='listproduct-format-main'>
        <p>Food</p>
        <p>Name</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>SubCategory</p>
        <p>Remove</p>
      </div>

      <div className='listproduct-allproducts'>
        <hr />

        {allProducts.map((product,index)=>{
          return (
            <>
            <div key={index} id={product.id} className='listproduct-format-main listproduct-format'>
              <img src={product.image} alt="" className='listproduct-product-icon'/>
              <p>{product.name}</p>
              <p>₹{product.old_price}</p>
              <p>₹{product.new_price}</p>
              <p>{product.category}</p>
              <p>{product.subcategory}</p>
              <img onClick={()=>{removeProduct(product.id)}} className="listproduct-remove-icon" src={cross_icon} alt='' />
            </div>
            <hr />
            </>
        )
        })}

      </div>
    </div>
  )
}
