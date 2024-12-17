import { PropsWithChildren } from 'react'
import { Header } from './header'
import { Toaster } from '../ui/toaster'
import { TooltipProvider } from '../ui/tooltip'
import { Footer } from './footer'

export function Layout({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen w-full bg-stone-950">
      <Header />
      <TooltipProvider>{children}</TooltipProvider>
      <Toaster />
      <Footer />
    </main>
  )
}
