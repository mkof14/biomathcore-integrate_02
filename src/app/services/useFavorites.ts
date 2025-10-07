"use client";
import { useEffect, useState } from "react";

export function useFavorites() {
  const [favs, setFavs] = useState<string[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("bmcore:favorites");
    if (raw) setFavs(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem("bmcore:favorites", JSON.stringify(favs));
  }, [favs]);

  function toggle(slug: string) {
    setFavs((prev) =>
      prev.includes(slug) ? prev.filter((x) => x !== slug) : [...prev, slug],
    );
  }
  function clear() {
    setFavs([]);
  }

  return { favs, toggle, clear };
}
