import { Link, usePage } from '@inertiajs/react'
import { Button } from '../ui/button'

export function Header() {
  const {
    props: { user },
  } = usePage()

  return (
    <header className="flex justify-center w-full bg-white h-16 border-b-slate-200 shadow-sm p-2  sticky top-0">
      <div className="max-w-screen-xl w-full mx-auto flex items-center justify-between">
        <Link href="/">
          <h1 className="font-medium">Guild-o-matic</h1>
        </Link>
        {user ? (
          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href="/guilds/create">+ Ajouter une guilde</Link>
            </Button>
            <Link href="/profile">
              <span className="font-medium">Bonjour {user.username}</span>
            </Link>
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
