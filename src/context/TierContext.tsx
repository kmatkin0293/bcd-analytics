import { createContext, useContext, useState } from 'react'

export type Tier = 'basic' | 'essentials' | 'pro'

export const TIER_LABELS: Record<Tier, string> = {
  basic:      'Basic',
  essentials: 'Essentials',
  pro:        'Pro',
}

interface TierContextValue {
  tier: Tier
  setTier: (t: Tier) => void
  isSpotterPro: boolean   // pro only — AI features
  isInteractive: boolean  // essentials + pro — interactive features (drill, filter, export…)
}

const TierContext = createContext<TierContextValue>({
  tier: 'pro',
  setTier: () => {},
  isSpotterPro: true,
  isInteractive: true,
})

export function TierProvider({ children }: { children: React.ReactNode }) {
  const [tier, setTier] = useState<Tier>('pro')
  return (
    <TierContext.Provider value={{
      tier,
      setTier,
      isSpotterPro:  tier === 'pro',
      isInteractive: tier === 'essentials' || tier === 'pro',
    }}>
      {children}
    </TierContext.Provider>
  )
}

export function useTier() {
  return useContext(TierContext)
}
