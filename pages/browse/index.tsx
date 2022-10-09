import MainLayout from '../../layouts/MainLayout'
import Section from '../../components/Section'
import CardPokemon from '../../components/CardPokemon'
import { GetServerSideProps } from 'next'
type Props = {
  pokemons: {
    name: string
    id: number
  }
}
const BrowseScreen = ({ pokemonsFiltered, pokeDetails }: Props) => {
  return (
    <MainLayout title={'test'} description={'test'}>
      <Section>
        {pokeDetails?.length === 0 && <h1>No result found.</h1>}
        {pokeDetails?.map(poke => {
          return (
            <CardPokemon
              key={poke.id}
              name={poke.name}
              number={`00${poke.id}`}
            />
          )
        })}
      </Section>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { name } = context.query
  const lowerCaseNamePokemon = name?.toLowerCase()
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1154`)
  const { results } = await response.json()

  const pokemonsFiltered = results.filter(pokemon => {
    return pokemon.name.includes(lowerCaseNamePokemon)
  })

  const pokeDetails = await Promise.all(
    pokemonsFiltered.map(async poke => {
      const response = await fetch(poke.url)
      const data = await response.json()
      return data
    })
  )

  return {
    props: {
      pokemonsFiltered,
      pokeDetails
    }
  }
}

export default BrowseScreen
