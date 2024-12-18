import { Link } from '@inertiajs/react'
import { GuildCard } from './guild_card'

interface Props {
  guilds: any[]
}

export function GuildsList(props: Props) {
  const { guilds } = props
  console.log({ guilds })

  return (
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
  )
}
