import type { Tier } from './context/TierContext'
import { Action } from '@thoughtspot/visual-embed-sdk'

// All tiers now get full analytics access — no actions are hidden based on tier.
// BCD AI (Spotter) feature differentiation is handled in EmbedPages via SpotterEmbed props.
export function hiddenActionsForTier(_tier: Tier): Action[] {
  return []
}
