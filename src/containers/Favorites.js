import React from 'react'
import { useStore } from '../hooks-store/store'
import FavoriteItem from '../components/Favorites/FavoriteItem'
import './Products.css'

const Favorites = (props) => {
  const state = useStore()[0]
  const favProducts = state.products.filter(product => product.isFavorite)

  let content = <p className="placeholder">Got no favorites yet!</p>

  if (favProducts.length > 0) {
    content = (
      <ul className="products-list">
        {favProducts.map((prod) => (
          <FavoriteItem
            key={prod.id}
            id={prod.id}
            title={prod.title}
            description={prod.description}
          />
        ))}
      </ul>
    )
  }
  return content
}

export default Favorites
