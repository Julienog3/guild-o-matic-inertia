import { PropsWithChildren } from 'react'
import { Header } from './header'
import { Toaster } from '../ui/toaster'
import { TooltipProvider } from '../ui/tooltip'
import { Footer } from './footer'

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <TooltipProvider>
        {children}
        </TooltipProvider>
      <Toaster />
      <Footer />
    </>
  )
}
