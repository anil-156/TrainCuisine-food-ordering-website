import React, { useEffect, useState } from 'react'
import './NewCollection.css'
import {Item} from '../Item/Item'

export const NewCollections = () => {
  const [new_collection,setNewCollection] = useState([])

  useEffect(()=>{
     fetch("http://localhost:4000/product/newfooditems")
     .then(res=> res.json())
     .then(data => setNewCollection(data))

  },[])

  return (
    <div className='new-collections'>
        <h1>New FoodItems</h1>
        <hr />

        <div className='collections'>
            {new_collection.map((item,i)=>{
                return <Item key={i} id={item.id} item={item}/>
            })}
        </div>
    </div>
  )
}
