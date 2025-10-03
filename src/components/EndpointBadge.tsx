"use client";

import * as React from "react";

type Props = {
  path: string;
  className?: string;
  /** Показывать подпись/лейбл (по умолчанию — true). */
  showLabel?: boolean;
};

export default function EndpointBadge({ path, className, showLabel = true }: Props) {
  return (
    <a
      href={path}
      target="_blank"
      rel="noreferrer"
      className={
        "inline-flex items-center gap-2 rounded-md border px-2 py-1 text-xs font-mono " +
        (className ?? "")
      }
      title={path}
    >
      <code>{path}</code>
      {showLabel ? <span className="opacity-70">open</span> : null}
    </a>
  );
}
