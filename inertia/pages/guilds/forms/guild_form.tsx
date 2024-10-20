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
import { router, usePage } from '@inertiajs/react'
import { useToast } from '~/components/ui/use-toast'
import { Checkbox } from '~/components/ui/checkbox'

const formSchema = z.object({
  gw2GuildId: z.string(),
  discordLink: z.string().url().optional(),
  categories: z.number().array(),
  description: z.string(),
  thumbnail: z.any(),
})

interface Props {
  guilds: any[]
  categories: any[]
}

export function GuildForm(props: Props) {
  const { guilds, categories } = props

  const { toast } = useToast()

  const {
    props: { errors },
  } = usePage()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values })

    router.post('/guilds', values, {
      forceFormData: true,
      onSuccess: () => {
        toast({
          title: 'Création',
          description: 'Votre guilde a correctement été ajouté.',
        })
      },
      onError: () => {
        toast({
          title: 'Oopsi',
          description: `Problème survenu ${JSON.stringify(errors)}`,
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
          name="categories"
          render={() => (
            <FormItem>
              <FormLabel>Catégories</FormLabel>
              {categories.map((category) => (
                <FormField
                  key={category.id}
                  control={form.control}
                  name="categories"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={category.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(category.id)}
                            onCheckedChange={(checked: boolean) => {
                              return checked
                                ? field.onChange([...field.value, category.id])
                                : field.onChange(
                                    field.value?.filter((value) => value !== category.id)
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{category.name}</FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
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
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Illustration</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  className="w-[300px]"
                  onChange={(event) => onChange(event.target.files && event.target.files[0])}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Ajouter la guilde</Button>
      </form>
    </FormProvider>
  )
}
