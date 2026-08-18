import { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";

/**
 * useSignVideos — fetches real ASL video URLs for each sign in a sequence
 * by calling the getSignVideoUrl backend function (SignASL.org).
 *
 * Results are cached in a module-level Map so repeated translations
 * of the same words don't re-fetch.
 *
 * @param {Array} signSequence — array of sign items (each has .word)
 * @returns {Object} map of index → videoUrl (string | null | undefined)
 *   - undefined: still loading
 *   - string: video URL ready
 *   - null: no video found (use animated hand fallback)
 */
const videoCache = new Map();

export function useSignVideos(signSequence) {
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
      if (videoCache.has(word)) {
        initial[i] = videoCache.get(word);
      } else {
        toFetch.push({ index: i, word });
      }
    }

    if (!cancelled) setVideoUrls(initial);

    if (toFetch.length === 0) return;

    Promise.all(
      toFetch.map(async ({ index, word }) => {
        try {
          const resp = await base44.functions.invoke("getSignVideoUrl", { word });
          const url = resp.data?.videoUrl ?? null;
          videoCache.set(word, url);
          return { index, url };
        } catch (e) {
          videoCache.set(word, null);
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
  }, [signSequence]);

  return videoUrls;
}