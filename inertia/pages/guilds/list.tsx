import { Head, Link } from '@inertiajs/react'
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
import { GuildsList } from '~/components/guilds/guilds_list'
import GuildsFilter from '~/components/guilds/guilds_filter'

export default function List(props: InferPageProps<GuildController, 'index'>) {
  const { guilds, categories } = props

  return (
    <>
      <Head title="Toutes les guildes" />
      <section className="flex flex-col p-4 items-center overflow-hidden w-full h-80 relative before:content-[''] before:w-full before:h-full before:block before:bg-gradient-to-t before:from-stone-950 before:to-transparent before:absolute before:top-0 before:left-0 before:z-10">
        <Breadcrumb className="relative z-10 md:max-w-screen-xl w-full md:mx-auto mt-16 text-white">
          <BreadcrumbList className="text-white">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/guilds">Toutes les guildes</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="max-w-screen-xl w-full mx-auto my-8 min-h-screen p-4 z-20">
          <h2 className="scroll-m-20 text-white pb-2 text-3xl font-semibold tracking-tight mt-6 mb-2">
            Toutes les guildes
          </h2>
          <GuildsFilter categories={categories} />
        </div>
        <img
          className="z-0 absolute top-0 left-0 object-cover h-full w-full opacity-50"
          src="/images/banner.jpg"
          alt="thumbnail"
        />
      </section>
      <main className="max-w-screen-xl w-full mx-auto my-8 min-h-screen px-4">
        <GuildsList guilds={guilds.data} />
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
    </>
  )
}
