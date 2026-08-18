import React, { useRef, useEffect } from "react";
import AnimatedHand from "@/components/AnimatedHand";
import { getMotion } from "@/data/signMotions";
import { useSettings } from "@/components/SettingsContext";

/**
 * SignAsset — renders a single sign's visual.
 *
 * If a real ASL video URL is available (from SignASL.org via the
 * getSignVideoUrl backend function), plays the video.
 * Otherwise falls back to the stylized AnimatedHand.
 */
export default function SignAsset({ sign, active, videoUrl, speed = 1, onVideoEnded }) {
  const { settings } = useSettings();
  const videoRef = useRef(null);

  const isFingerspelled = sign.fingerspelled;
  const motionType = isFingerspelled ? "fingerspell" : getMotion(sign.signId);
  const showVideo = videoUrl && !isFingerspelled;

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

  // Real ASL video
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

  // Fallback: animated stylized hand
  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-full text-center px-6 transition-opacity duration-300 ${
        active ? "opacity-100" : "opacity-50"
      }`}
    >
      <div className="flex-1 flex items-center justify-center w-full min-h-[200px]">
        <AnimatedHand
          motion={motionType}
          label={sign.gloss}
          reducedMotion={settings.reducedMotion || !active}
        />
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
        {videoUrl === undefined ? "Loading ASL video…" : "Illustrative animation — sign video unavailable"}
      </div>
    </div>
  );
}