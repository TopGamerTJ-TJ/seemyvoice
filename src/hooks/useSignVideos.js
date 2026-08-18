import { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";

/**
 * useSignVideos — fetches real sign language video URLs for each sign
 * in a sequence by calling the getSignVideoUrl backend function.
 *
 * Results are cached in a module-level Map keyed by `${signLanguage}:${word}`
 * so repeated translations of the same words don't re-fetch.
 *
 * @param {Array} signSequence — array of sign items (each has .word)
 * @param {string} signLanguage — "asl" | "bsl"
 * @returns {Object} map of index → videoUrl (string | null | undefined)
 *   - undefined: still loading
 *   - string: video URL ready
 *   - null: no video found (use animated hand fallback)
 */
const videoCache = new Map();

export function useSignVideos(signSequence, signLanguage = "asl") {
  const [videoUrls, setVideoUrls] = useState({});
  const seqRef = useRef(signSequence);

  useEffect(() => {
    seqRef.current = signSequence;
    if (!signSequence || signSequence.length === 0) {
      setVideoUrls({});
      return;
    }

    let cancelled = false;
    const initial = {};
    const toFetch = [];

    for (let i = 0; i < signSequence.length; i++) {
      const word = signSequence[i].word;
      const cacheKey = `${signLanguage}:${word}`;
      if (videoCache.has(cacheKey)) {
        initial[i] = videoCache.get(cacheKey);
      } else {
        toFetch.push({ index: i, word, cacheKey });
      }
    }

    if (!cancelled) setVideoUrls(initial);

    if (toFetch.length === 0) return;

    Promise.all(
      toFetch.map(async ({ index, word, cacheKey }) => {
        try {
          const resp = await base44.functions.invoke("getSignVideoUrl", { word, signLanguage });
          const url = resp.data?.videoUrl ?? null;
          videoCache.set(cacheKey, url);
          return { index, url };
        } catch (e) {
          videoCache.set(cacheKey, null);
          return { index, url: null };
        }
      })
    ).then((results) => {
      if (cancelled) return;
      setVideoUrls((prev) => {
        const updated = { ...prev };
        for (const { index, url } of results) {
          updated[index] = url;
        }
        return updated;
      });
    });

    return () => {
      cancelled = true;
    };
  }, [signSequence, signLanguage]);

  return videoUrls;
}