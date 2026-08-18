/**
 * ASL Grammar Rules — local rules for common ASL sentence restructuring.
 *
 * These are simple, conservative rules. They do NOT represent full ASL grammar.
 * They handle a few well-known transformations (e.g., wh-questions moving
 * "where" to the end) and stopword filtering. The app never claims to produce
 * fluent ASL — only an ordered sign sequence from its local library.
 */

// Words that carry little meaning in ASL signing and are typically dropped.
export const stopwords = new Set([
  "the", "a", "an", "is", "are", "am", "to", "of", "at",
  "do", "does", "did", "for", "in", "on", "it", "its",
]);

/**
 * Apply local grammar rules to an array of normalized word tokens.
 * Returns a new array of tokens (possibly reordered/filtered).
 */
export function applyGrammarRules(tokens) {
  if (!tokens.length) return tokens;

  // Rule: "where is/where's X" → "X WHERE" (wh-word moves to end in ASL)
  if (tokens[0] === "where" && (tokens[1] === "is" || tokens[1] === "s")) {
    const rest = tokens.slice(2);
    return [...rest, "where"];
  }

  // Rule: "what is X" → "X WHAT"
  if (tokens[0] === "what" && (tokens[1] === "is" || tokens[1] === "are")) {
    const rest = tokens.slice(2);
    return [...rest, "what"];
  }

  // Rule: "who is X" → "X WHO"
  if (tokens[0] === "who" && (tokens[1] === "is" || tokens[1] === "are")) {
    const rest = tokens.slice(2);
    return [...rest, "who"];
  }

  return tokens;
}