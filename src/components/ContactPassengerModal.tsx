import { useState, useEffect, useRef } from 'react'

export interface PassengerContact {
  fullName: string
  email: string
  destination: string
  origin: string
  travelDate: string
  clientName: string
}

interface Props {
  passenger: PassengerContact
  onClose: () => void
}

export default function ContactPassengerModal({ passenger, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)

  const defaultSubject = passenger.destination
    ? `Your upcoming trip to ${passenger.destination}`
    : 'Regarding your travel booking'

  const tripLine = passenger.origin && passenger.destination
    ? `${passenger.origin} → ${passenger.destination}${passenger.travelDate ? ` on ${passenger.travelDate}` : ''}`
    : passenger.destination
    ? `to ${passenger.destination}${passenger.travelDate ? ` on ${passenger.travelDate}` : ''}`
    : ''

  const defaultBody = [
    `Dear ${passenger.fullName || 'Traveller'},`,
    '',
    tripLine ? `We are writing regarding your recent trip ${tripLine}.` : 'We are writing regarding your recent trip.',
    '',
    'We are sorry about the disruption to your service and we have booked you on the next available flight.',
    '',
    'Please do not hesitate to get in touch if you have any further questions or require additional assistance.',
    '',
    'Kind regards,',
    'BCD Travel',
  ].join('\n')

  const [to, setTo] = useState(passenger.email || '')
  const [subject, setSubject] = useState(defaultSubject)
  const [body, setBody] = useState(defaultBody)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
  }

  const handleSend = () => {
    const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailto, '_blank')
    onClose()
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid #DDE4E9',
    borderRadius: 8,
    padding: '9px 12px',
    fontSize: 13,
    color: '#0B0052',
    fontFamily: 'inherit',
    background: '#fff',
    outline: 'none',
    transition: 'border-color 0.15s',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.05em',
    color: '#8DA3B0',
    textTransform: 'uppercase',
    marginBottom: 6,
    display: 'block',
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        background: 'rgba(11, 0, 82, 0.45)',
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
          width: '100%',
          maxWidth: 560,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 24px',
          borderBottom: '1px solid #DDE4E9',
          flexShrink: 0,
        }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', color: '#8DA3B0', textTransform: 'uppercase', marginBottom: 4 }}>
              Contact Passenger
            </div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#0B0052', letterSpacing: '-0.02em' }}>
              {passenger.fullName || 'Passenger'}
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
            onMouseEnter={e => { e.currentTarget.style.background = '#DDE4E9' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#F1F4F6' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Compose form */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Trip info pill */}
          {(passenger.origin || passenger.destination || passenger.email) && (
            <div style={{
              display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center',
              background: '#F1F4F6', borderRadius: 8, padding: '10px 12px',
            }}>
              {passenger.origin && (
                <span style={{ fontSize: 12, color: '#2A3744', fontWeight: 500 }}>
                  ✈ {passenger.origin}
                </span>
              )}
              {passenger.origin && passenger.destination && (
                <span style={{ fontSize: 12, color: '#8DA3B0' }}>→</span>
              )}
              {passenger.destination && (
                <span style={{ fontSize: 12, color: '#0B0052', fontWeight: 600 }}>
                  {passenger.destination}
                </span>
              )}
              {passenger.travelDate && (
                <span style={{ fontSize: 12, color: '#8DA3B0' }}>
                  · {passenger.travelDate}
                </span>
              )}
              {passenger.email && (passenger.origin || passenger.destination) && (
                <span style={{ fontSize: 12, color: '#8DA3B0' }}>·</span>
              )}
              {passenger.email && (
                <span style={{ fontSize: 12, color: '#FC4C02', fontWeight: 500 }}>
                  {passenger.email}
                </span>
              )}
            </div>
          )}

          {/* To */}
          <div>
            <label style={labelStyle}>To</label>
            <input
              type="email"
              value={to}
              onChange={e => setTo(e.target.value)}
              placeholder="passenger@example.com"
              style={inputStyle}
              onFocus={e => { e.currentTarget.style.borderColor = '#0B0052' }}
              onBlur={e => { e.currentTarget.style.borderColor = '#DDE4E9' }}
            />
          </div>

          {/* Subject */}
          <div>
            <label style={labelStyle}>Subject</label>
            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              style={inputStyle}
              onFocus={e => { e.currentTarget.style.borderColor = '#0B0052' }}
              onBlur={e => { e.currentTarget.style.borderColor = '#DDE4E9' }}
            />
          </div>

          {/* Body */}
          <div>
            <label style={labelStyle}>Message</label>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={9}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
              onFocus={e => { e.currentTarget.style.borderColor = '#0B0052' }}
              onBlur={e => { e.currentTarget.style.borderColor = '#DDE4E9' }}
            />
          </div>
        </div>

        {/* Footer actions */}
        <div style={{
          display: 'flex', gap: 10, justifyContent: 'flex-end',
          padding: '16px 24px', borderTop: '1px solid #DDE4E9', flexShrink: 0,
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '9px 20px', borderRadius: 8, border: '1px solid #DDE4E9',
              background: '#F1F4F6', color: '#2A3744', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#DDE4E9' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#F1F4F6' }}
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            style={{
              padding: '9px 22px', borderRadius: 8, border: 'none',
              background: '#0B0052', color: '#fff', fontSize: 13, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit', transition: 'opacity 0.15s',
              display: 'flex', alignItems: 'center', gap: 7,
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            Open in Email Client
          </button>
        </div>
      </div>
    </div>
  )
}
