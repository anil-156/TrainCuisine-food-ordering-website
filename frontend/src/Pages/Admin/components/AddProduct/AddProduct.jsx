import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../Assests/upload_area.svg'

export const AddProduct = () => {

    const [image,setImage] = useState(false);
    const [productDetails,setProductDetails] = useState({
        name:"",image:"",category:"veg",subcategory:"breakfast",foodtype:"none",new_price:"",old_price:""
    })

    // productDetails
    const changeHandler =(e)=>{
        setProductDetails( (prev)=>{
            return {
                ...prev,
                [e.target.name]:e.target.value,
            }
        })
    }

    // addProduct
    const addProductHandler = async (e)=>{
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product',image);

        await fetch('http://localhost:4000/upload',{
            method:"POST",
            headers:{   
                Accept:"application/json",
            },
            body:formData,
        })
        .then((res)=> res.json())
        .then((data)=>responseData=data)

        if(responseData.success){
            product.image = responseData.image_url;
            console.log(product);

            await fetch('http://localhost:4000/product/addproduct',{
                method:"POST",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json",
                    'token':`${localStorage.getItem('token')}`,
                },
                body:JSON.stringify(product),
            }).then((resp)=> resp.json())
            .then((data)=>{
                data.success?alert("Product Added"):alert("Failed")
            })
        }
    }

    // imageHandler
    const imageHandler = (e)=>{
        setImage(e.target.files[0]);
    }

  return (
    <div className='add-product'>
        <div className='addproduct-itemfield'>
            <p>Food Name</p>
            <input type='text' name='name' placeholder='Type here' value={productDetails.name} onChange={changeHandler}/>
        </div>

        <div className='addproduct-price'>
            <div className='addproduct-itemfield'>
                <p>Price</p>
                <input type='text ' name='old_price' placeholder='Type here' value={productDetails.old_price} onChange={changeHandler}/>
            </div>

            <div className='addproduct-itemfield'>
                <p>Offer Price</p>
                <input type='text ' name='new_price' placeholder='Type here' value={productDetails.new_price} onChange={changeHandler}/>
            </div>
        </div>

        <div className='addproduct-categories'>

        <div className='addproduct-itemfield'>
            <p>Food Category</p>
            <select value={productDetails.category} onChange={changeHandler} name='category' className='add-product-selector'>
                <option value="veg">Veg</option>
                <option value="non-veg">Non-Veg</option>
                <option value="vegan">Vegan</option>
            </select>
        </div>

        <div className='addproduct-itemfield'>
            <p>Food Types</p>
            <select value={productDetails.foodtype} onChange={changeHandler} name='foodtype' className='add-product-selector'>
                <option value="none">None</option>
                <option value="streetfood">StreetFood</option>
                <option value="southindian">SouthIndian</option>
                <option value="pahadi">Pahadi</option>
            </select>
        </div>

        <div className='addproduct-itemfield'>
            <p>Food SubCategory</p>
            <select value={productDetails.subcategory} onChange={changeHandler} name='subcategory' className='add-product-selector'>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
            </select>
        </div>
        </div>

        <div className='addproduct-itemfield'>
        <label htmlFor='file-input'>
            <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-img' alt=''/>
        </label>
        <input onChange={imageHandler} type='file' name='image' id='file-input' hidden/>
        </div>

        <button onClick={addProductHandler} className='addproduct-btn'>ADD</button>
    </div>
  )
}
