import React from "react";
import AnimatedHand from "@/components/AnimatedHand";
import { getMotion } from "@/data/signMotions";
import { useSettings } from "@/components/SettingsContext";

/**
 * SignAsset — renders a single sign's animated visual.
 *
 * Supports:
 *   - placeholder: stylized animated hand (illustrative, not verified ASL)
 *   - video: local MP4/WebM (future — set asset.type to 'video' and asset.src)
 *   - image: local animated image / GIF (future — set asset.type to 'image' and asset.src)
 *
 * The animated hand is clearly labeled as an illustrative placeholder —
 * it conveys the general motion direction, NOT authentic ASL signing.
 */
export default function SignAsset({ sign, active }) {
  const { settings } = useSettings();
  const { asset } = sign;

  // Fingerspelled letters use the letter display
  const isFingerspelled = sign.fingerspelled;
  const motionType = isFingerspelled ? "fingerspell" : getMotion(sign.signId);

  if (asset.type === "video" && asset.src) {
    return (
      <video
        src={asset.src}
        autoPlay={active}
        loop={false}
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    );
  }

  if (asset.type === "image" && asset.src) {
    return (
      <img
        src={asset.src}
        alt={asset.label || sign.gloss}
        className="w-full h-full object-cover"
      />
    );
  }

  // Animated placeholder — stylized hand with real motion
  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-full text-center px-6 transition-opacity duration-300 ${
        active ? "opacity-100" : "opacity-50"
      }`}
    >
      {/* The animated hand */}
      <div className="flex-1 flex items-center justify-center w-full min-h-[200px]">
        <AnimatedHand
          motion={motionType}
          label={sign.gloss}
          reducedMotion={settings.reducedMotion || !active}
        />
      </div>

      {/* Sign label */}
      <div className="mt-2">
        <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-1">
          {sign.gloss}
        </h3>
        {asset.label && !isFingerspelled && (
          <p className="text-xs text-muted-foreground uppercase tracking-widest">
            {asset.label}
          </p>
        )}
        {isFingerspelled && (
          <p className="text-xs text-amber-600 dark:text-amber-400 uppercase tracking-widest font-semibold">
            Fingerspelling
          </p>
        )}
      </div>

      {/* Honest placeholder label */}
      <div className="mt-3 inline-flex items-center gap-2 text-[11px] text-muted-foreground/70 bg-muted px-3 py-1.5 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        Illustrative animation — not verified ASL footage
      </div>
    </div>
  );
}