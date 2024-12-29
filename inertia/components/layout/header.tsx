import { Link, usePage } from '@inertiajs/react'
import { Button } from '../ui/button'
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown_menu'

export function Header() {
  const {
    props: { user },
  } = usePage()

  return (
    <header className="flex justify-center w-full bg-stone-950 h-16 border-b border-b-stone-800 p-4 sticky top-0 z-50">
      <div className="max-w-screen-xl w-full mx-auto flex items-center justify-between">
        <Link href="/">
          <h1 className="text-white font-medium">Guild-o-matic</h1>
        </Link>
        {user ? (
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <span className="text-white font-medium">Bonjour {user.username}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/account/profile">Mon compte</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/account/guilds">Mes guildes</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="bg-teal-800 hover:bg-teal-900" asChild>
              <Link href="/guilds/create">+ Ajouter une guilde</Link>
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
