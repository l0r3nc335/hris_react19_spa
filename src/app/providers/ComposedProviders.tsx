import type { ReactNode } from 'react'

type ProviderComponent = React.FC<{ children: ReactNode }>

export function ComposedProviders(
  ...providers: ProviderComponent[]
): ProviderComponent {
  return function composedProviders({ children }: { children: ReactNode }): React.JSX.Element {
    return providers.reduceRight<ReactNode>(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children,
    ) as React.JSX.Element
  }
}
