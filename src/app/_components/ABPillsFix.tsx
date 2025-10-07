"use client";
import { useEffect } from "react";

export default function ABPillsFix() {
  useEffect(() => {
    const run = () => {
      const scaleIcon = document.querySelector('svg[data-lucide="scale"], svg.lucide-scale');
      if (!scaleIcon) return;
      const container = scaleIcon.closest("div") || document.body;

      const pills = Array.from(
        container.querySelectorAll<HTMLElement>("div,span")
      ).filter((el) => {
        const cls = el.className || "";
        const looksLikePill =
          /rounded-(full|\[9999px\])/.test(cls) &&
          (/w-|h-/.test(cls) || /\bw-\[|\bh-\[/.test(cls));
        const empty = (el.textContent || "").trim().length === 0;
        return looksLikePill && empty;
      }).slice(0, 2);

      const labels = ["A", "B"];
      pills.forEach((el, i) => {
        if (!el.querySelector("[data-ab-label]")) {
          if (getComputedStyle(el).position === "static") el.style.position = "relative";
          const span = document.createElement("span");
          span.dataset.abLabel = "1";
          span.className = "ai-pill-label";
          span.textContent = labels[i];
          span.style.position = "absolute";
          span.style.inset = "0";
          span.style.display = "flex";
          span.style.alignItems = "center";
          span.style.justifyContent = "center";
          el.appendChild(span);
        }
      });
    };
    run();
    const mo = new MutationObserver(run);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);

  return null;
}
