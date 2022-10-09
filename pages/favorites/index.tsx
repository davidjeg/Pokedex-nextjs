import CardPokemon from '../../components/CardPokemon'
import MainLayout from '../../layouts/MainLayout'
import Section from '../../components/Section'
import { useContext } from 'react'
import { Context } from '../../provider/Provider'

type PokemonTypes = {
  name: string
  id: number
  img: string
}

const FavoritesScreen = () => {
  const [state] = useContext<any>(Context)

  return (
    <MainLayout title={`Favorites`} description={`Pokedex favorites`}>
      <Section>
        {state?.length === 0 && <h1>No Favorites</h1>}
        {state?.map((pokemon: PokemonTypes) => {
          const pokemonIndex = ('00' + pokemon.id).slice(-3)
          return (
            <CardPokemon
              key={pokemon.id}
              name={pokemon.name}
              number={Number(pokemonIndex)}
            />
          )
        })}
      </Section>
    </MainLayout>
  )
}

export default FavoritesScreen
