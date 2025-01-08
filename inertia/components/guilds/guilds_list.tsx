import { Link } from '@inertiajs/react'
import { GuildCard } from './guild_card'

interface Props {
  guilds: any[]
}

export function GuildsList(props: Props) {
  const { guilds } = props
  console.log({ guilds })

  return (
    <section className='flex justify-center min-h-96'>
      {guilds.length >= 1 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
          {guilds.map((guild) => (
            <li key={guild.id}>
              <Link href={`/guilds/${guild.id}`}>
                <GuildCard guild={guild} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-stone-400'>Aucune guilde n'a été trouvé.</p>
      )}
    </section>
  )
}
