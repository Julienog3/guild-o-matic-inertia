import GuildsController from '#controllers/guilds_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Badge } from '~/components/ui/badge'
import CalendarIcon from '~/assets/icons/calendar.svg?react'
import ClockIcon from '~/assets/icons/clock.svg?react'
import ArrowUpCircleIcon from '~/assets/icons/arrow-up-circle.svg?react'
import UserGroupIcon from '~/assets/icons/user-group.svg?react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'
import { Head } from '@inertiajs/react'

export default function Show(props: InferPageProps<GuildsController, 'show'>) {
  const { guild, guildDetails } = props

  return (
    <>
      <Head title={guildDetails.name} />
      <section className="flex flex-col p-4 items-center overflow-hidden w-full h-80 border-b border-stone-900 relative before:content-[''] before:w-full before:h-full before:block before:bg-gradient-to-t before:from-black/70 before:absolute before:top-0 before:left-0 before:z-10">
        <Breadcrumb className="relative z-10 md:max-w-screen-xl w-full md:mx-auto mt-8 text-white">
          <BreadcrumbList className="text-white">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/guilds">Guildes</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-slate-300">{guildDetails.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="relative z-10 flex flex-col gap-4 items-center md:items-start max-w-screen-xl w-full h-max mx-auto mt-auto mb-12">
          <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-white text-center">
            [{guildDetails.tag}] {guildDetails.name}
          </h2>
          <ul className="flex md:flex-row flex-col gap-4 items-center">
            <li>
              <div
                className={`flex gap-2 items-center px-3 py-1 backdrop-blur-xl border  rounded-full text-white ${guild.isRecruiting ? 'bg-green-500/50 border-green-500' : 'bg-red-500/50 border-red-500'}`}
              >
                <span
                  className={`w-2 h-2 ${guild.isRecruiting ? 'bg-green-500' : 'bg-red-500'} rounded-full`}
                />
                {guild.isRecruiting ? 'Ouvert' : 'Fermé'}
              </div>
            </li>
            <li className="flex gap-2">
              <CalendarIcon className="stroke-stone-500" />
              <p className="text-stone-500 font-medium flex gap-2">
                Publié le
                <span className="text-white">{new Date(guild.createdAt).toLocaleDateString()}</span>
              </p>
            </li>
            <li className="flex gap-2">
              <ClockIcon className="stroke-stone-500" />
              <p className="text-stone-500 font-medium flex gap-2">
                Mis à jour le
                <span className="text-white">{new Date(guild.updatedAt).toLocaleDateString()}</span>
              </p>
            </li>
          </ul>
        </div>
        <img
          className="z-0 absolute top-0 left-0 object-cover h-full w-full"
          src={guild.thumbnail}
          alt="thumbnail"
        />
      </section>
      <main className="flex md:flex-row flex-col-reverse items-start max-w-screen-xl w-full mx-auto xl:px-0 p-4  md:min-h-96 gap-8">
        <section className="flex flex-col gap-4 w-full">
          <div className="flex flex-col">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-white mb-2">
              Description
            </h3>
            <p className="text-stone-500">{guild.description}</p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold mb-2">Types d'activités proposés</h3>
            <div className="flex gap-2">
              {guild.categories.map((category) => (
                <Badge key={category.id} variant="default">
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        </section>
        <aside className="flex flex-col w-full md:w-fit bg-stone-900 border border-stone-800 p-4 rounded">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2 text-white">
            Informations générales
          </h3>
          <ul className="flex flex-col md:flex-row gap-2 md:gap-4">
            <li className="flex gap-4 items-center">
              <div className="p-2 bg-stone-950 border border-stone-900 rounded w-fit">
                <ArrowUpCircleIcon className="stroke-stone-500" />
              </div>
              <div className="flex flex-col">
                <p className="text-stone-500 whitespace-nowrap">Niveau de la guilde</p>
                <span className="text-white font-medium">{guildDetails.level}</span>
              </div>
            </li>
            <li className="flex gap-4 items-center">
              <div className="p-2 bg-stone-950 border border-stone-900 rounded w-fit">
                <UserGroupIcon className="stroke-stone-500" />
              </div>
              <div className="flex flex-col">
                <p className="text-stone-500">Effectif</p>
                <span className="text-white font-medium">
                  {guildDetails.member_count}/{guildDetails.member_capacity}
                </span>
              </div>
            </li>
          </ul>
          <p>
            Créé par <span className="text-stone-700">@{guild.owner.username}</span>
          </p>
        </aside>
      </main>
    </>
  )
}
