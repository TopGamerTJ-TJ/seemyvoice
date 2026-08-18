import React from "react";
import { motion } from "framer-motion";

/**
 * AnimatedHand — a stylized, animated SVG hand that performs a motion
 * based on the sign's `motion` type.
 *
 * IMPORTANT: These are illustrative animations — stylized hand graphics
 * that move to convey the general direction/nature of each sign. They are
 * NOT verified ASL footage and should not be treated as authentic signing.
 */

const F = "hsl(var(--primary))";
const S = "hsl(var(--primary))";

function HandShape({ variant = "open" }) {
  if (variant === "fist") {
    return (
      <g>
        <rect x="30" y="40" width="40" height="45" rx="14" fill={F} opacity="0.9" />
        <rect x="33" y="48" width="34" height="8" rx="4" fill={S} opacity="0.3" />
        <rect x="33" y="58" width="34" height="8" rx="4" fill={S} opacity="0.3" />
        <rect x="33" y="68" width="34" height="8" rx="4" fill={S} opacity="0.3" />
      </g>
    );
  }
  if (variant === "point") {
    return (
      <g>
        <rect x="30" y="45" width="40" height="40" rx="12" fill={F} opacity="0.85" />
        <rect x="45" y="15" width="10" height="38" rx="5" fill={F} />
        <rect x="30" y="48" width="14" height="10" rx="5" fill={S} opacity="0.4" />
        <rect x="56" y="48" width="14" height="10" rx="5" fill={S} opacity="0.4" />
      </g>
    );
  }
  if (variant === "V") {
    return (
      <g>
        <rect x="28" y="50" width="44" height="35" rx="12" fill={F} opacity="0.85" />
        <rect x="38" y="15" width="9" height="42" rx="4.5" fill={F} transform="rotate(-8 42 50)" />
        <rect x="53" y="15" width="9" height="42" rx="4.5" fill={F} transform="rotate(8 57 50)" />
      </g>
    );
  }
  if (variant === "flat") {
    return (
      <g>
        <rect x="25" y="25" width="50" height="60" rx="10" fill={F} opacity="0.9" />
        <rect x="28" y="28" width="10" height="20" rx="5" fill={S} opacity="0.4" />
        <rect x="40" y="26" width="10" height="22" rx="5" fill={S} opacity="0.4" />
        <rect x="52" y="26" width="10" height="22" rx="5" fill={S} opacity="0.4" />
        <rect x="64" y="28" width="8" height="20" rx="4" fill={S} opacity="0.4" />
      </g>
    );
  }
  // Default: open hand
  return (
    <g>
      <rect x="28" y="45" width="44" height="42" rx="12" fill={F} opacity="0.85" />
      <rect x="28" y="20" width="9" height="32" rx="4.5" fill={F} transform="rotate(-12 32 50)" />
      <rect x="39" y="15" width="9" height="38" rx="4.5" fill={F} />
      <rect x="51" y="15" width="9" height="38" rx="4.5" fill={F} transform="rotate(5 55 50)" />
      <rect x="62" y="20" width="8" height="32" rx="4" fill={F} transform="rotate(15 66 50)" />
      <rect x="24" y="42" width="12" height="10" rx="5" fill={F} opacity="0.7" />
    </g>
  );
}

const ANIM_MAP = {
  wave: { variant: "open", animate: { rotate: [0, -20, 20, -20, 0] }, transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" } },
  forward: { variant: "flat", animate: { y: [0, -20, 0], scale: [1, 1.08, 1] }, transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } },
  circle: { variant: "flat", animate: { x: [0, 15, 0, -15, 0], y: [0, -10, -15, -10, 0] }, transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } },
  nod: { variant: "fist", animate: { rotate: [0, -15, 0, -15, 0] }, transition: { duration: 1.4, repeat: Infinity, ease: "easeInOut" } },
  shake: { variant: "fist", animate: { x: [0, -12, 12, -12, 0] }, transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" } },
  point: { variant: "point", animate: { x: [0, 10, 0], opacity: [0.8, 1, 0.8] }, transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" } },
  tap: { variant: "fist", animate: { y: [0, -8, 0, -8, 0] }, transition: { duration: 1.4, repeat: Infinity, ease: "easeOut" } },
  lift: { variant: "fist", animate: { y: [10, -20, 10] }, transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } },
  mouth: { variant: "open", animate: { y: [10, -25, 10] }, transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" } },
  chin: { variant: "open", animate: { y: [5, -15, 5] }, transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" } },
  chest: { variant: "fist", animate: { scale: [1, 0.92, 1] }, transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } },
  hook: { variant: "point", animate: { x: [0, 8, 0, -8, 0] }, transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" } },
};

export default function AnimatedHand({ motion: motionType = "wave", label, reducedMotion = false }) {
  // Big letter display for fingerspelling
  if (motionType === "fingerspell") {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.35, ease: "easeOut" }}
          className="text-7xl sm:text-9xl font-bold text-primary"
        >
          {label}
        </motion.div>
      </div>
    );
  }

  const cfg = ANIM_MAP[motionType] || ANIM_MAP.wave;
  const animateProps = reducedMotion ? {} : cfg.animate;
  const transitionProps = reducedMotion ? {} : cfg.transition;

  return (
    <div className="flex items-center justify-center w-full h-full">
      <motion.svg
        viewBox="0 0 100 100"
        className="w-40 h-40 sm:w-52 sm:h-52"
        style={{ transformOrigin: "50px 85px" }}
        animate={animateProps}
        transition={transitionProps}
      >
        <HandShape variant={cfg.variant} />
      </motion.svg>
    </div>
  );
}