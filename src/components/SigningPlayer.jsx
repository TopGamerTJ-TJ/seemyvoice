import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, ChevronLeft } from "lucide-react";
import SignAsset from "@/components/SignAsset";
import { useSettings } from "@/components/SettingsContext";

/**
 * SigningPlayer — plays a sequence of local sign assets in order.
 *
 * Props:
 *   signSequence — array of sign items from translateToASL()
 *   onNewTranslation — callback for "Translate Something Else"
 */
export default function SigningPlayer({ signSequence, onNewTranslation }) {
  const { settings } = useSettings();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutRef = useRef(null);

  const speed = settings.signingSpeed;
  const currentSign = signSequence[currentIndex];
  const isLast = currentIndex >= signSequence.length - 1;

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const advance = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= signSequence.length - 1) {
        setIsPlaying(false);
        return prev;
      }
      return prev + 1;
    });
  }, [signSequence.length]);

  // Auto-advance timer
  useEffect(() => {
    clearTimer();
    if (isPlaying && currentSign && !isLast) {
      const duration = currentSign.duration / speed;
      timeoutRef.current = setTimeout(() => {
        advance();
      }, duration);
    } else if (isPlaying && isLast) {
      // Finished the last sign
      setIsPlaying(false);
    }
    return clearTimer;
  }, [isPlaying, currentIndex, currentSign, speed, isLast, advance, clearTimer]);

  const handlePlay = () => {
    if (isLast && !isPlaying) {
      // Replay from start if at the end
      setCurrentIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    clearTimer();
  };

  const handleReplay = () => {
    clearTimer();
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  if (!currentSign) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <p className="text-lg text-muted-foreground mb-6">
          No signs available to display.
        </p>
        <button
          onClick={onNewTranslation}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Translate Something Else
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* Signing display area */}
      <div className="relative w-full aspect-[4/3] sm:aspect-video rounded-3xl bg-gradient-to-b from-muted/50 to-muted overflow-hidden border border-border">
        <SignAsset
          sign={currentSign}
          active={isPlaying}
          reducedMotion={settings.reducedMotion}
        />

        {/* Progress indicators */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent">
          <div className="flex items-center gap-2 mb-2">
            {signSequence.map((sign, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "flex-1 bg-primary"
                    : idx < currentIndex
                    ? "flex-1 bg-primary/40"
                    : "flex-1 bg-foreground/15"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between items-center text-xs text-white/90">
            <span>
              Sign {currentIndex + 1} of {signSequence.length}
            </span>
            <span className="font-mono">
              {currentSign.fingerspelled ? "Fingerspelling" : currentSign.gloss}
            </span>
          </div>
        </div>
      </div>

      {/* Playback controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        <div className="flex items-center gap-2">
          {!isPlaying ? (
            <button
              onClick={handlePlay}
              aria-label="Play"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors min-w-[110px] justify-center"
            >
              <Play className="w-5 h-5 fill-current" />
              Play
            </button>
          ) : (
            <button
              onClick={handlePause}
              aria-label="Pause"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors min-w-[110px] justify-center"
            >
              <Pause className="w-5 h-5 fill-current" />
              Pause
            </button>
          )}
          <button
            onClick={handleReplay}
            aria-label="Replay"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Replay
          </button>
        </div>

        {/* Speed controls */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-secondary">
          {[0.5, 0.75, 1, 1.25].map((s) => (
            <button
              key={s}
              onClick={() => settings.updateSetting("signingSpeed", s)}
              aria-pressed={speed === s}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                speed === s
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}×
            </button>
          ))}
        </div>
      </div>

      {/* New translation */}
      <div className="flex justify-center mt-8">
        <button
          onClick={onNewTranslation}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-semibold hover:bg-secondary transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Translate Something Else
        </button>
      </div>
    </div>
  );
}