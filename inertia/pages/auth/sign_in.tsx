import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import { FormEventHandler } from 'react'
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
    props: { user },
  } = usePage()

  const { data, setData } = useForm<FormInputs>()

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    router.post('/auth/login', data)
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
            <form onSubmit={submit}>
              <Label>Adresse mail</Label>
              <Input
                value={data.email}
                type="email"
                onChange={(e) => setData('email', e.target.value)}
              />
              <Label>Mot de passe</Label>
              <Input
                value={data.password}
                type="password"
                onChange={(e) => setData('password', e.target.value)}
              />
              <Button className="mt-4">Se connecter</Button>
            </form>
          </CardContent>
        </Card>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Déjà un compte ?
          <Button variant="link" asChild>
            <Link href="/sign-up">S'inscrire</Link>
          </Button>
        </p>
      </div>
    </>
  )
}
