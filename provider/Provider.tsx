import { PokemonReducer } from '../reducers/PokemonReducer'
import { createContext, useMemo, useReducer } from 'react'

export const Context = createContext<any>([])

type Props = {
  children: React.ReactNode
}
const init = () => {
  if (typeof window !== 'undefined') {
    const item = JSON.parse(localStorage.getItem('pokemon') || '[]')
    return item || []
  }
}
const Provider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(PokemonReducer, [], init)

  const value = useMemo(() => {
    return [state, dispatch]
  }, [state, dispatch])

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default Provider
