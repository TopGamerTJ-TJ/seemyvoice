import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";

const VISITOR_COOKIE = "asl_visitor_id";

function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

/**
 * useSiteStats — tracks unique visitors (via cookie) and words translated.
 * Returns live stats and a trackTranslation callback.
 */
export function useSiteStats() {
  const [stats, setStats] = useState({ totalWords: 0, totalVisitors: 0 });

  useEffect(() => {
    const visitorId = getCookie(VISITOR_COOKIE);
    const isNew = !visitorId;
    if (isNew) {
      const id =
        (crypto.randomUUID && crypto.randomUUID()) ||
        `${Date.now()}-${Math.random()}`;
      setCookie(VISITOR_COOKIE, id, 365);
    }
    base44.functions
      .invoke("trackStats", { newVisitor: isNew, wordsAdded: 0 })
      .then((res) => setStats(res.data))
      .catch(() => {});
  }, []);

  const trackTranslation = useCallback((wordCount) => {
    base44.functions
      .invoke("trackStats", { newVisitor: false, wordsAdded: wordCount })
      .then((res) => setStats(res.data))
      .catch(() => {});
  }, []);

  return { stats, trackTranslation };
}