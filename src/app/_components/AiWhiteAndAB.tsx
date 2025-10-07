"use client"
import { useEffect } from "react"

export default function AiWhiteAndAB() {
  useEffect(() => {
    const isAI = typeof window !== "undefined" && location.pathname.startsWith("/svc/ai-")
    if (!isAI) return
    document.body.classList.add("ai-white-text")
    return () => { document.body.classList.remove("ai-white-text") }
  }, [])
  return null
}
