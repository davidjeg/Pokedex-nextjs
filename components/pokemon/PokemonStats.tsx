type Props = {
  stat: number
  statName: string
}
const PokemonStats = ({ stat, statName }: Props) => {
  const colorStat = (stat: string): string => {
    const s = stat.toLowerCase()

    return s === 'hp'
      ? 'bg-green-500'
      : s === 'attack'
      ? 'bg-yellow-500'
      : s === 'defense'
      ? 'bg-orange-500'
      : s === 'special-attack'
      ? 'bg-blue-500'
      : s === 'special-defense'
      ? 'bg-violet-500'
      : s === 'speed'
      ? 'bg-pink-500'
      : ''
  }

  return (
    <div className="flex flex-col gap-1 capitalize ">
      {statName}
      <div className="w-full dark:bg-zinc-800 bg-indigo-100 rounded-sm overflow-hidden flex items-center h-4 text-right mb-2">
        <div
          style={{ width: `${stat}%` }}
          className={`${colorStat(statName)} text-xs font-semibold p-1`}
        >
          {stat}
        </div>
      </div>
    </div>
  )
}

export default PokemonStats
