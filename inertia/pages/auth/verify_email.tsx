import { Head } from '@inertiajs/react'
import { Badge } from '~/components/ui/badge'

export default function VerifyEmail() {
  return (
    <>
      <Head title="Vérification de l'email" />
      <main className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] p-2">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2 text-white">
          Vérification de l'email
        </h1>
        <Badge variant="default">Version 2</Badge>
        <p className="text-white text-center leading-7 [&:not(:first-child)]:mt-6 mb-4">
          L&apos;outil pour trouver la guilde qui vous correspond sur Guild Wars 2
        </p>
      </main>
    </>
  )
}
