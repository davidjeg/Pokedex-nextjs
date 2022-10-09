import SearchComponent from './SearchComponent'
import ThemeSwitcher from './ThemeSwitcher'
import Link from 'next/link'
const Navbar = () => {
  return (
    <header className="w-full p-2 backdrop-blur-sm fixed z-50">
      <div className="max-w-4xl mx-auto ">
        <nav className="flex justify-between items-center">
          <div className="inline-flex gap-4 p-2">
            <Link href="/">Pokemon</Link>
            <Link href="/favorites">Favorites</Link>
            <SearchComponent />
          </div>
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  )
}

export default Navbar
