import { Head } from '@inertiajs/react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'
import { GuildForm } from './forms/guild_form'

interface Props {
  guild: any
  categories: any[]
}

export default function Create(props: Props) {
  const { guild, categories } = props

  return (
    <>
      <Head title="Modification de guilde" />
      <main className="max-w-screen-xl w-full mx-auto my-8">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Modification d'une guilde</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h2 className="scroll-m-20 text-white border-b border-stone-800 pb-2 text-3xl font-semibold tracking-tight mt-6 first:mt-0">
          Modification d'une guilde
        </h2>
        <GuildForm guild={guild} categories={categories} />
      </main>
    </>
  )
}
