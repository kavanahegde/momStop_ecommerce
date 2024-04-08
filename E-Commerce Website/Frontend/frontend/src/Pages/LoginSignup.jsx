import React from 'react'

const LoginSignup = () => {
  return (
    <div className='loginsignup'>
    <div className="loginsignup-container">
    <h1>Sigh Up</h1>
    <div className="loginsignup-fields">
    <input type="text" placeholder='Your Name' />
    <input type="email" placeholder='Email Address' />
    <input type="password" placeholder='Password' />

    </div>
    <button>Continue</button>
    <p className="loginsignup-login">Already have an Account?<span>Login Here</span></p>
    <div className="loginsignup-agree">
    <input type="checkbox" name='' id =''/>
    <p>By Continuing , i agree to the term of use & privacy policy </p>
    </div>
    </div>
      
    </div>
  )
}

export default LoginSignup
