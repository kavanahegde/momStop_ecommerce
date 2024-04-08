import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
    <h1>Get Exclusive Offers On Your Email</h1>
    <p>Subscribe to oour newsletter and stay upadated</p>
    <div>
    <input type="email" placeholder='Your Email id' />
    <button>Subscribe</button>
    </div>
      
    </div>
  )
}

export default NewsLetter
