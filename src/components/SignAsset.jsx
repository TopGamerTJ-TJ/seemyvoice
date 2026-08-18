import React, { useRef, useEffect, useState } from "react";
import AnimatedHand from "@/components/AnimatedHand";
import { getMotion } from "@/data/signMotions";
import { useSettings } from "@/components/SettingsContext";

/**
 * SignAsset — renders a single sign's visual.
 *
 * Priority:
 *   1. Real ASL video (SignASL.org via getSignVideoUrl backend function)
 *   2. For video-lookup signs with no video: letter-by-letter fingerspelling
 *   3. Stylized AnimatedHand fallback (dictionary signs, loading state)
 */
export default function SignAsset({ sign, active, videoUrl, speed = 1, onVideoEnded }) {
  const { settings } = useSettings();
  const videoRef = useRef(null);

  const isFingerspelled = sign.fingerspelled;
  const isVideoLookup = sign.videoLookup;
  const motionType = isFingerspelled ? "fingerspell" : getMotion(sign.signId);
  const showVideo = videoUrl && !isFingerspelled;

  // Fingerspelling fallback: cycle through letters of the word
  const isFsFallback = isVideoLookup && videoUrl === null && sign.allowFingerspellingFallback;
  const isNoVideo = isVideoLookup && videoUrl === null && !sign.allowFingerspellingFallback;
  const [letterIdx, setLetterIdx] = useState(0);

  useEffect(() => {
    if (!isFsFallback || !active) {
      setLetterIdx(0);
      return;
    }
    setLetterIdx(0);
    const letterDuration = 800 / speed;
    const interval = setInterval(() => {
      setLetterIdx((prev) => {
        if (prev >= sign.word.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, letterDuration);
    return () => clearInterval(interval);
  }, [isFsFallback, active, speed, sign.word]);

  // Control the video element
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showVideo) return;
    video.playbackRate = speed;
    if (active) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active, showVideo, videoUrl, speed]);

  // 1. Real ASL video
  if (showVideo) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex-1 flex items-center justify-center w-full min-h-[200px]">
          <video
            ref={videoRef}
            src={videoUrl}
            muted
            playsInline
            referrerPolicy="no-referrer"
            onEnded={onVideoEnded}
            className="max-w-full max-h-[320px] rounded-2xl"
          />
        </div>
        <div className="mt-2">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            {sign.gloss}
          </h3>
        </div>
        <div className="mt-3 inline-flex items-center gap-2 text-[11px] text-muted-foreground/70 bg-muted px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          Real ASL video — SignASL.org
        </div>
      </div>
    );
  }

  // 2. Fingerspelling fallback for video-lookup signs with no video
  if (isFsFallback) {
    const letters = sign.word.split("");
    const currentLetter = (letters[letterIdx] || "").toUpperCase();
    return (
      <div className="flex flex-col items-center justify-center w-full h-full text-center px-6 transition-opacity duration-300 opacity-100">
        <div className="flex-1 flex items-center justify-center w-full min-h-[200px]">
          <AnimatedHand
            motion="fingerspell"
            label={currentLetter}
            reducedMotion={settings.reducedMotion || !active}
          />
        </div>
        <div className="mt-2">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-1">
            {sign.gloss}
          </h3>
          <p className="text-xs text-amber-600 dark:text-amber-400 uppercase tracking-widest font-semibold">
            Fingerspelling · {letterIdx + 1}/{letters.length}
          </p>
        </div>
        <div className="mt-3 inline-flex items-center gap-2 text-[11px] text-muted-foreground/70 bg-muted px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          No ASL video found — fingerspelling
        </div>
      </div>
    );
  }

  // 3. No video and no fingerspelling fallback enabled
  if (isNoVideo) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full text-center px-6">
        <div className="flex-1 flex items-center justify-center w-full min-h-[200px]">
          <span className="text-6xl">🤟</span>
        </div>
        <div className="mt-2">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-1">
            {sign.gloss}
          </h3>
        </div>
        <div className="mt-3 inline-flex items-center gap-2 text-[11px] text-muted-foreground/70 bg-muted px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          No ASL video available
        </div>
      </div>
    );
  }

  // 4. Default: animated hand (dictionary signs, loading state, fingerspelled letters)
  const isLoading = videoUrl === undefined && !isFingerspelled && isVideoLookup;
  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-full text-center px-6 transition-opacity duration-300 ${
        active ? "opacity-100" : "opacity-50"
      }`}
    >
      <div className="flex-1 flex items-center justify-center w-full min-h-[200px]">
        {isLoading ? (
          <div className="w-10 h-10 border-4 border-muted border-t-foreground rounded-full animate-spin" />
        ) : (
          <AnimatedHand
            motion={motionType}
            label={sign.gloss}
            reducedMotion={settings.reducedMotion || !active}
          />
        )}
      </div>

      <div className="mt-2">
        <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-1">
          {sign.gloss}
        </h3>
        {isFingerspelled && (
          <p className="text-xs text-amber-600 dark:text-amber-400 uppercase tracking-widest font-semibold">
            Fingerspelling
          </p>
        )}
      </div>

      <div className="mt-3 inline-flex items-center gap-2 text-[11px] text-muted-foreground/70 bg-muted px-3 py-1.5 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        {isLoading ? "Loading ASL video…" : "Illustrative animation — sign video unavailable"}
      </div>
    </div>
  );
}