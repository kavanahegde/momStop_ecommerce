
import React, { useState, useRef } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link, NavLink } from 'react-router-dom';



const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const refToSomeElement = useRef(null);

    return (
        <div className='navbar' ref={refToSomeElement}>
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>MOMSTOP</p>
            </div>
            <ul className="nav-menu">
                <li onClick={() => { setMenu("shop") }}><NavLink to='/'>Shop</NavLink> {menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("mens") }}><NavLink to='/mens'>Mens</NavLink>{menu === "mens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("womens") }}><NavLink to='/womens'>Womens</NavLink>{menu === "womens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("kids") }}><NavLink to='/kids'>Kids</NavLink>{menu === "kids" ? <hr /> : <></>}</li>
            </ul>
            <div className="Nav-login-cart">
                <Link to='/login'><button>Login</button></Link>
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">0</div>
            </div>
        </div>
    );
}

export default Navbar;
