import { useEffect, useState } from 'react'

// Initializing global state store
let globalStore = {}
// Listeners array to keep track of all setState functions from components that use the store
let listeners = []
// Actions object to store functions that modify the store
let actions = {}

// Custom hook to allow components to use and modify the global store
// shouldListen allows apply optimization technique
// also use React.memo for the target component (ProductItem)
export const useStore = (shouldListen = true) => {
  // Using useState to get a setState function, but not using the state variable itself
  const setState = useState(globalStore)[1]

  // Function to dispatch actions that can modify the global state
  const dispatch = (actionId, payload) => {
    // Calling the action function and passing current state and payload, receiving new state
    const newState = actions[actionId](globalStore, payload)

    // Merging new state into the global store
    globalStore = { ...globalStore, ...newState }

    // Notifying all listeners (setState functions) about the updated store
    for (const listener of listeners) {
      listener(globalStore)
    }
  }

  // useEffect to handle the registration and unregistration of the listener
  useEffect(() => {
    // Adding setState to the listeners array when component mounts
    if (shouldListen) {
      listeners.push(setState)
    }

    // Cleanup function to remove the listener when component unmounts
    return () => {
      if (shouldListen) {
        listeners = listeners.filter((listener) => listener !== setState)
      }
    }
  }, [setState, shouldListen])

  // Returning the global store and the dispatch function to be used by the component
  return [globalStore, dispatch]
}

// Function to initialize the store with initial actions and optional initial state
export const initStore = (userActions, initialState) => {
  // If initial state is provided, merge it into the global store
  if (initialState) {
    globalStore = { ...globalStore, ...initialState }
  }

  // Merging user provided actions into the actions object
  actions = { ...actions, ...userActions }
}
