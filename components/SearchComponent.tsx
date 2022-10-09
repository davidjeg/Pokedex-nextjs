import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
const SearchComponent = () => {
  const [input, setInput] = useState('')

  const router = useRouter()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push({ pathname: '/browse/', query: { name: input } })
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Pokemon"
        className="text-zinc-900 px-2 border focus:outline-none focus:border-orange-500 rounded-sm placeholder:text-zinc-400 w-40"
        value={input}
        onChange={handleInput}
        name="search"
      />
    </form>
  )
}

export default SearchComponent
