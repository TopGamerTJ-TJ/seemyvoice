import React from "react";
import { Hand } from "lucide-react";

/**
 * SignAsset — renders a single sign's asset.
 *
 * Supports:
 *   - placeholder: clearly-labeled animated placeholder (no fabricated ASL)
 *   - video: local MP4/WebM (future — set asset.type to 'video' and asset.src)
 *   - image: local animated image / GIF (future — set asset.type to 'image' and asset.src)
 *
 * The placeholder is intentionally honest: it shows the sign name, a description
 * of the actual handshape/motion, and a clear "placeholder" label. It does NOT
 * fabricate hand movements and call them ASL.
 */
export default function SignAsset({ sign, active, reducedMotion }) {
  const { asset } = sign;

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

  // Placeholder — honest, clearly labeled
  const isFingerspelled = sign.fingerspelled;
  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-full text-center px-6 transition-all duration-500 ${
        active ? "opacity-100 scale-100" : "opacity-60 scale-95"
      }`}
    >
      <div
        className={`relative flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36 mb-6 rounded-full bg-primary/10 ${
          !reducedMotion && active ? "animate-pulse-slow" : ""
        }`}
      >
        <Hand
          className="w-12 h-12 sm:w-16 sm:h-16 text-primary"
          strokeWidth={1.5}
        />
        {isFingerspelled && (
          <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            Fingerspell
          </span>
        )}
      </div>

      <h3 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight mb-3">
        {sign.gloss}
      </h3>

      {asset.label && (
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-3">
          {asset.label}
        </p>
      )}

      <p className="text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed">
        {asset.description}
      </p>

      <div className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground/70 bg-muted px-3 py-1.5 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        Placeholder — verified sign video to be added
      </div>
    </div>
  );
}