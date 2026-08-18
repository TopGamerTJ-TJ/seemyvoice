/**
 * Local Translation Engine — translateToASL(text)
 *
 * No network calls. Pure local logic:
 *   1. Normalize text (lowercase, strip punctuation, collapse whitespace)
 *   2. Greedily match multi-word phrases from the dictionary
 *   3. Apply local ASL grammar rules to remaining tokens
 *   4. Match individual words
 *   5. Fingerspell unmatched words (if enabled)
 *   6. Return ordered sign sequence + unmatched words
 */
import { aslDictionary, termToSign, signById } from "@/data/aslDictionary";
import { fingerspellingByLetter } from "@/data/fingerspelling";
import { applyGrammarRules, stopwords } from "@/data/aslRules";

/**
 * Normalize raw input text into a clean token array.
 * - lowercase
 * - strip punctuation (keep apostrophes within words, then remove them)
 * - collapse whitespace
 */
export function normalizeText(text) {
  if (!text) return [];
  let normalized = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s']/g, " ")   // replace punctuation with space, keep apostrophes
    .replace(/'/g, "")            // remove apostrophes (don't → dont)
    .replace(/\s+/g, " ")         // collapse whitespace
    .trim();
  if (!normalized) return [];
  return normalized.split(" ");
}

/**
 * Greedily match multi-word phrases first.
 * Walks the token array left-to-right, trying the longest possible phrase
 * at each position.
 *
 * Returns:
 *   segments: array of { type: 'phrase'|'word', value: string|[] }
 *     - phrase: matched phrase string
 *     - word: single unmatched word token (for later individual matching)
 */
function segmentByPhrases(tokens) {
  const segments = [];
  let i = 0;
  while (i < tokens.length) {
    let matched = null;
    // Try longest phrase first: from full remaining length down to 2 words
    for (let len = tokens.length - i; len >= 2; len--) {
      const candidate = tokens.slice(i, i + len).join(" ");
      if (termToSign[candidate]) {
        matched = { phrase: candidate, length: len };
        break;
      }
    }
    if (matched) {
      segments.push({ type: "phrase", value: matched.phrase });
      i += matched.length;
    } else {
      segments.push({ type: "word", value: tokens[i] });
      i += 1;
    }
  }
  return segments;
}

/**
 * Build a sign sequence item from a sign id.
 */
function signItem(signId, viaFingerspelling = false) {
  const sign = signById[signId];
  if (!sign) return null;
  return {
    signId: sign.id,
    gloss: sign.asl_gloss,
    asset: sign.asset,
    duration: sign.duration,
    fingerspelled: viaFingerspelling,
    word: sign.english_terms[0],
  };
}

/**
 * Build a fingerspelling sequence for a word.
 * Returns an array of letter items, or null if the word contains
 * non-alphabetic characters that can't be fingerspelled.
 */
function fingerspellWord(word) {
  const letters = [];
  for (const ch of word) {
    const entry = fingerspellingByLetter[ch];
    if (!entry) return null; // can't fingerspell non-alpha
    letters.push({
      signId: `FS-${ch.toUpperCase()}`,
      gloss: ch.toUpperCase(),
      asset: entry.asset,
      duration: 800,
      fingerspelled: true,
      word: ch,
      letter: ch,
    });
  }
  return letters;
}

/**
 * Main translation function.
 *
 * @param {string} text — raw English input
 * @param {object} options
 * @param {boolean} options.fingerspellingFallback — whether to fingerspell unknown words
 * @returns {object} translation result:
 *   { originalText, gloss, signSequence, unmatchedWords, status, usedFingerspelling }
 */
export function translateToASL(text, options = {}) {
  const { fingerspellingFallback = true } = options;

  if (!text || !text.trim()) {
    return {
      originalText: text || "",
      gloss: [],
      signSequence: [],
      unmatchedWords: [],
      status: "empty",
      usedFingerspelling: false,
    };
  }

  const tokens = normalizeText(text);
  if (tokens.length === 0) {
    return {
      originalText: text,
      gloss: [],
      signSequence: [],
      unmatchedWords: [],
      status: "empty",
      usedFingerspelling: false,
    };
  }

  // 1. Match multi-word phrases first
  const segments = segmentByPhrases(tokens);

  // 2. Collect unmatched word tokens, apply grammar rules to them collectively
  //    (grammar rules operate on the word-level tokens; phrases are already resolved)
  const wordTokens = segments
    .filter((s) => s.type === "word")
    .map((s) => s.value);

  // Apply grammar rules to the word tokens
  const reorderedWordTokens = applyGrammarRules(wordTokens);

  // Build a queue: for word segments, use reordered tokens; phrases keep their position
  const processedSegments = [];
  let wordIdx = 0;
  for (const seg of segments) {
    if (seg.type === "phrase") {
      processedSegments.push(seg);
    } else {
      processedSegments.push({ type: "word", value: reorderedWordTokens[wordIdx] || seg.value });
      wordIdx++;
    }
  }

  // 3. Resolve each segment to signs
  const signSequence = [];
  const unmatchedWords = [];
  let usedFingerspelling = false;

  for (const seg of processedSegments) {
    if (seg.type === "phrase") {
      const signId = termToSign[seg.value];
      const item = signItem(signId);
      if (item) signSequence.push(item);
    } else {
      const word = seg.value;
      // Skip stopwords entirely
      if (stopwords.has(word)) continue;

      const signId = termToSign[word];
      if (signId) {
        const item = signItem(signId);
        if (item) signSequence.push(item);
      } else {
        // Try a whole-word ASL video lookup (SignASL.org) before fingerspelling.
        // If no video is found, fall back to letter-by-letter fingerspelling
        // at render time.
        signSequence.push({
          signId: `VL-${word}`,
          gloss: word.charAt(0).toUpperCase() + word.slice(1),
          asset: { type: "video_lookup", label: word },
          duration: 2000,
          fingerspelled: false,
          word,
          videoLookup: true,
          allowFingerspellingFallback: fingerspellingFallback,
        });
      }
    }
  }

  // Determine status
  let status;
  if (signSequence.length === 0) {
    status = unmatchedWords.length > 0 ? "no_signs" : "no_signs";
  } else {
    status = "ready";
  }

  return {
    originalText: text,
    gloss: signSequence.map((s) => s.gloss),
    signSequence,
    unmatchedWords,
    status,
    usedFingerspelling,
  };
}