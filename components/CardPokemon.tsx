import { checkTypeIcon } from '../utils/convertPokemon'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
type Props = {
  name: string
  number: number | string
}
const CardPokemon = ({ name, number }: Props) => {
  const [type, setTypes] = useState<any>([])
  const convertNumber = ('000' + number).slice(-3)
  console.log(number)

  console.log(convertNumber.length)

  useEffect(() => {
    const fetchData = async (name: string) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      const data = await res.json()
      return data
    }
    fetchData(name).then(res => setTypes(res))
  }, [name])

  return (
    <Link href={`/pokemon/${name}`}>
      <div className="dark:bg-zinc-800 rounded-sm shadow-lg text-center p-3 cursor-pointer relative hover:scale-110 transition-all duration-300 block">
        <div className="inline-flex absolute right-1 flex-col gap-3 ">
          {type.types?.map((item: any) => {
            return (
              <div
                id={`${checkTypeIcon(item.type.name)}`}
                key={item.type.name}
                className={`icon ${item.type.name} `}
              >
                <img
                  alt={item.type.name}
                  src={`/icons/${checkTypeIcon(item.type.name)}.svg`}
                />
              </div>
            )
          })}
        </div>
        <span className="absolute bg-orange-500 rounded-br-2xl top-0 left-0 px-2 py-0.5 shadow-sm text-sm ">
          {`# ${convertNumber}`}
        </span>
        <Image
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${convertNumber}.png`}
          alt={name}
          layout="responsive"
          width={400}
          height={400}
        />
        <h1>{name}</h1>
      </div>
    </Link>
  )
}

export default CardPokemon
