"use client";
import React from "react";
export default function AuthShell({ children }: { children?: React.ReactNode }) {
  return <div className="mx-auto max-w-md p-6">{children}</div>;
}
