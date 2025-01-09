import { Head, router, usePage } from '@inertiajs/react'
import { Button } from '~/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert_dialog'
import { useToast } from '~/components/ui/use-toast'
import AccountLayout from '~/components/account/account_layout'
import ProfileForm from '~/components/account/profile_form'


export default function Profile() {
  const {
    props: { user },
  } = usePage()


  const { toast } = useToast()

  const logout = (): void => {
    router.post(
      '/auth/logout',
      {},
      {
        onSuccess: () => {
          toast({
            title: 'Déconnecté',
            description: 'Vous avez été correctement déconnecté.',
          })
        },
      }
    )
  }

  return (
    <>
      <Head title="Mon profil" />
      <AccountLayout>
        <h3 className="text-2xl font-semibold tracking-tight text-white">Mon profil</h3>
        <p className="leading-7 text-stone-400 mb-4">Retrouvez l'ensemble des informations de votre compte.</p>
        <div className="flex flex-col gap-4">
          <ProfileForm user={user as User}/>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Se déconnecter</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove
                  your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={logout}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </AccountLayout>
    </>
  )
}