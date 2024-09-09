import { useForm, usePage } from '@inertiajs/react'
import { FormEventHandler } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { GuildForm } from './forms/guild_form'

interface Props {
  guilds: any[]
}

export default function Create(props: Props) {
  const { guilds } = props
  const {
    props: { user },
  } = usePage()

  const submit: FormEventHandler<HTMLFormElement> = (e) => {}

  return (
    <main className="max-w-screen-xl w-full mx-auto my-8">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Ajout d'une guilde</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mb-4 border-b pb-2">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 ">
          Ajout d'une guilde
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-4">Salut à tous.</p>
      </div>
      <GuildForm guilds={guilds} />
    </main>
  )
}
