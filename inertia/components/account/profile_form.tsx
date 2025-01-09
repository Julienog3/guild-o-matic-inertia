import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, ClipboardPasteIcon } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import { useToast } from "../ui/use-toast";
import { GW2Account } from "../../../app/types/gw2";

interface Props {
  user: User
}

const formSchema = z.object({
  email: z.string().email().optional(),
  username: z.string()
    .min(6, {
      message: 'Votre nom \'utilisateur doit contenir au minimum 6 caractères.'
    })
    .max(16,{
      message: 'Votre nom \'utilisateur doit contenir au maximum 16 caractères.'
    })
    .optional(),
  gw2ApiKey: z.string().optional(),
})

export default function ProfileForm(props: Props) {
  const { user } = props

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...user }
  })

  const [account, setAccount] = useState<GW2Account>()
  const [isAccountPending, setIsAccountPending] = useState<boolean>(false)
  const { toast } = useToast()
  
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.put('/profile', values, {
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

  useEffect(() => {
    validateApiKey()
  }, [])
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField 
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom d'utilisateur</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Input disabled type="email" {...field} />
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
        <Button disabled={!form.formState.isDirty} type="submit">Enregistrer</Button>
      </form>
    </Form>
  )
}