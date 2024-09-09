import { Head, Link } from '@inertiajs/react'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'

export default function Home(props: { version: number }) {
  return (
    <>
      <Head title="Homepage" />
      <div className="h-screen flex flex-col items-center justify-center p-2">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          Guild-o-matic
        </h1>
        <Badge>Version 2</Badge>
        <p className="leading-7 [&:not(:first-child)]:mt-6 mb-4">
          L&apos;outil pour trouver la guilde qui vous correspond sur Guild Wars 2
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/guilds">Voir les guildes</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/sign-in">Se connecter</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
