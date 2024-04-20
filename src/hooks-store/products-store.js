import { initStore } from './store'

const PRODUCTS_MOCK = [
  {
    id: 'p1',
    title: 'Red Scarf',
    description: 'A pretty red scarf.',
    isFavorite: false,
  },
  {
    id: 'p2',
    title: 'Blue T-Shirt',
    description: 'A pretty blue t-shirt.',
    isFavorite: false,
  },
  {
    id: 'p3',
    title: 'Green Trousers',
    description: 'A pair of lightly green trousers.',
    isFavorite: false,
  },
  {
    id: 'p4',
    title: 'Orange Hat',
    description: 'Street style! An orange hat.',
    isFavorite: false,
  },
]

// Function to configure the store with actions and initial state
const configureStore = () => {
  // Actions object containing all actions that can be dispatched to modify the store
  const actions = {
    TOGGLE_FAV: (currentState, productId) => {
      // Finding the index of the product to toggle the favorite status
      const prodIndex = currentState.products.findIndex(
        (p) => p.id === productId,
      )
      // Toggling the 'isFavorite' status of the product
      const newFavStatus = !currentState.products[prodIndex].isFavorite
      // Creating a new products array for immutability
      const updatedProducts = [...currentState.products]
      // Updating the product at the found index with the new favorite status
      updatedProducts[prodIndex] = {
        ...currentState.products[prodIndex],
        isFavorite: newFavStatus,
      }
      // Returning the new state with updated products
      return { products: updatedProducts }
    },
  }
  // Initializing the store with the actions and initial state
  initStore(actions, { products: PRODUCTS_MOCK })
}

// Exporting configureStore for use elsewhere in the application
export default configureStore
