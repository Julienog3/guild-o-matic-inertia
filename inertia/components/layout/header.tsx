import { Link, usePage } from '@inertiajs/react'
import { Button } from '../ui/button'
import { Plus, User2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'

export function Header() {
  const {
    props: { user },
  } = usePage()

  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  const styleWhenScrolled = 'bg-stone-950/75 backdrop-blur-xl border-b'

  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    })

    // return () => {
    //   scrollListener
    // }
  }, [])

  const headerStyles = `flex justify-center w-full h-16 p-4 fixed top-0 z-50 transition duration-500 backdrop-blur-none border-0 border-b-stone-800 ${isScrolled ? styleWhenScrolled : ''}`

  return (
    <header className={headerStyles}>
      <div className="max-w-screen-xl w-full mx-auto flex items-center justify-between">
        <Link href="/">
          <h1 className="text-white font-medium">Guild-o-matic</h1>
        </Link>
        {user ? (
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link href="/account/profile"><User2Icon />Mon compte</Link>
            </Button>
            <Button asChild>
              <Link href="/guilds/create"><Plus />Ajouter une guilde</Link>
            </Button>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <Button asChild>
              <Link href="/sign-up">S&apos;inscrire</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/sign-in">Se connecter</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
