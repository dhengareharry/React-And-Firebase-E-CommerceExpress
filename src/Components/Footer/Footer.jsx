import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
const Footer = () => {
  return (
    <div>
      <footer>
        <div className='footer-container'>
          <a className='footer-name'>
            <span>E-CommerceExpress</span>
          </a>
          <p className='footer-link'>
            <Link to={'/'} rel="noopener noreferrer" target="_blank" className="text-gray-100 ml-1">
             @ecommerceexpress
            </Link>
          </p>
          <span className='social-media'>
            <a>
              <img src='https://cdn-icons-png.flaticon.com/128/20/20837.png'/>
            </a>
            <a>
              <img src='https://cdn-icons-png.flaticon.com/128/733/733635.png'/>
            </a>
            <a>
              <img src='https://cdn-icons-png.flaticon.com/128/1077/1077042.png'/>
            </a>
            <a>
              <img src='https://cdn-icons-png.flaticon.com/128/3128/3128219.png'/>
            </a>
          </span>
        </div>
      </footer>
    </div>
  )
}

export default Footer