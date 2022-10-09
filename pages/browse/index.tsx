import MainLayout from '../../layouts/MainLayout'
import Section from '../../components/Section'
import CardPokemon from '../../components/CardPokemon'
import { GetServerSideProps } from 'next'
const BrowseScreen = ({ pokeDetails }: any) => {
  console.log(pokeDetails)
  return (
    <MainLayout title={'Search'} description={'Search Screen Pokemon'}>
      <Section>
        {pokeDetails?.length === 0 && <h1>No result found.</h1>}
        {pokeDetails?.map((poke: any) => {
          return <CardPokemon key={poke.id} name={poke.name} number={poke.id} />
        })}
      </Section>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  if (context.query.name) {
    var lowerCaseNamePokemon: any = context.query.name
  }

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1154`)
  const { results } = await response.json()

  const pokemonsFiltered = results.filter((pokemon: any) => {
    return pokemon.name.includes(lowerCaseNamePokemon.toLowerCase())
  })
  const pokeDetails = await Promise.all(
    pokemonsFiltered.map(async (poke: any) => {
      const response = await fetch(poke.url)
      const data = await response.json()
      return data
    })
  )

  return {
    props: {
      pokeDetails
    }
  }
}

export default BrowseScreen
