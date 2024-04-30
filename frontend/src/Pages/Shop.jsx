import React from 'react'
import { Hero } from '../Components/Hero/Hero'
import { Popular } from '../Components/Popular/Popular'
import { Offer } from '../Components/Offer/Offer'
import { NewCollections } from '../Components/NewCollections/NewCollections'
import { NewsLetter } from '../Components/NewsLetter/NewsLetter'
import { Navbar } from '../Components/Navbar/Navbar'

export const Shop = () => {
  return (
    <div>
       <Navbar />
        <Hero />
        <Popular />
        <Offer />
        <NewCollections />
        <NewsLetter />
    </div>
  )
}
