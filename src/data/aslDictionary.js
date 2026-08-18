/**
 * ASL Sign Dictionary — local, expandable sign library.
 *
 * Each sign entry:
 *   id            — unique identifier (the ASL gloss, uppercase)
 *   english_terms — array of English words/phrases that map to this sign
 *   asl_gloss     — the gloss label shown in the ASL reference display
 *   asset         — { type, label, description } describing the signing asset
 *                   type: 'placeholder' (no verified video yet) | 'video' | 'image'
 *   duration      — how long the sign plays (ms)
 *   category      — grouping for future library browsing
 *
 * IMPORTANT: Only 'placeholder' assets are used in this prototype because
 * verified ASL video assets have not been sourced yet. The structure supports
 * real local video/image assets — just set type to 'video'/'image' and add
 * the asset path. Never fabricate fake ASL movements.
 */
export const aslDictionary = [
  {
    id: "HELLO",
    english_terms: ["hello", "hi", "hey"],
    asl_gloss: "HELLO",
    asset: { type: "placeholder", label: "Hello", description: "Hand waves from forehead outward, palm forward." },
    duration: 2200,
    category: "greeting",
  },
  {
    id: "GOODBYE",
    english_terms: ["goodbye", "bye", "good-bye"],
    asl_gloss: "GOODBYE",
    asset: { type: "placeholder", label: "Goodbye", description: "Fingers flutter outward from the chin, palm facing forward." },
    duration: 2200,
    category: "greeting",
  },
  {
    id: "THANK-YOU",
    english_terms: ["thank you", "thanks", "thank"],
    asl_gloss: "THANK-YOU",
    asset: { type: "placeholder", label: "Thank You", description: "Flat hand touches chin, moves forward toward listener." },
    duration: 2400,
    category: "courtesy",
  },
  {
    id: "PLEASE",
    english_terms: ["please"],
    asl_gloss: "PLEASE",
    asset: { type: "placeholder", label: "Please", description: "Flat palm circles on the chest in a clockwise motion." },
    duration: 2400,
    category: "courtesy",
  },
  {
    id: "SORRY",
    english_terms: ["sorry", "apologize"],
    asl_gloss: "SORRY",
    asset: { type: "placeholder", label: "Sorry", description: "Closed fist circles on the chest, expressing regret." },
    duration: 2400,
    category: "courtesy",
  },
  {
    id: "YES",
    english_terms: ["yes", "yeah", "yep"],
    asl_gloss: "YES",
    asset: { type: "placeholder", label: "Yes", description: "Closed fist nods up and down, like a head nodding." },
    duration: 1800,
    category: "affirmation",
  },
  {
    id: "NO",
    english_terms: ["no", "nope", "not"],
    asl_gloss: "NO",
    asset: { type: "placeholder", label: "No", description: "Index and middle finger tap the thumb, like a mouth saying no." },
    duration: 1800,
    category: "affirmation",
  },
  {
    id: "YOU",
    english_terms: ["you", "your", "yours"],
    asl_gloss: "YOU",
    asset: { type: "placeholder", label: "You", description: "Index finger points outward toward the person addressed." },
    duration: 1600,
    category: "pronoun",
  },
  {
    id: "ME",
    english_terms: ["me", "my", "mine", "i"],
    asl_gloss: "ME",
    asset: { type: "placeholder", label: "Me", description: "Index finger points to the signer's own chest." },
    duration: 1600,
    category: "pronoun",
  },
  {
    id: "NAME",
    english_terms: ["name", "named"],
    asl_gloss: "NAME",
    asset: { type: "placeholder", label: "Name", description: "Two index fingers extend side by side, tapping together." },
    duration: 1800,
    category: "identity",
  },
  {
    id: "WHAT",
    english_terms: ["what"],
    asl_gloss: "WHAT",
    asset: { type: "placeholder", label: "What", description: "Open palms face up, shaking slightly with a questioning expression." },
    duration: 1800,
    category: "question",
  },
  {
    id: "WHERE",
    english_terms: ["where", "location"],
    asl_gloss: "WHERE",
    asset: { type: "placeholder", label: "Where", description: "Index finger shakes side to side, palm up." },
    duration: 1800,
    category: "question",
  },
  {
    id: "WHEN",
    english_terms: ["when", "time"],
    asl_gloss: "WHEN",
    asset: { type: "placeholder", label: "When", description: "Index finger arcs down onto the other hand's palm." },
    duration: 1800,
    category: "question",
  },
  {
    id: "WHO",
    english_terms: ["who", "whose"],
    asl_gloss: "WHO",
    asset: { type: "placeholder", label: "Who", description: "Thumb touches chin; index finger curls and extends." },
    duration: 1800,
    category: "question",
  },
  {
    id: "HOW",
    english_terms: ["how"],
    asl_gloss: "HOW",
    asset: { type: "placeholder", label: "How", description: "Closed hands roll forward, palms opening upward." },
    duration: 2000,
    category: "question",
  },
  {
    id: "BATHROOM",
    english_terms: ["bathroom", "restroom", "toilet", "washroom"],
    asl_gloss: "BATHROOM",
    asset: { type: "placeholder", label: "Bathroom", description: "Closed fist taps the shoulder with a 'T' handshape." },
    duration: 2200,
    category: "needs",
  },
  {
    id: "HELP",
    english_terms: ["help", "assist", "support"],
    asl_gloss: "HELP",
    asset: { type: "placeholder", label: "Help", description: "Closed fist rests on flat palm, lifts upward together." },
    duration: 2000,
    category: "action",
  },
  {
    id: "FOOD",
    english_terms: ["food", "eat", "lunch", "dinner", "breakfast"],
    asl_gloss: "FOOD",
    asset: { type: "placeholder", label: "Food", description: "Fingertips touch the mouth, repeating." },
    duration: 2000,
    category: "needs",
  },
  {
    id: "WATER",
    english_terms: ["water", "drink"],
    asl_gloss: "WATER",
    asset: { type: "placeholder", label: "Water", description: "Three-finger 'W' handshape taps the chin." },
    duration: 2000,
    category: "needs",
  },
  {
    id: "SCHOOL",
    english_terms: ["school", "class", "classroom"],
    asl_gloss: "SCHOOL",
    asset: { type: "placeholder", label: "School", description: "Flat palms clap together twice, then mirror inward." },
    duration: 2200,
    category: "places",
  },
  {
    id: "HOME",
    english_terms: ["home", "house"],
    asl_gloss: "HOME",
    asset: { type: "placeholder", label: "Home", description: "Fingertips touch cheek near mouth, move to cheek again." },
    duration: 2000,
    category: "places",
  },
  {
    id: "FRIEND",
    english_terms: ["friend", "friends", "buddy", "pal"],
    asl_gloss: "FRIEND",
    asset: { type: "placeholder", label: "Friend", description: "Two index fingers hook together, then reverse and hook again." },
    duration: 2200,
    category: "people",
  },
  {
    id: "FAMILY",
    english_terms: ["family", "families"],
    asl_gloss: "FAMILY",
    asset: { type: "placeholder", label: "Family", description: "Both 'F' hands form a circle, rotating forward to close." },
    duration: 2200,
    category: "people",
  },
  {
    id: "LIKE",
    english_terms: ["like", "prefer", "enjoy"],
    asl_gloss: "LIKE",
    asset: { type: "placeholder", label: "Like", description: "Thumb and middle finger pull from chest outward." },
    duration: 1800,
    category: "feeling",
  },
  {
    id: "LOVE",
    english_terms: ["love", "adore", "cherish"],
    asl_gloss: "LOVE",
    asset: { type: "placeholder", label: "Love", description: "Crossed fists over the heart, representing love." },
    duration: 2000,
    category: "feeling",
  },
  {
    id: "FEEL",
    english_terms: ["feel", "feeling", "feelings"],
    asl_gloss: "FEEL",
    asset: { type: "placeholder", label: "Feel", description: "Middle finger slides up the chest, palm facing inward." },
    duration: 1800,
    category: "feeling",
  },
  {
    id: "FINE",
    english_terms: ["fine", "okay", "ok", "good"],
    asl_gloss: "FINE",
    asset: { type: "placeholder", label: "Fine", description: "Thumb taps chest with open '5' hand, moves outward." },
    duration: 1800,
    category: "feeling",
  },
  {
    id: "I-LOVE-YOU",
    english_terms: ["i love you"],
    asl_gloss: "I-LOVE-YOU",
    asset: { type: "placeholder", label: "I Love You", description: "Thumb, index finger, and pinky extended — combined I, L, Y." },
    duration: 2600,
    category: "phrase",
  },
  {
    id: "MY-NAME-IS",
    english_terms: ["my name is", "my name's", "i am", "i'm"],
    asl_gloss: "MY-NAME-IS",
    asset: { type: "placeholder", label: "My Name Is", description: "Point to self (ME), then sign NAME in sequence." },
    duration: 2600,
    category: "phrase",
  },
  {
    id: "HOW-ARE-YOU",
    english_terms: ["how are you", "how do you do", "how's it going", "how are things"],
    asl_gloss: "HOW-ARE-YOU",
    asset: { type: "placeholder", label: "How Are You", description: "Sign HOW, then point to the person (YOU)." },
    duration: 2800,
    category: "phrase",
  },
  {
    id: "WHAT-IS-YOUR-NAME",
    english_terms: ["what is your name", "what's your name", "what your name"],
    asl_gloss: "WHAT-IS-YOUR-NAME",
    asset: { type: "placeholder", label: "What Is Your Name", description: "Sign WHAT, then YOU, then NAME in sequence." },
    duration: 2800,
    category: "phrase",
  },
  {
    id: "WHERE-IS-BATHROOM",
    english_terms: ["where is the bathroom", "where is bathroom", "where's the bathroom", "where bathroom"],
    asl_gloss: "WHERE-IS-BATHROOM",
    asset: { type: "placeholder", label: "Where Is Bathroom", description: "Sign BATHROOM, then WHERE — ASL typically places 'where' at the end." },
    duration: 2800,
    category: "phrase",
  },
  {
    id: "WHAT-TIME-IS-IT",
    english_terms: ["what time is it", "what time is it now", "what time"],
    asl_gloss: "WHAT-TIME-IS-IT",
    asset: { type: "placeholder", label: "What Time Is It", description: "Tap wrist with index finger, questioning expression." },
    duration: 2600,
    category: "phrase",
  },
];

// Lookup maps built once for fast access
export const signById = Object.fromEntries(aslDictionary.map((s) => [s.id, s]));

// Map every English term to its sign id. Longer terms first for greedy matching.
const termToSignEntries = [];
for (const sign of aslDictionary) {
  for (const term of sign.english_terms) {
    termToSignEntries.push([term.trim().toLowerCase(), sign.id]);
  }
}
termToSignEntries.sort((a, b) => b[0].length - a[0].length);
export const termToSign = Object.fromEntries(termToSignEntries);