"use client"
import React from "react"
type Props = { className?: string; onOpen?: () => void }
export default function PulseLauncher({ className, onOpen }: Props) {
  const handle = React.useCallback(() => { try { onOpen?.() } catch {} }, [onOpen])
  return (
    <button type="button" onClick={handle} className={className??"rounded-xl px-4 py-2 border"} aria-label="Open AI Assistant">
      Ask Pulse AI
    </button>
  )
}
