import { Head, usePage } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'

export default function EmailVerification() {
  const { user } = usePage().props

  return (
    <>
      <Head title="Vérification de l'email" />
      <div className="h-screen flex flex-col items-center justify-center p-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">Vérification de l'email</CardTitle>
            <CardDescription>
              Un email a été envoyé à l'adresse mail {(user as User).email}
            </CardDescription>
          </CardHeader>
          <CardContent>
            
          </CardContent>
        </Card>
      </div>
    </>
  )
}
