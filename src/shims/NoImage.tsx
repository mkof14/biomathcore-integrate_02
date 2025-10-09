"use client";
import React from "react";
type Props = React.ImgHTMLAttributes<HTMLImageElement> & { alt?: string };
export default function NoImage(props: Props) {
  // Ничего не рендерим, чтобы Next не трогал оптимизацию
  return null;
}
