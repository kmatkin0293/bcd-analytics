import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SpotterEmbed, EmbedEvent, HostEvent } from '@thoughtspot/visual-embed-sdk'

const WORKSHEET_ID = '83774852-f400-4fdc-94b3-a6be4804c201'

export default function AIAssistantPage() {
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') ?? ''
  const embedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!embedRef.current) return

    const embed = new SpotterEmbed(embedRef.current, {
      frameParams: { width: '100%', height: '100%' },
      worksheetId: WORKSHEET_ID,
      updatedSpotterChatPrompt: true,
      hideSourceSelection: true,
    })

    if (initialQuery) {
      embed.on(EmbedEvent.SpotterLoadComplete, () => {
        embed.trigger(HostEvent.SpotterSearch, {
          query: initialQuery,
          executeSearch: true,
        })
      })
    }

    embed.render()

    return () => { embed.destroy() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="ai-page">
      <div className="page-header">
        <h1>AI Analyst</h1>
        <p>Ask natural language questions about travel spend, card charges, and program performance for instant AI-powered insights</p>
      </div>
      <div className="ai-embed-area">
        <div className="embed-shell" ref={embedRef} />
      </div>
    </div>
  )
}
