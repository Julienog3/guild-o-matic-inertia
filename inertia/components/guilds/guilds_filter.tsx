import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Switch } from "../ui/switch"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { router } from "@inertiajs/react"

interface Props {
  categories: any[]
}

const formSchema = z.object({
  isRecruiting: z.boolean().optional(),
  categories: z.number().array().optional(),
  name: z.string().optional()
})

export default function GuildsFilter(props: Props) {
  const { categories } = props

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isRecruiting: false,
      categories: [],
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const url = new URL('guilds', 'http://localhost:3333')

    if (values.isRecruiting) {
      url.searchParams.set('is_recruiting', new Boolean(values.isRecruiting).toString())
    }
    
    if (values.categories && values.categories.length >= 1) {
      values.categories.forEach(category => {
        console.log({ category })
        url.searchParams.append('categories', category.toString())
      });
    }
    
    router.visit(url, {
      preserveScroll: true,
      queryStringArrayFormat: 'brackets',
      only: ['guilds']
    })
  }

  return (
    <section className="rounded-lg border border-stone-800 bg-stone-900 text-slate-95 p-4 mb-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4 items-end">
          <FormField 
            name="isRecruiting"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ouvert au recrutement</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categories"
            render={() => (
              <FormItem>
                <FormLabel>Catégories</FormLabel>
                <div className="flex gap-4">
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
                </div>
              </FormItem>
            )}
          />
          <Button className="ml-auto" type="submit">Filtrer</Button>
        </form>
      </Form>
    </section>
  )
} 