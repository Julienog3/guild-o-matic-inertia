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
      <div className="mb-4 border-b pb-2">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 ">
          Ajout d'une guilde
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-4">Salut à tous.</p>
      </div>
      <GuildForm guilds={guilds} categories={categories} />
    </main>
  )
}
