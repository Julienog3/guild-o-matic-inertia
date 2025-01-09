import { PropsWithChildren } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { Link } from "@inertiajs/react";

interface Props extends PropsWithChildren {}

export default function AccountLayout(props: Props) {
  const { children } = props

  return (
    <main className="flex flex-col max-w-screen-xl w-full mx-auto my-8">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Mon compte</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="scroll-m-20 border-b border-stone-800 pb-2 text-3xl text-white font-semibold tracking-tight first:mt-0 mb-4">
        Mon compte
      </h2>
      <section className="flex w-full gap-8">
        <ul className="flex flex-col gap-2 w-56 border-r border-stone-800 pr-4">
          <li className="text-stone-400">
            <Link href="/account/profile">Mon profil</Link>
          </li>
          <li className="text-stone-400">
            <Link href="/account/guilds">Mes guildes</Link>
          </li>
        </ul>
        <section className="flex flex-col w-full">
          {children}
        </section>
      </section>
    </main>
  )
}