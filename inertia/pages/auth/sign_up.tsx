import { Head, Link, router, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

type FormInputs = {
  username: string
  email: string
  password: string
  password_confirmation: string
}

export default function SignUp() {
  const { data, setData } = useForm<FormInputs>()

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    router.post('/auth/register', data)
  }

  return (
    <>
      <Head title="Inscription" />
      <div className="h-screen flex flex-col items-center justify-center p-2">
        <Card className="min-w-96">
          <CardHeader>
            <CardTitle className="font-bold">Inscription</CardTitle>
            <CardDescription>
              Avoir un compte est nécessaire à l'ajout d'une guilde sur le site.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label>Nom d'utilisateur</Label>
                <Input
                  value={data.username}
                  type="text"
                  onChange={(e) => setData('username', e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Adresse mail</Label>
                <Input
                  value={data.email}
                  type="email"
                  onChange={(e) => setData('email', e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Mot de passe</Label>
                  <Input
                    value={data.password}
                    type="password"
                    onChange={(e) => setData('password', e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Confirmation du mot de passe</Label>
                  <Input
                    value={data.password_confirmation}
                    type="password"
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                  />
                </div>
              </div>
              <Button className="mt-4">S'inscrire</Button>
            </form>
          </CardContent>
        </Card>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Déjà un compte ?
          <Button variant="link" asChild>
            <Link href="/sign-in">Se connecter</Link>
          </Button>
        </p>
      </div>
    </>
  )
}
