/**
 * Motion mapping — assigns an animation type to each sign id.
 * Used by the AnimatedHand component to render a stylized motion.
 *
 * Motion types: wave, forward, circle, nod, shake, point, tap, lift,
 *               mouth, chin, chest, hook, fingerspell
 */
export const signMotions = {
  // Greetings & courtesy
  HELLO: "wave",
  GOODBYE: "wave",
  "THANK-YOU": "forward",
  PLEASE: "circle",
  SORRY: "circle",
  "PLEASE-AND-THANK-YOU": "forward",

  // Affirmations
  YES: "nod",
  NO: "shake",
  FINE: "forward",
  "FINE-THANKS": "forward",

  // Pronouns
  YOU: "point",
  ME: "point",

  // Identity & questions
  NAME: "tap",
  WHAT: "shake",
  WHERE: "shake",
  WHEN: "tap",
  WHO: "tap",
  HOW: "lift",
  BATHROOM: "tap",
  WHAT_IS_YOUR_NAME: "shake",
  WHERE_IS_BATHROOM: "shake",
  WHAT_TIME_IS_IT: "tap",
  WHERE_ARE_YOU_FROM: "shake",
  WHAT_DO_YOU_MEAN: "shake",

  // Actions
  HELP: "lift",
  "HELP-YOU": "lift",
  "CAN-YOU-HELP-ME": "lift",
  NEED: "tap",
  WANT: "chest",
  GO: "point",
  COME: "point",
  STOP: "tap",
  WORK: "tap",
  LEARN: "chin",
  UNDERSTAND: "point",
  KNOW: "point",
  THINK: "tap",
  SEE: "point",
  "I-AM-LEARNING": "chin",

  // Feelings
  LIKE: "chest",
  LOVE: "chest",
  FEEL: "chest",
  HAPPY: "chest",
  SAD: "forward",
  ANGRY: "lift",
  TIRED: "forward",
  SCARED: "shake",
  EXCITED: "chest",
  HUNGRY: "chest",
  THIRSTY: "chin",
  SICK: "tap",

  // Needs
  FOOD: "mouth",
  WATER: "chin",

  // Places
  SCHOOL: "tap",
  HOME: "tap",
  STORE: "tap",
  CHURCH: "tap",
  HOSPITAL: "tap",
  LIBRARY: "tap",

  // People
  FRIEND: "hook",
  FAMILY: "circle",
  MOTHER: "chin",
  FATHER: "tap",
  SISTER: "chin",
  BROTHER: "tap",
  BABY: "chest",
  TEACHER: "point",
  STUDENT: "chin",
  DOCTOR: "tap",

  // Animals
  DOG: "tap",
  CAT: "tap",
  BIRD: "tap",
  FISH: "forward",

  // Descriptors
  BIG: "forward",
  SMALL: "forward",
  BEAUTIFUL: "circle",
  GOOD: "forward",
  BAD: "forward",

  // Time
  TODAY: "tap",
  TOMORROW: "point",
  YESTERDAY: "point",
  NIGHT: "forward",
  MORNING: "lift",

  // Numbers
  "NUMBER-ONE": "point",
  "NUMBER-TWO": "point",
  "NUMBER-THREE": "point",
  "NUMBER-FOUR": "point",
  "NUMBER-FIVE": "point",

  // Phrases
  "I-LOVE-YOU": "chest",
  "MY-NAME-IS": "point",
  "HOW-ARE-YOU": "point",
  "NICE-TO-MEET-YOU": "forward",
  "I-AM-DEAF": "shake",
  "DO-YOU-UNDERSTAND": "point",
};

/**
 * Get the motion type for a sign id.
 * Falls back to 'wave' if not specified.
 */
export function getMotion(signId) {
  return signMotions[signId] || "wave";
}

// Category-based default motion (used when no explicit motion is set)
export const categoryMotion = {
  greeting: "wave",
  courtesy: "forward",
  affirmation: "nod",
  pronoun: "point",
  question: "shake",
  needs: "tap",
  action: "tap",
  feeling: "chest",
  places: "tap",
  people: "point",
  animals: "tap",
  color: "forward",
  number: "point",
  descriptor: "forward",
  time: "tap",
  phrase: "forward",
};