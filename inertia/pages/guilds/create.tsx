import { Head, usePage } from '@inertiajs/react'
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
    <>
      <Head title="Ajout de guilde" />
      <main className="max-w-screen-md w-full mx-auto mb-12 mt-24">
        <h2 className="scroll-m-20 text-white pb-2 text-3xl font-semibold tracking-tight mt-6 mb-2 first:mt-0">
          Ajout d'une guilde
        </h2>
        <section className="flex flex-col w-full min-w-96 bg-stone-900 border border-stone-800 rounded-lg p-4">
          <GuildForm guilds={guilds} categories={categories} />
        </section>
      </main>
    </>
  )
}
