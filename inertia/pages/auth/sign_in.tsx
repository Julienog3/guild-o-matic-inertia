import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import { Terminal } from 'lucide-react'
import { FormEventHandler } from 'react'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

type FormInputs = {
  email: string
  password: string
}

export default function SignIn() {
  const {
    props: { errors },
  } = usePage()

  const { data, setData } = useForm<FormInputs>()

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    router.post('/auth/login', data, {
      onError: (err) => {
        console.log({ err })
      },
      onSuccess: () => {
        console.log('bah cool')
      }
    })
  }

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
            <form onSubmit={submit} className="flex flex-col gap-4">
              {errors && <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Un problème est survenu</AlertTitle>
                <AlertDescription>
                  {errors.toString()}
                </AlertDescription>
              </Alert>}
              <div className="flex flex-col gap-2">
                <Label>Adresse mail</Label>
                <Input
                  value={data.email}
                  type="email"
                  onChange={(e) => setData('email', e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Mot de passe</Label>
                <Input
                  value={data.password}
                  type="password"
                  onChange={(e) => setData('password', e.target.value)}
                />
                <Link href="/">
                  <p className="leading-7 [&:not(:first-child)]:mt-6 text-sm text-indigo-500 underline text-right">
                    Mot de passe oublié ?
                  </p>
                </Link>
              </div>
              <Button className="mt-4">Se connecter</Button>
            </form>
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
