import { createContext, useContext, useState } from 'react'

export type Tier = 'basic' | 'premium' | 'enterprise'

export const TIER_LABELS: Record<Tier, string> = {
  basic:      'Basic',
  premium:    'Premium',
  enterprise: 'Enterprise',
}

interface TierContextValue {
  tier: Tier
  setTier: (t: Tier) => void
  hasMCP: boolean          // premium + enterprise — MCP tool responses in BCD AI
  hasChatHistory: boolean  // enterprise only — past conversations sidebar
  hasAnalysts: boolean     // enterprise only — analysts section in sidebar
}

const TierContext = createContext<TierContextValue>({
  tier: 'enterprise',
  setTier: () => {},
  hasMCP: true,
  hasChatHistory: true,
  hasAnalysts: true,
})

export function TierProvider({ children }: { children: React.ReactNode }) {
  const [tier, setTier] = useState<Tier>('enterprise')
  return (
    <TierContext.Provider value={{
      tier,
      setTier,
      hasMCP:         tier === 'premium' || tier === 'enterprise',
      hasChatHistory: tier === 'enterprise',
      hasAnalysts:    tier === 'enterprise',
    }}>
      {children}
    </TierContext.Provider>
  )
}

export function useTier() {
  return useContext(TierContext)
}
