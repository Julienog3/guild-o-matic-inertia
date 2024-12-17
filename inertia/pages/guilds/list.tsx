import { Link } from '@inertiajs/react'
import { GuildCard } from '~/components/guilds/guild_card'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '~/components/ui/pagination'
import type { InferPageProps } from '@adonisjs/inertia/types'
import type GuildController from '#controllers/guilds_controller'

export default function List(props: InferPageProps<GuildController, 'index'>) {
  const { guilds } = props
  console.log(props)

  return (
    <main className="max-w-screen-xl w-full mx-auto my-8 min-h-screen p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Toutes les guildes</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="scroll-m-20 text-white border-b border-stone-800 pb-2 text-3xl font-semibold tracking-tight mt-6 first:mt-0">
        Toutes les guildes
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-2">
        Trouvez la guilde qui vous convient parmi la liste
      </p>
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
        {guilds.length >= 1 ? (
          guilds.map((guild) => (
            <li>
              <Link href={`/guilds/${guild.id}`}>
                <GuildCard guild={guild} />
              </Link>
            </li>
          ))
        ) : (
          <p>Pas de guildes</p>
        )}
      </ul>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  )
}
