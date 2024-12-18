import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import { FormEventHandler, useCallback, useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { GW2Account } from '../../../app/types/gw2'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { Check, ClipboardPasteIcon, SaveIcon, Terminal } from 'lucide-react'
import { Label } from '@radix-ui/react-label'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card'
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
import { ReloadIcon } from '@radix-ui/react-icons'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'

type FormInputs = {
  username?: string
  email?: string
  gw2ApiKey?: string
}

export default function Profile() {
  const {
    props: { user },
  } = usePage()

  const [account, setAccount] = useState<GW2Account>()
  const { data, setData, isDirty, processing } = useForm<FormInputs>({ ...(user as User) })
  const [isAccountPending, setIsAccountPending] = useState(false)

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

  const getAccount = async (accessToken: string) => {
    return await fetch(`https://api.guildwars2.com/v2/account?access_token=${accessToken}`)
      .then((res) => res.json())
      .then((accountFounded) => {
        if (accountFounded) setAccount(accountFounded)
      })
  }

  const validateApiKey = async () => {
    if (!data.gw2ApiKey) return

    setIsAccountPending(true)
    await getAccount(data.gw2ApiKey).then(() => setIsAccountPending(false))
  }

  useEffect(() => {
    validateApiKey()
  }, [])

  const pasteClipboard = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    const content = await navigator.clipboard.readText()

    if (content) {
      setData('gw2ApiKey', content)
    }
  }

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    router.put('/profile', data, {
      only: ['user'],
      onSuccess: () => {
        toast({
          title: 'Sauvegardé',
          description: 'Vos informations ont été mis à jour.',
        })
      },
      onError: () => {
        toast({
          title: 'Problème',
          description: 'Une erreur est survenu.',
        })
      },
    })
  }

  return (
    <>
      <Head title="Profile" />
      <div className="max-w-screen-xl w-full mx-auto my-8">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Mon profil</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-4">
          Mon profil
        </h2>
        <div className="flex flex-col gap-4">
          <form onSubmit={submit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <div className="flex gap-4">
                <Input
                  id="username"
                  value={data.username}
                  onChange={(e) => setData('username', e.target.value)}
                  placeholder="Pseudo"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Adresse mail</Label>
              <div className="flex gap-4">
                <Input
                  id="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  placeholder="Adresse mail"
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <HoverCard>
                <HoverCardTrigger>
                  <Label htmlFor="api-key-gw2">Clé API Guild wars 2</Label>
                </HoverCardTrigger>
                <HoverCardContent>
                  <p>
                    Vous trouverez votre clé api ou la crée à l'adresse suivante :
                    <a href="https://account.arena.net/applications" target="_blank">
                      https://account.arena.net/applications
                    </a>
                  </p>
                  Autorisations requises : account guilds
                </HoverCardContent>
              </HoverCard>
              <div className="flex gap-4">
                <Input
                  id="api-key-gw2"
                  value={data.gw2ApiKey}
                  onChange={(e) => setData('gw2ApiKey', e.target.value)}
                  placeholder="ex: 7679f990-194f-43b0-bb46-577b2a16f1d2"
                />
                <div className="flex gap-2">
                  <Tooltip>
                    <TooltipTrigger>
                      <Button variant="outline" onClick={pasteClipboard}>
                        <ClipboardPasteIcon className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Coller depuis le presse-papier</p>
                    </TooltipContent>
                  </Tooltip>

                  <Button type="button" onClick={validateApiKey} disabled={isAccountPending}>
                    {isAccountPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                    Valider
                  </Button>
                </div>
              </div>
            </div>
            {account?.name ? (
              <Alert>
                <Check className="h-4 w-4" />
                <AlertTitle>Compte validé !</AlertTitle>
                <AlertDescription>
                  <p>Vous êtes connecté en tant que {account?.name}</p>
                </AlertDescription>
              </Alert>
            ) : (
              <Alert variant="destructive">
                <Check className="h-4 w-4" />
                <AlertTitle>Compte invalide</AlertTitle>
                <AlertDescription>
                  Nous n'avons pas trouvé de compte associé à cette clé
                </AlertDescription>
              </Alert>
            )}
            <Button type="submit" disabled={!isDirty}>
              {processing ? (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <SaveIcon className="mr-2 h-4 w-4" />
              )}
              Enregistrer
            </Button>
          </form>
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
      </div>
    </>
  )
}
