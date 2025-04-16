import { Head } from '@inertiajs/react'
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
  guild: any
  categories: any[]
}

export default function Create(props: Props) {
  const { guild, categories } = props

  return (
    <>
      <Head title="Modification de guilde" />
      <main className="max-w-screen-md w-full mx-auto mb-12 mt-24">
        <h2 className="scroll-m-20 text-white pb-2 text-3xl font-semibold tracking-tight mt-6 mb-2 first:mt-0">
          Modification d'une guilde
        </h2>
        <section className="flex flex-col w-full min-w-96 bg-stone-900 border border-stone-800 rounded-lg p-4">
          <GuildForm guild={guild} categories={categories} />
        </section>
      </main>
    </>
  )
}
