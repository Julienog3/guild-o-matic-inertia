import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar'
import { GW2Guild } from '../../../app/types/gw2'
import { Badge } from '../ui/badge'

interface Props {
  guild: GW2Guild
}

export function GuildCard(props: Props) {
  const { guild } = props

  console.log({ guild })

  return (
    <Card className="overflow-hidden relative">
      <Badge className="absolute top-4 right-4">{guild.isRecruiting ? 'Ouvert' : 'Fermé'}</Badge>
      <img className="max-h-40 w-full object-cover" src={guild.thumbnail} alt="thumbnail" />
      <CardContent className="flex flex-col gap-2 p-4">
        <div className="flex gap-2">
          {guild.categories.map((category) => (
            <Badge key={category.id} variant="secondary">
              {category.name}
            </Badge>
          ))}
        </div>
        <CardTitle>
          [{guild.details.tag}] {guild.details.name}
        </CardTitle>
        <CardDescription className="mb-2">{guild.excerpt}</CardDescription>
        <div className="flex items-center gap-2">
          <p className="text-sm">Crée par @{guild.owner.username}</p>
        </div>
      </CardContent>
    </Card>
  )
}
