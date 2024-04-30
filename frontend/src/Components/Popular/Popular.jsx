import React, { useEffect, useState } from 'react'
import './Popular.css'
import { Item } from '../Item/Item'

export const Popular = () => {
  const [popular,setPopular] = useState([])

  useEffect(()=>{
    fetch('http://localhost:4000/product/pahadispecial')
    .then(res=> res.json())
    .then(data => setPopular(data))
  },[])

  return (
    <div className='popular'>
        <h1>PAHADI SPECIAL</h1>
        <hr />

        <div className='popular-item'>
            {popular.map((item,i)=>{
                return <Item key={i} id={item.id} item={item}/>
            })}
        </div>
    </div>
  )
}
