import { Head, Link } from '@inertiajs/react'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import SignUpForm from '~/components/auth/sign_up_form'

export default function SignUp() {
  return (
    <>
      <Head title="Inscription" />
      <div className="h-screen flex flex-col items-center justify-center p-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">Inscription</CardTitle>
            <CardDescription>
              Avoir un compte est nécessaire à l'ajout d'une guilde sur le site.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
        </Card>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-sm text-stone-500">
          Déjà un compte ?
          <Button variant="link" asChild>
            <Link href="/sign-in">Se connecter</Link>
          </Button>
        </p>
      </div>
    </>
  )
}
