import { Head } from '@inertiajs/react'
import { GuildForm } from '../../components/guilds/guild_form'
import { InferPageProps } from '@adonisjs/inertia/types'
import GuildsController from '#controllers/guilds_controller'

export default function Create(props: InferPageProps<GuildsController, 'edit'>) {
  const { guild, categories } = props

  return (
    <>
      <Head title="Modification de guilde" />
      <main className="max-w-screen-md w-full mx-auto mb-12 mt-24">
        <h2 className="scroll-m-20 text-white pb-2 text-3xl font-semibold tracking-tight mt-6 mb-2 first:mt-0">
          Edition de la guilde "{guild.details.name}"
        </h2>
        <section className="flex flex-col w-full min-w-96 bg-stone-900 border border-stone-800 rounded-lg p-4">
          <GuildForm guild={guild} categories={categories} />
        </section>
      </main>
    </>
  )
}
