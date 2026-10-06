"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "busan-road-bookmarks";
const EMPTY: string[] = [];
const listeners = new Set<() => void>();
let cache: { raw: string | null; value: string[] } = { raw: null, value: EMPTY };

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw !== cache.raw) {
      cache = { raw, value: raw ? (JSON.parse(raw) as string[]) : EMPTY };
    }
  } catch {
    return EMPTY;
  }
  return cache.value;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

/** 서버/하이드레이션 시에는 빈 배열을 반환해 SSR 불일치를 방지합니다. */
export function useBookmarks() {
  const bookmarks = useSyncExternalStore(subscribe, read, () => EMPTY);

  const toggle = useCallback((id: string) => {
    const current = read();
    const next = current.includes(id)
      ? current.filter((b) => b !== id)
      : [...current, id];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
    listeners.forEach((l) => l());
  }, []);

  return { bookmarks, toggle };
}
