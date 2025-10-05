"use client";
import { useState } from "react";

type Props = {
  onOpen?: () => void;
  className?: string;
};

export default function PulseLauncher({ onOpen, className }: Props) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    onOpen?.();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg border border-neutral-200 " +
        "bg-white hover:bg-neutral-50 transition " + (className ?? "")
      }
      aria-label="Open assistant"
    >
      {/* простой «пульс» без внешних зависимостей */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "9999px",
          boxShadow: open ? "0 0 0 10px rgba(59,130,246,0.25)" : "none",
          transition: "box-shadow 300ms ease",
          pointerEvents: "none"
        }}
      />
      <span style={{ fontSize: 20 }}>💬</span>
    </button>
  );
}
