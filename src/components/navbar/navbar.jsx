import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

function Navbar() {
    return (
        <div className='navbar'>
            <ul className='menu-items'>
                <li className='menu-item'><Link to={'/'}>Home</Link></li>
            </ul>
        </div>
    )
}

export default Navbar