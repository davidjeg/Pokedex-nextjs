type Payload = {
  type: string
  payload: {
    name: string
    id: number
    img: string
    isFavorite: boolean
  }
}
export const AddPokemon = (
  name: string,
  id: number,
  img: string,
  isFavorite: boolean
): Payload => {
  return {
    type: 'ADD_FAVORITE',
    payload: {
      name,
      id,
      img,
      isFavorite
    }
  }
}

type RemovePokemon = {
  type: string
  payload: {
    id: number
  }
}
export const RemovePokemon = (id: number): RemovePokemon => {
  return {
    type: 'REMOVE_FAVORITE',
    payload: {
      id
    }
  }
}
