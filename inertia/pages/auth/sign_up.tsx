import { Head, Link, router, usePage } from '@inertiajs/react'
import { ReloadIcon } from '@radix-ui/react-icons'
import { Check, ClipboardPasteIcon, Terminal } from 'lucide-react'
import { FormEventHandler, useState } from 'react'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'
import { GW2Account } from '../../../app/types/gw2'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { useToast } from '~/components/ui/use-toast'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import SignUpForm from '~/components/auth/sign_up_form'

type FormInputs = {
  username: string
  email: string
  gw2ApiKey?: string
  password: string
  password_confirmation: string
}

const formSchema = z.object({
  username: z.string().min(6, {
    message: ''
  }),
  email: z.string().email(),
  gw2ApiKey: z.string().optional(),
  password: z.string(),
  password_confirmed: z.string()
})

export default function SignUp() {
  const [account, setAccount] = useState<GW2Account>()
  const [isAccountPending, setIsAccountPending] = useState(false)
  const { errors } = usePage().props
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {}
  })

  // const submit: FormEventHandler<HTMLFormElement> = (e) => {
  //   e.preventDefault()
  //   router.post('/auth/register', data, {
  //     onSuccess: () => {
  //       toast({
  //         title: 'Modification',
  //         description: 'Votre guilde a correctement été modifié.',
  //       })
  //     },
  //   })
  // }

  // const getAccount = async (accessToken: string) => {
  //   return await fetch(`https://api.guildwars2.com/v2/account?access_token=${accessToken}`)
  //     .then((res) => res.json())
  //     .then((accountFounded) => {
  //       if (accountFounded) setAccount(accountFounded)
  //     })
  // }

  // const validateApiKey = async () => {
  //   if (!data.gw2ApiKey) return

  //   setIsAccountPending(true)
  //   await getAccount(data.gw2ApiKey).then(() => setIsAccountPending(false))
  // }

  // const pasteClipboard = async (e: React.MouseEvent<HTMLElement>) => {
  //   e.preventDefault()

  //   const content = await navigator.clipboard.readText()

  //   if (content) {
  //     setData('gw2ApiKey', content)
  //   }
  // }

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
