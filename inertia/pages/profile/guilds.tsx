import { InferPageProps } from '@adonisjs/inertia/types'
import { GuildsList } from '~/components/guilds/guilds_list'
import { Head } from '@inertiajs/react'
import GuildsController from '#controllers/guilds_controller'
import AccountLayout from '~/components/account/account_layout'

export default function Guilds(props: InferPageProps<GuildsController, 'index'>) {
  const { guilds } = props

  return (
    <>
      <Head title="Mes guildes" />
      <AccountLayout>
        <h3 className="text-2xl font-semibold tracking-tight text-white">Mes guildes</h3>
        <p className="leading-7 text-stone-400 mb-4">Retrouvez l'ensemble des guildes que vous avez ajouté.</p>
        <GuildsList guilds={guilds} />
      </AccountLayout>
    </>
  )
}
