import React from 'react'
import { Link } from 'react-router-dom'

import './Navigation.css'

const Navigation = (props) => {
  return (
    <header className="main-header">
      <nav>
        <ul>
          <li>
            <Link to="/">All Products</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navigation
