import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import { Terminal } from 'lucide-react'
import { FormEventHandler } from 'react'
import SignInForm from '~/components/auth/sign_in_form'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

export default function SignIn() {
  const {
    props: { errors },
  } = usePage()

  return (
    <>
      <Head title="Connexion" />
      <div className="h-screen flex flex-col items-center justify-center p-2">
        <Card className="min-w-96">
          <CardHeader>
            <CardTitle className="font-bold">Connexion</CardTitle>
            <CardDescription>
              Avoir un compte est nécessaire à l'ajout d'une guilde sur le site.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignInForm />
          </CardContent>
        </Card>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-sm text-stone-500">
          Vous n'êtes pas encore inscrit ?
          <Button variant="link" asChild>
            <Link href="/sign-up">S'inscrire</Link>
          </Button>
        </p>
      </div>
    </>
  )
}
