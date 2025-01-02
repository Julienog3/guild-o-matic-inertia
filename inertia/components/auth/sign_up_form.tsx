import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, usePage } from "@inertiajs/react";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Check, ClipboardPasteIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { GW2Account } from "../../../app/types/gw2";
import { useState } from "react";

const formSchema = z.object({
  username: z.string()
    .min(6, {
      message: 'Votre nom \'utilisateur doit contenir au minimum 6 caractères.'
    })
    .max(16,{
      message: 'Votre nom \'utilisateur doit contenir au maximum 16 caractères.'
    }),
  email: z.string().email(),
  gw2ApiKey: z.string().optional(),
  password: z.string().min(7, {
    message: 'Votre mot de passe doit contenir au minimum 7 caractères.'
  }),
  password_confirmation: z.string().min(7)
}).refine((data) => data.password === data.password_confirmation, {
  message: 'La confirmation du mot de passe ne correspond pas au mot de passe renseigné.',
  path: ['password_confirmation']
})

export default function SignUpForm() {
  const [account, setAccount] = useState<GW2Account>()
  const [isAccountPending, setIsAccountPending] = useState(false)
  const { errors } = usePage().props
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.post('/auth/register', values, {
      onSuccess: () => {
        toast({
          title: 'Modification',
          description: 'Votre guilde a correctement été modifié.',
        })
      },
      onError: (err) => {
        console.log({ err })
      }
    })
  }

  async function getAccount(accessToken: string) {
    return await fetch(`https://api.guildwars2.com/v2/account?access_token=${accessToken}`)
      .then((res) => res.json())
      .then((accountFounded) => {
        if (accountFounded) setAccount(accountFounded)
      })
  }

  async function pasteClipboard(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault()
    const content = await navigator.clipboard.readText()

    if (content) {
      form.setValue('gw2ApiKey', content)
    }
  }

  async function validateApiKey() {
    if (!form.getValues('gw2ApiKey')) return

    setIsAccountPending(true)
    await getAccount(form.getValues('gw2ApiKey')!).then(() => setIsAccountPending(false))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField 
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom d'utilisateur</FormLabel>
              <FormDescription>Votre nom d'utilisateur devra contenir au moins 5 caractères.</FormDescription>
              <FormControl>
                <Input required type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse mail</FormLabel>
              <FormControl>
                <Input required type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="gw2ApiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clé API Guild Wars 2</FormLabel>
              <FormDescription>
                Vous trouverez votre clé api ou la crée à l'adresse suivante : 
                <a className="text-indigo-500" href="https://account.arena.net/applications" target="_blank">
                  https://account.arena.net/applications
                </a>
                <br />
                Autorisations requises : account guilds
              </FormDescription>
              <div className="flex gap-2">
                <FormControl>
                    <Input type="text" {...field} />
                </FormControl>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={pasteClipboard}>
                    <ClipboardPasteIcon className="h-4 w-4" />
                  </Button>
                  <Button type="button" onClick={validateApiKey} disabled={isAccountPending}>
                    {isAccountPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                    Valider
                  </Button>
                </div>
              </div>
              {account?.name ? (
                <Alert>
                  <Check className="h-4 w-4" />
                  <AlertTitle>Compte validé !</AlertTitle>
                  <AlertDescription>
                    Vous êtes connecté en tant que {account?.name}
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
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField 
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="current-password" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Confirmation du mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="current-password" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">S'inscrire</Button>
      </form>
    </Form>
  )
}