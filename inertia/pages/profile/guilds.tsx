import { InferPageProps } from '@adonisjs/inertia/types'
import UsersController from '#controllers/users_controller'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'
import { GuildsList } from '~/components/guilds/guilds_list'
import { Badge } from '~/components/ui/badge'
import { Head } from '@inertiajs/react'
import GuildsController from '#controllers/guilds_controller'

export default function Guilds(props: InferPageProps<GuildsController, 'index'>) {
  const { guilds } = props

  return (
    <>
      <Head title="Toutes les guildes" />
      <main className="max-w-screen-xl w-full mx-auto my-8 min-h-screen p-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Mes guildes</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h2 className="scroll-m-20 text-white border-b border-stone-800 pb-2 text-3xl font-semibold tracking-tight mt-6 first:mt-0">
          Mes guildes <Badge>{guilds.length}</Badge>
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-2 text-stone-500 mb-4">
          L'ensemble des guildes que vous avez ajouté.
        </p>
        <GuildsList guilds={guilds} />
      </main>
    </>
  )
}
