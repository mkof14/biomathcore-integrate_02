"use client";
import React from "react";

export default function AuthShell({ children }: { children?: React.ReactNode }) {
  return <div className="max-w-xl mx-auto p-6 border rounded-2xl">{children ?? <div>Auth</div>}</div>;
}
