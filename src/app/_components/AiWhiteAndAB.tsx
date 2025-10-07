"use client"
import { useEffect } from "react"

export default function AiWhiteAndAB() {
  useEffect(() => {
    const isAI = typeof window !== "undefined" && location.pathname.startsWith("/svc/ai-")
    if (!isAI) return

    // Принудительно делаем белый текст для всей страницы
    document.body.classList.add("ai-white-text")

    // Находим две пустые «пилюли» после весов и добавляем A / B
    const pills = document.querySelectorAll<HTMLDivElement>(".scale-pill")
    const labels = ["A", "B"]
    pills.forEach((el, i) => {
      if (!el) return
      const text = (el.textContent || "").trim()
      if (!text) {
        const span = document.createElement("span")
        span.textContent = labels[i]
        span.style.position = "absolute"
        span.style.inset = "0"
        span.style.display = "flex"
        span.style.alignItems = "center"
        span.style.justifyContent = "center"
        span.style.fontWeight = "700"
        span.style.fontSize = "0.9rem"
        span.style.color = "white"
        span.style.pointerEvents = "none"
        const cs = getComputedStyle(el)
        if (cs.position === "static") (el as HTMLElement).style.position = "relative"
        el.appendChild(span)
      }
    })

    return () => document.body.classList.remove("ai-white-text")
  }, [])

  return null
}
