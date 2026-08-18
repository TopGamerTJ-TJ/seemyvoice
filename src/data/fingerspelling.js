/**
 * ASL Fingerspelling Alphabet — local A–Z handshape data.
 *
 * Each entry has:
 *   letter — the alphabet letter
 *   label  — display label
 *   asset  — { type, label, description }
 *
 * Only placeholder assets are used until verified handshape photos/renders
 * are sourced. The structure supports real image assets later.
 */
export const fingerspellingAlphabet = [
  { letter: "a", label: "A", asset: { type: "placeholder", label: "Letter A", description: "Closed fist, thumb to the side." } },
  { letter: "b", label: "B", asset: { type: "placeholder", label: "Letter B", description: "Flat palm, thumb tucked across." } },
  { letter: "c", label: "C", asset: { type: "placeholder", label: "Letter C", description: "Hand curves into a C shape." } },
  { letter: "d", label: "D", asset: { type: "placeholder", label: "Letter D", description: "Index finger up, fingers form an O." } },
  { letter: "e", label: "E", asset: { type: "placeholder", label: "Letter E", description: "Fingers curled, thumb across fingertips." } },
  { letter: "f", label: "F", asset: { type: "placeholder", label: "Letter F", description: "Thumb and index touch, others extended." } },
  { letter: "g", label: "G", asset: { type: "placeholder", label: "Letter G", description: "Index finger points sideways, thumb beneath." } },
  { letter: "h", label: "H", asset: { type: "placeholder", label: "Letter H", description: "Index and middle finger extended sideways." } },
  { letter: "i", label: "I", asset: { type: "placeholder", label: "Letter I", description: "Pinky finger extended from fist." } },
  { letter: "j", label: "J", asset: { type: "placeholder", label: "Letter J", description: "Pinky traces a J in the air." } },
  { letter: "k", label: "K", asset: { type: "placeholder", label: "Letter K", description: "Index and middle finger form a V, thumb between." } },
  { letter: "l", label: "L", asset: { type: "placeholder", label: "Letter L", description: "Thumb and index form an L shape." } },
  { letter: "m", label: "M", asset: { type: "placeholder", label: "Letter M", description: "Three fingers fold over the thumb." } },
  { letter: "n", label: "N", asset: { type: "placeholder", label: "Letter N", description: "Two fingers fold over the thumb." } },
  { letter: "o", label: "O", asset: { type: "placeholder", label: "Letter O", description: "Fingertips and thumb form an O." } },
  { letter: "p", label: "P", asset: { type: "placeholder", label: "Letter P", description: "K shape rotated downward." } },
  { letter: "q", label: "Q", asset: { type: "placeholder", label: "Letter Q", description: "G shape rotated downward." } },
  { letter: "r", label: "R", asset: { type: "placeholder", label: "Letter R", description: "Index and middle fingers crossed." } },
  { letter: "s", label: "S", asset: { type: "placeholder", label: "Letter S", description: "Closed fist, thumb across fingers." } },
  { letter: "t", label: "T", asset: { type: "placeholder", label: "Letter T", description: "Thumb tucked between index and middle." } },
  { letter: "u", label: "U", asset: { type: "placeholder", label: "Letter U", description: "Index and middle fingers up together." } },
  { letter: "v", label: "V", asset: { type: "placeholder", label: "Letter V", description: "Index and middle finger form a V." } },
  { letter: "w", label: "W", asset: { type: "placeholder", label: "Letter W", description: "Three fingers spread into a W." } },
  { letter: "x", label: "X", asset: { type: "placeholder", label: "Letter X", description: "Index finger hooked, like a claw." } },
  { letter: "y", label: "Y", asset: { type: "placeholder", label: "Letter Y", description: "Thumb and pinky extended, others closed." } },
  { letter: "z", label: "Z", asset: { type: "placeholder", label: "Letter Z", description: "Index finger traces a Z in the air." } },
];

export const fingerspellingByLetter = Object.fromEntries(
  fingerspellingAlphabet.map((e) => [e.letter, e])
);