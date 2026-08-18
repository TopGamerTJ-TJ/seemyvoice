import React, { useEffect, useState } from "react";
import { useSettings } from "@/components/SettingsContext";
import { useI18n } from "@/components/I18nContext";

/**
 * CountdownOverlay — full-screen 3-2-1 countdown.
 *
 * Each number shows for ~1 second with fade/scale/fade-out animation.
 * Uses reduced-motion setting to simplify animations.
 * Calls onComplete when countdown finishes.
 */
export default function CountdownOverlay({ onComplete }) {
  const { settings } = useSettings();
  const { t } = useI18n();
  const [count, setCount] = useState(3);
  const [phase, setPhase] = useState("in"); // 'in' | 'hold' | 'out'

  useEffect(() => {
    const reduced = settings.reducedMotion;
    const inDuration = reduced ? 0 : 300;
    const holdDuration = 700;
    const outDuration = reduced ? 0 : 300;

    let timers = [];

    // Phase: fade in
    setPhase("in");
    timers.push(
      setTimeout(() => {
        setPhase("hold");
        timers.push(
          setTimeout(() => {
            setPhase("out");
            timers.push(
              setTimeout(() => {
                if (count > 1) {
                  setCount(count - 1);
                  setPhase("in");
                } else {
                  onComplete();
                }
              }, outDuration)
            );
          }, holdDuration)
        );
      }, inDuration)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, settings.reducedMotion]);

  const reduced = settings.reducedMotion;

  const scaleClass = reduced
    ? "scale-100"
    : phase === "in"
    ? "scale-90 opacity-0"
    : phase === "hold"
    ? "scale-100 opacity-100"
    : "scale-110 opacity-0";

  const transitionClass = reduced
    ? "transition-none"
    : "transition-all duration-300 ease-out";

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950"
      role="status"
      aria-live="assertive"
      aria-label={`Countdown: ${count}`}
    >
      <div
        className={`text-white text-[12rem] sm:text-[18rem] font-bold leading-none ${transitionClass} ${scaleClass}`}
      >
        {count}
      </div>
      <p className="text-slate-400 text-base sm:text-lg mt-4 tracking-wide">
        {t("preparing")}
      </p>
    </div>
  );
}