import { convertTypeColor, checkTypeIcon } from '../../utils/convertPokemon'

type Types = {
  slot: number
  type: {
    name: string
  }
}
type Abilities = {
  slot: number
  ability: {
    name: string
  }
}
type Props = {
  id: string
  height: number
  weight: number
  ability: Abilities
  type: Types[]
}
const PokemonDescription = ({ id, height, weight, ability, type }: Props) => {
  const convertHeight = (n: number) => {
    const cm = (n / 100) * 10
    const convertMToFeetAndInch = (n: number) => {
      const feets = n * 3.28
      return feets
    }
    const fixedCm = cm.toFixed(1).toString()
    const feets = convertMToFeetAndInch(fixedCm)
    return fixedCm + 'm' + ' ' + `( ${feets.toFixed(1)} ) ft`
  }

  const convertWeight = (n: number) => {
    const convertToLb = (n: number) => {
      const lb = n / 0.45359237
      return lb.toFixed(1)
    }

    const w = (n * 10) / 100
    const lb = convertToLb(w)
    return w + 'kg   ' + `(${lb}lb)`
  }

  return (
    <table className="flex self-center">
      <tbody>
        <tr>
          <td className="py-4 pr-4">Id</td>
          <td className="p-4">{`#${id}`}</td>
        </tr>
        <tr>
          <td className="py-4 pr-4">Height</td>
          <td className="p-4">{convertHeight(height)}</td>
        </tr>
        <tr>
          <td className="py-4 pr-4">Weight</td>
          <td className="p-4">{convertWeight(weight)}</td>
        </tr>
        <tr>
          <td className="py-4 pr-4">Ability</td>
          <td className="flex gap-1 flex-wrap p-4">
            {ability.map(ability => {
              return (
                <span
                  className="dark:bg-zinc-800 bg-indigo-100 rounded-sm px-2 py-1 uppercase"
                  key={ability.slot}
                >
                  {ability.ability.name}
                </span>
              )
            })}
          </td>
        </tr>
        <tr>
          <td className="py-4 pr-4">Type</td>
          <td className="p-4 flex gap-1 flex-wrap">
            {type.map((pokemonType: Types) => {
              return (
                <div
                  className={`${pokemonType.type.name} inline-flex items-center gap-3 px-2 py-0.5 rounded-sm hover:scale-110 transition-all duration-300 capitalize`}
                  key={pokemonType.slot}
                >
                  {pokemonType.type.name}
                  <img
                    className="w-4 h-4"
                    alt={pokemonType.type.name}
                    src={`../icons/${checkTypeIcon(pokemonType.type.name)}.svg`}
                  />
                </div>
              )
            })}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default PokemonDescription
