import React from 'react'
import './Offers.css'
import exclucive_image from '../Assets/exclusive_image.png'

const Offers = () => {
  return (
    <div className='Offers'>
    <div className="offers-left">
    <h1>Exclusive</h1>
    <h1> offers for you</h1>
    <p>ONLY ON BEST SELLER PRODUCTS</p>
    <button> Check Now</button>
    </div>
    <div className="offers-right">
    <img src={exclucive_image} alt="" />
    </div>
    
      
    </div>
  )
}

export default Offers
