import CardPokemon from '../../components/CardPokemon'
import MainLayout from '../../layouts/MainLayout'
import Section from '../../components/Section'
import { useContext } from 'react'
import { Context } from '../../provider/Provider'

const FavoritesScreen = () => {
  const [state] = useContext(Context)
  console.log(state)

  return (
    <MainLayout title={`favorites`} description={`test`}>
      <Section>
        {state?.length === 0 && <h1>No Favorites</h1>}
        {state?.map(pokemon => {
          const pokemonIndex = ('00' + pokemon.id).slice(-3)
          return (
            <CardPokemon
              key={pokemon.id}
              name={pokemon.name}
              number={pokemonIndex}
            />
          )
        })}
      </Section>
    </MainLayout>
  )
}

export default FavoritesScreen
