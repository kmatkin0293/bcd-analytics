import { createContext, useContext, useState } from 'react'

export type Tier = 'tier1' | 'tier2' | 'tier3'

export const TIER_LABELS: Record<Tier, string> = {
  tier1: 'View Only',
  tier2: 'Standard',
  tier3: 'Pro',
}

interface TierContextValue {
  tier: Tier
  setTier: (t: Tier) => void
  isSpotterPro: boolean   // tier3 only — AI features enabled
  isInteractive: boolean  // tier2 + tier3 — interactive features enabled
}

const TierContext = createContext<TierContextValue>({
  tier: 'tier3',
  setTier: () => {},
  isSpotterPro: true,
  isInteractive: true,
})

export function TierProvider({ children }: { children: React.ReactNode }) {
  const [tier, setTier] = useState<Tier>('tier3')
  return (
    <TierContext.Provider value={{
      tier,
      setTier,
      isSpotterPro:   tier === 'tier3',
      isInteractive:  tier === 'tier2' || tier === 'tier3',
    }}>
      {children}
    </TierContext.Provider>
  )
}

export function useTier() {
  return useContext(TierContext)
}
