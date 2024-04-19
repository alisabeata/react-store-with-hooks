import { useEffect, useState } from 'react'

let globalStore = {}
let listeners = []
let actions = {}

export const useStore = () => {
  const setState = useState(globalStore)[1]

  const dispatch = (actionId) => {
    const newState = actions[actionId](globalStore, payload)

    globalStore = { ...globalStore, ...newState }

    for (const listener of listeners) {
      listener(globalStore)
    }
  }

  useEffect(() => {
    listeners.push(setState)

    return () => {
      listeners = listeners.filter((listener) => listener !== setState)
    }
  }, [])

  return [globalStore, dispatch]
}

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalStore = { ...globalStore, ...initialState }
  }

  actions = { ...actions, ...userActions }
}
