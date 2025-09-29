"use client";
import { useEffect } from "react";

function removeBacks() {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>('a,button,[role="link"],[role="button"]'));
  nodes.forEach((el) => {
    const text = (el.innerText || el.textContent || "").replace(/\s+/g," ").trim();
    const aria = (el.getAttribute("aria-label") || "").trim();
    const isBack = /^(?:‹\s*)?Back$/i.test(text) || /^(?:‹\s*)?Back$/i.test(aria);
    if (isBack) el.remove();
  });
}

export default function HideBack() {
  useEffect(() => {
    removeBacks();
    const mo = new MutationObserver(() => removeBacks());
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);
  return null;
}
