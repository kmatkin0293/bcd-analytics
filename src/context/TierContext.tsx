import { createContext, useContext, useState } from 'react'

export type Tier = 'essentials' | 'pro'

interface TierContextValue {
  tier: Tier
  setTier: (t: Tier) => void
  isSpotterPro: boolean
}

const TierContext = createContext<TierContextValue>({
  tier: 'pro',
  setTier: () => {},
  isSpotterPro: true,
})

export function TierProvider({ children }: { children: React.ReactNode }) {
  const [tier, setTier] = useState<Tier>('pro')
  return (
    <TierContext.Provider value={{ tier, setTier, isSpotterPro: tier === 'pro' }}>
      {children}
    </TierContext.Provider>
  )
}

export function useTier() {
  return useContext(TierContext)
}
