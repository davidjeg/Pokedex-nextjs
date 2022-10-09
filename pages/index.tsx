import { GetStaticProps } from 'next'
import CardPokemon from '../components/CardPokemon'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr/index.js'
import { useState } from 'react'
import Section from '../components/Section'
import MainLayout from '../layouts/MainLayout'

type PokemonProps = {
  name: string
  url: string
}

type Props = {
  next: string
  previous: string
  pokemon: PokemonProps[]
}
const PokemonMainPage = ({ next, previous, pokemon }: Props) => {
  const [pokemons, setPokemons] = useState(pokemon)
  const [nextPage, setNextPage] = useState(next)
  const [prevPage, setPrevPage] = useState(previous)
  const [offset, setOffset] = useState(0)

  const fetchNextPokemons = async (url: string, isNextPage: boolean) => {
    const res = await fetch(url)
    const { next, previous, results } = await res.json()
    setPokemons(results)
    setNextPage(next)
    setPrevPage(previous)

    setOffset(isNextPage ? offset + 20 : offset - 20)
  }

  console.log(pokemons)
  return (
    <MainLayout title="Pokedex" description="principal home screen pokedex">
      <Section>
        {pokemons.map((pokemon: PokemonProps, index: number) => {
          const pokemonIndex = index + 1
          return (
            <CardPokemon
              key={index}
              name={pokemon.name}
              number={pokemonIndex + offset}
            />
          )
        })}
      </Section>
      <div className="flex gap-16 mx-auto max-w-3xl justify-center pb-4">
        <button
          className="bg-orange-500 rounded-lg py-1 px-8 shadow-lg hover:scale-105 transition-all duration-200 hover:shadow-md hover:shadow-orange-900"
          disabled={!prevPage}
          onClick={() => fetchNextPokemons(prevPage, false)}
        >
          <GrFormPrevious className="h-5 w-5 " />
        </button>
        <button
          className="bg-orange-500 rounded-lg py-1 px-8 shadow-lg hover:scale-105 transition-all duration-200 hover:shadow-md hover:shadow-orange-900"
          disabled={!nextPage}
          onClick={() => fetchNextPokemons(nextPage, true)}
        >
          <GrFormNext className="h-5 w-5 " />
        </button>
      </div>
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/`)
  const { next, previous, results: pokemon } = await res.json()

  return {
    props: {
      next,
      previous,
      pokemon
    }
  }
}
export default PokemonMainPage
