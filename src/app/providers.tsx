import type { PropsWithChildren } from 'react'

export function AppProviders({ children }: PropsWithChildren) {
  // TODO: Add global providers (auth/query/theme) here.
  return <>{children}</>
}
