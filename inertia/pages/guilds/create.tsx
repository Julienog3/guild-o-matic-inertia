import { useForm, usePage } from '@inertiajs/react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'
import { GuildForm } from '../../components/guilds/guild_form'

interface Props {
  guilds: any[]
  categories: any[]
}

export default function Create(props: Props) {
  const { guilds, categories } = props
  const {
    props: { user },
  } = usePage()

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
      <h2 className="scroll-m-20 border-b border-stone-800 pb-2 text-3xl text-white font-semibold tracking-tight first:mt-0 mb-4">
        Ajout d'une guilde
      </h2>
      <GuildForm guilds={guilds} categories={categories} />
    </main>
  )
}
