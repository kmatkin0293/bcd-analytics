import { useState, useEffect, useRef } from 'react'
import {
  LiveboardEmbed,
  useEmbedRef,
} from '@thoughtspot/visual-embed-sdk/react'
import {
  RuntimeFilterOp,
  CustomActionsPosition,
  CustomActionTarget,
} from '@thoughtspot/visual-embed-sdk'
import ContactPassengerModal, { type PassengerContact } from './ContactPassengerModal'

const PASSENGER_DETAILS_LIVEBOARD = '4917b101-0d86-40e1-863c-1a82a0cdcb6a'

const CONTACT_ACTION = {
  id: 'contact-passenger',
  name: 'Contact Passenger',
  position: CustomActionsPosition.CONTEXTMENU,
  target: CustomActionTarget.VIZ,
} as const

function formatTravelDate(raw: any): string {
  if (!raw) return ''
  const num = Number(raw)
  if (!isNaN(num) && num > 1_000_000_000) {
    return new Date(num * 1000).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric',
    })
  }
  return String(raw)
}

function extractPassengerFromPayload(payload: any): PassengerContact {
  const clickedPoint =
    payload?.data?.contextMenuPoints?.clickedPoint ??
    payload?.contextMenuPoints?.clickedPoint

  const allAttrs: any[] = [
    ...(clickedPoint?.selectedAttributes ?? []),
    ...(clickedPoint?.deselectedAttributes ?? []),
  ]

  const find = (name: string) =>
    allAttrs.find((a: any) =>
      typeof a?.column?.name === 'string' &&
      a.column.name.toLowerCase() === name.toLowerCase()
    )?.value ?? ''

  return {
    fullName:    find('Full Name'),
    email:       find('Traveler Email Address'),
    destination: find('Destination City'),
    origin:      find('Origin City'),
    travelDate:  formatTravelDate(find('Day(Travel Date Key)')),
    clientName:  find('Client Name (Traveler)'),
  }
}

interface Props {
  country: string
  columnName: string
  onClose: () => void
}

export default function PassengerDetailsModal({ country, columnName, onClose }: Props) {
  const embedRef = useEmbedRef<typeof LiveboardEmbed>()
  const overlayRef = useRef<HTMLDivElement>(null)
  const [contactPassenger, setContactPassenger] = useState<PassengerContact | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
  }

  const handleCustomAction = (payload: any) => {
    const id = payload?.id ?? payload?.data?.id
    if (id !== CONTACT_ACTION.id) return
    const passenger = extractPassengerFromPayload(payload)
    setContactPassenger(passenger)
  }

  return (
    <>
      <div
        ref={overlayRef}
        onClick={handleOverlayClick}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          background: 'rgba(11, 0, 82, 0.55)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 24px 80px rgba(11,0,82,0.22)',
            width: '92vw',
            maxWidth: 1200,
            height: '88vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '18px 24px',
              borderBottom: '1px solid #DDE4E9',
              flexShrink: 0,
            }}
          >
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', color: '#8DA3B0', textTransform: 'uppercase', marginBottom: 4 }}>
                Passenger Details
              </div>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#0B0052', letterSpacing: '-0.02em' }}>
                {country}
              </h2>
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                width: 36, height: 36, borderRadius: 8, border: '1px solid #DDE4E9',
                background: '#F1F4F6', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center', color: '#2A3744',
                flexShrink: 0, transition: 'background 0.15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#DDE4E9' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#F1F4F6' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Embed area */}
          <div style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
            <LiveboardEmbed
              ref={embedRef}
              liveboardId={PASSENGER_DETAILS_LIVEBOARD}
              runtimeFilters={[
                { columnName, operator: RuntimeFilterOp.EQ, values: [country] },
              ]}
              frameParams={{ width: '100%', height: 'calc(88vh - 80px)' }}
              fullHeight={false}
              preventLiveboardFilterRemoval={true}
              customActions={[CONTACT_ACTION]}
              onCustomAction={handleCustomAction}
            />
          </div>
        </div>
      </div>

      {contactPassenger && (
        <ContactPassengerModal
          passenger={contactPassenger}
          onClose={() => setContactPassenger(null)}
        />
      )}
    </>
  )
}
