import { Button } from "../ui/button";
import { Link, router } from "@inertiajs/react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert_dialog";
import { useToast } from "../ui/use-toast";
import ArrowUpCircleIcon from '~/assets/icons/arrow-up-circle.svg?react'
import UserGroupIcon from '~/assets/icons/user-group.svg?react'
import { SquarePen, Trash } from "lucide-react";

interface Props {
  guild: any
  displayActions?: boolean
}

export default function GuildDetails(props: Props) {
  const { guild, displayActions } = props
  const { toast } = useToast()

  function deleteGuild() {
    router.delete(`/guilds/${guild.id}`, {
      preserveScroll: true,
      onSuccess: () => {
        toast({
          title: 'Suppression',
          description: 'Votre guilde a correctement été supprimé.',
        })
      },
      onError: (errors) => {
        toast({
          title: 'Oopsi',
          description: `Problème survenu ${JSON.stringify(errors)}`,
        })
      },
    })
  }

  return (
    <aside className="flex flex-col w-full min-w-96 md:w-fit bg-stone-900 border border-stone-800 rounded">
      <div className="flex flex-col p-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2 text-white">
          Informations en jeu
        </h3>
        <ul className="flex flex-col mb-2">
          <li className="flex gap-4 items-center">
            <div className="p-2 bg-stone-950 border border-stone-900 rounded w-fit">
              <ArrowUpCircleIcon className="stroke-stone-500" />
            </div>
            <div className="flex flex-col">
              <p className="text-stone-500 whitespace-nowrap">Niveau de la guilde</p>
              <span className="text-white font-medium">{guild.details.level}</span>
            </div>
          </li>
          <li className="flex gap-4 items-center">
            <div className="p-2 bg-stone-950 border border-stone-900 rounded w-fit">
              <UserGroupIcon className="stroke-stone-500" />
            </div>
            <div className="flex flex-col">
              <p className="text-stone-500">Effectif</p>
              <span className="text-white font-medium">
                {guild.details.member_count}/{guild.details.member_capacity}
              </span>
            </div>
          </li>
        </ul>
        <p className="text-stone-400 font-semibold">
          Créé par <span className="text-indigo-500">@{guild.owner.username}</span>
        </p>
      </div>
      {displayActions && <div className="flex gap-2 items-center border-t border-stone-800 p-4">
        <Button className="w-full" asChild>
          <Link href={`/guilds/${guild.id}/edit`}><SquarePen /> Modifier</Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive"><Trash/> Supprimer</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Êtes-vous sûr de vouloir supprimer cette guilde ?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and
                remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={deleteGuild}>Supprimer</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>}
    </aside>
  )
}