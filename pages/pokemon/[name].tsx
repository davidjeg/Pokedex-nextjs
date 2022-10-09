import { HiOutlineStar, HiStar } from 'react-icons/hi/index.js'
import PokemonDescription from '../../components/pokemon/PokemonDescription'
import { Context } from '../../provider/Provider'
import { useContext, useEffect, useState } from 'react'
import { AddPokemon, RemovePokemon } from '../../actions/PokemonActions'
import PokemonStats from '../../components/pokemon/PokemonStats'
import Image from 'next/image'
import MainLayout from '../../layouts/MainLayout'
type Abilities = {
  slot: number
  ability: {
    name: string
  }
}
type Stats = {
  base_stat: number
  stat: {
    name: string
  }
}
type Types = {
  type: {
    name: string
  }
}
type Sprites = {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
}
type Props = {
  abilities: Abilities
  height: number
  weight: number
  id: number
  name: string
  sprites: Sprites
  stats: Stats[]
  types: Types[]
}

const PokemonDisplay = ({
  abilities,
  height,
  weight,
  id,
  name,
  sprites: { back_default, back_shiny, front_default, front_shiny },
  stats,
  types
}: Props) => {
  const pokemonIndex = ('00' + id).slice(-3)
  const getImg = `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${pokemonIndex}.png`
  const [state, dispatch] = useContext(Context)
  const [isMounted, setIsMounted] = useState(false)
  const [favoritePokemon, setFavoritePokemon] = useState()
  const addFavorite = (
    name: string,
    id: number,
    img: string,
    isFavorite: boolean
  ) => {
    dispatch(AddPokemon(name, id, img, isFavorite))
  }
  const removeFavorite = (id: number) => {
    dispatch(RemovePokemon(id))
  }

  useEffect(() => {
    localStorage.setItem('pokemon', JSON.stringify(state))
    if (state) {
      const filteredPokemon = state.find(pokemon => pokemon.id === id)
      setFavoritePokemon(filteredPokemon)
    }
  }, [state, id])
  useEffect(() => {
    setIsMounted(true)
  }, [])
  return (
    isMounted && (
      <MainLayout title={name} description="test">
        <div className="max-w-screen-xl px-8 mx-auto flex flex-col items-center gap-16 pt-[56px] pb-[28px]">
          <h1 className="uppercase font-semibold text-3xl">{name}</h1>
          <div className="lg:grid lg:grid-cols-3 md:grid  md:grid-cols-2 flex flex-col gap-12 w-full">
            <PokemonDescription
              id={pokemonIndex}
              height={height}
              weight={weight}
              ability={abilities}
              type={types}
            />
            <div className="w-full h-full">
              <Image width={500} height={500} alt={name} src={getImg} />
            </div>
            <div>
              {stats.map(({ base_stat, stat }) => {
                return (
                  <PokemonStats
                    key={stat.name}
                    stat={base_stat}
                    statName={stat.name}
                  />
                )
              })}
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-4 grid-cols-2 grid gap-8 relative bg-indigo-100 dark:bg-zinc-800 rounded-sm py-2 px-10 ">
            {!favoritePokemon?.isFavorite && (
              <HiOutlineStar
                onClick={() => addFavorite(name, id, getImg, true)}
                className="w-6 h-6 absolute left-3 top-2 cursor-pointer"
              />
            )}

            {favoritePokemon?.isFavorite && (
              <HiStar
                onClick={() => removeFavorite(id)}
                className="w-6 h-6 absolute left-3 top-2 cursor-pointer"
              />
            )}

            <Image width={100} height={100} src={back_default} />
            <Image width={100} height={100} src={back_shiny} />
            <Image width={100} height={100} src={front_default} />
            <Image width={100} height={100} src={front_shiny} />
          </div>
        </div>
      </MainLayout>
    )
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.name}`)
  const { abilities, height, weight, id, name, sprites, stats, types } =
    await res.json()

  return {
    props: {
      abilities,
      height,
      weight,
      id,
      name,
      sprites,
      stats,
      types
    }
  }
}

export default PokemonDisplay
