export const PokemonReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return [...state, action.payload]

    case 'REMOVE_FAVORITE':
      return state.filter((pokemon: any) => pokemon.id !== action.payload?.id)
    default:
      return state
  }
}
