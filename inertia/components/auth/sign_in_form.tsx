import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Link, router, usePage } from "@inertiajs/react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Terminal } from "lucide-react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(7, {
    message: 'Votre mot de passe doit contenir au minimum 7 caractères.'
  }),
})

export default function SignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })
  const { toast } = useToast()
  const { errors, user } = usePage().props

  console.log('formState', form.formState)

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.post('/auth/login', values, {
      onProgress: () => {

      },
      onSuccess: () => {
        toast({
          title: 'Connecté',
          description: 'Vous êtes correctement connecté.',
        })
      },
      onError: (err) => {
        console.log({ err })
      }
    })
  }

  return (
    <Form {...form}>
      {errors && <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Un problème est survenu</AlertTitle>
        <AlertDescription>
          {errors.toString()}
        </AlertDescription>
      </Alert>}
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
        <Link href="/">
          <p className="leading-7 [&:not(:first-child)]:mt-6 text-sm text-indigo-500 underline text-right">
            Mot de passe oublié ?
          </p>
        </Link>
        <Button disabled={form.formState.isLoading} className="mt-4" type="submit">Se connecter</Button>
      </form>
    </Form>
  )
}