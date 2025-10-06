"use client";
import { useEffect } from "react";

function getFab(): HTMLElement | null {
  const sels = [
    "[data-ai-fab]",
    '[data-testid="ai-fab"]',
    "#ai-fab",
    ".ai-fab",
    'button[aria-label*="assistant" i]',
    'button[title*="assistant" i]',
    'button[aria-label*="pulse" i]',
    'button[title*="pulse" i]',
    'a[aria-label*="assistant" i]',
    'a[title*="assistant" i]',
  ];
  for (const s of sels) {
    const el = document.querySelector<HTMLElement>(s);
    if (el) return el;
  }
  const cands = Array.from(
    document.querySelectorAll<HTMLElement>('button,a,div[role="button"]'),
  ).filter((el) => {
    const st = window.getComputedStyle(el);
    if (!(st.position === "fixed" || st.position === "sticky")) return false;
    const r = el.getBoundingClientRect();
    const vw = window.innerWidth,
      vh = window.innerHeight;
    const nearBottom = r.bottom > vh * 0.7;
    const nearRight = r.right > vw * 0.6;
    const size = Math.max(r.width, r.height);
    const rounded =
      st.borderRadius &&
      parseFloat(st.borderRadius) >= Math.min(r.width, r.height) * 0.4;
    return nearBottom && nearRight && size >= 40 && size <= 160 && rounded;
  });
  return cands[0] || null;
}

export default function AiButtonBinder() {
  useEffect(() => {
    const wire = () => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>(
          'a,button,[role="link"],[role="button"]',
        ),
      );
      nodes.forEach((el) => {
        const txt = (el.innerText || el.textContent || "")
          .replace(/\s+/g, " ")
          .trim();
        if (/^Ask Pulse AI$/i.test(txt)) {
          el.innerHTML = "AI Health Assistant";
          el.addEventListener(
            "click",
            (e) => {
              e.preventDefault();
              const fab = getFab();
              if (fab) (fab as HTMLElement).click();
              else window.location.href = "/member/health-assistant";
            },
            { once: false },
          );
        }
        if (/^Explore Service$/i.test(txt)) {
          (el as HTMLElement).style.display = "none";
        }
      });
    };
    wire();
    const mo = new MutationObserver(() => wire());
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);
  return null;
}
