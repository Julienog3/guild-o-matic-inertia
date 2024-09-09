import { z } from 'zod'
import { Form, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormControl, FormField, FormItem, FormLabel } from '~/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { Button } from '~/components/ui/button'
import { router } from '@inertiajs/react'
import { useToast } from '~/components/ui/use-toast'

const formSchema = z.object({
  gw2GuildId: z.string(),
  discordLink: z.string().url().optional(),
  description: z.string(),
  thumbnail: z.string().optional(),
})

interface Props {
  guilds: any[]
}

export function GuildForm(props: Props) {
  const { guilds } = props

  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.post('/guilds', values, {
      onSuccess: () => {
        toast({
          title: 'Création',
          description: 'Votre guilde a correctement été ajouté.',
        })
      },
      onError: () => {
        toast({
          title: 'Oopsi',
          description: 'Problème survenu',
        })
      },
    })
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="gw2GuildId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guilde</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value} required>
                  <SelectTrigger className="w-[260px] bg-white">
                    <SelectValue placeholder="Sélectionner l'une de vos guildes" />
                  </SelectTrigger>
                  <SelectContent>
                    {guilds.map((guild) => {
                      return (
                        <SelectItem key={guild.id} value={guild.id}>
                          [{guild.tag}] {guild.name}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discordLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lien discord</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-[300px]"
                  placeholder="ex: https://discord.com/invite/JoRSsjBvKm"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} className="bg-white w-[420px]" required />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Illustration</FormLabel>
              <FormControl>
                <Input {...field} type="file" className="w-[300px]" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Ajouter la guilde</Button>
      </form>
    </FormProvider>
  )
}
