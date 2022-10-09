import { useState, useEffect } from 'react'
import { IoMoon, IoSunny } from 'react-icons/io5/index.js'

const themes = ['light', 'dark']
const ThemeSwitcher = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [theme, setTheme] = useState(() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme')
    }
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme:dark)')
    ) {
      return 'dark'
    }

    return 'light'
  })

  const toggleTheme = () => {
    const t = theme === 'light' ? 'dark' : 'light'
    setTheme(t)
    localStorage.setItem('theme', t)
  }

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
    }
  }, [theme])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted ? (
    <div className="rounded-3xl p-[1px] bg-indigo-100 dark:bg-zinc-600 inline-flex items-center">
      {themes.map(t => {
        const checked = t === theme
        return (
          <button
            onClick={toggleTheme}
            key={t}
            className={`${
              checked ? 'bg-white dark:text-zinc-900' : ''
            } p-2 rounded-3xl`}
          >
            {t === 'light' ? <IoSunny /> : <IoMoon />}
          </button>
        )
      })}
    </div>
  ) : (
    <div />
  )
}

export default ThemeSwitcher
