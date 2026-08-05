import { useState, useRef } from 'react'
import { useSpotterAgent, SpotterMessage } from '@thoughtspot/visual-embed-sdk/react'

const WORKSHEET_ID = '83774852-f400-4fdc-94b3-a6be4804c201'
const USER_NAME = 'Katie'

const SUGGESTIONS = [
  'What is my NDC breakdown?',
  'Show me all travelers going to China in the next 7 days',
  'Show my top 6 hotel cities with the top hotel in each city',
  'What are my top car suppliers by spend YTD?',
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Msg =
  | { role: 'user'; text: string }
  | { role: 'bot'; spotterMsg: any }
  | { role: 'bot-text'; text: string }

const DotsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="3"   r="2"   fill="#F46522" />
    <circle cx="16.5" cy="5"   r="1.8" fill="#F4852A" />
    <circle cx="19" cy="11"  r="1.8" fill="#E040A0" />
    <circle cx="16.5" cy="17"  r="1.8" fill="#9C3DD4" />
    <circle cx="11" cy="19"  r="2"   fill="#6B3FC0" />
    <circle cx="5.5" cy="17"  r="1.8" fill="#4A6FE8" />
    <circle cx="3"  cy="11"  r="1.8" fill="#38B2E8" />
    <circle cx="5.5" cy="5"   r="1.8" fill="#F4A020" />
  </svg>
)

const MicIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="2" width="6" height="11" rx="3"/>
    <path d="M5 10a7 7 0 0 0 14 0"/>
    <line x1="12" y1="19" x2="12" y2="22"/>
    <line x1="9" y1="22" x2="15" y2="22"/>
  </svg>
)

export default function AIAssistantWidget() {
  const [open, setOpen]       = useState(false)
  const [input, setInput]     = useState('')
  const [msgs, setMsgs]       = useState<Msg[]>([])
  const [loading, setLoading] = useState(false)
  const bodyRef               = useRef<HTMLDivElement>(null)

  const { sendMessage } = useSpotterAgent({ worksheetId: WORKSHEET_ID })

  const hasConversation = msgs.length > 0

  const scrollToBottom = () => {
    setTimeout(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }, 80)
  }

  const send = async (query?: string) => {
    const q = (query ?? input).trim()
    if (!q || loading) return
    setInput('')
    setMsgs(prev => [...prev, { role: 'user', text: q }])
    setLoading(true)
    scrollToBottom()
    try {
      const res = await sendMessage(q)
      setMsgs(prev => [...prev, { role: 'bot', spotterMsg: res.message }])
    } catch {
      setMsgs(prev => [...prev, { role: 'bot-text', text: 'Something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
      scrollToBottom()
    }
  }

  const reset = () => setMsgs([])

  return (
    <>
      {open && (
        <div className="ai-panel">
          {/* ── Header ── */}
          <div className="panel-head">
            <div className="panel-title">
              <DotsIcon />
              <span>AI Analyst</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {/* New conversation */}
              <button
                className="panel-head-btn"
                onClick={reset}
                disabled={!hasConversation}
                title="New conversation"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </button>
              {/* Close */}
              <button className="panel-head-btn" onClick={() => setOpen(false)} title="Close">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
                <span style={{ fontSize: 12, fontWeight: 500 }}>Close</span>
              </button>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="panel-body" ref={bodyRef}>
            {!hasConversation && (
              <div className="panel-welcome">
                <p className="panel-greeting">Hi {USER_NAME},</p>
                <p className="panel-subtitle">
                  Ask me anything about your travel programme, spend or travellers.
                </p>
                <div className="panel-chips">
                  {SUGGESTIONS.map((s, i) => (
                    <button key={i} className="panel-chip" onClick={() => send(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {msgs.map((m, i) => {
              if (m.role === 'user') {
                return <div key={i} className="msg-user">{m.text}</div>
              }
              if (m.role === 'bot') {
                return (
                  <div key={i} className="msg-bot">
                    <SpotterMessage message={m.spotterMsg} style={{ height: '260px' }} />
                  </div>
                )
              }
              return <div key={i} className="msg-bot"><div className="msg-bot-text">{m.text}</div></div>
            })}

            {loading && (
              <div className="typing"><span /><span /><span /></div>
            )}
          </div>

          {/* ── Input ── */}
          <div className="panel-input">
            <input
              className="input-box"
              type="text"
              value={input}
              placeholder="Enter a prompt for AI Analyst"
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') { e.preventDefault(); send() }
              }}
            />
            <button
              className="send-btn"
              onClick={() => input.trim() ? send() : undefined}
              title={input.trim() ? 'Send' : 'Voice input'}
            >
              {input.trim()
                ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                : <MicIcon />
              }
            </button>
          </div>
        </div>
      )}

      {/* ── FAB ── */}
      <button className={`fab${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)} title="AI Analyst">
        <DotsIcon />
      </button>
    </>
  )
}
