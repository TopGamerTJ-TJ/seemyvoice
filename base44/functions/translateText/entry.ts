/**
 * translateText — translates text in any language to English
 * using the built-in LLM integration.
 *
 * Input:  { text: string }
 * Output: { translatedText: string, sourceLanguage: string, wasTranslated: boolean }
 */
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const text = body?.text;

    if (!text || typeof text !== "string" || !text.trim()) {
      return Response.json({ error: "text is required" }, { status: 400 });
    }

    // Use the LLM to detect language and translate to English.
    // response_json_schema returns a parsed dict directly.
    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: `You are a translation engine. Translate the following text to English.\n\nRules:\n- If the text is already in English, return it unchanged.\n- Detect the source language and provide its name in English.\n- Return ONLY the translation, no explanations or commentary.\n- Preserve the original meaning, punctuation, and sentence structure.\n\nText to translate:\n"""${text}"""`,
      response_json_schema: {
        type: "object",
        properties: {
          translatedText: {
            type: "string",
            description: "The English translation of the input text."
          },
          sourceLanguage: {
            type: "string",
            description: "The detected source language name in English (e.g. 'Ukrainian', 'Spanish', 'English')."
          }
        },
        required: ["translatedText", "sourceLanguage"]
      }
    });

    const translatedText = (result?.translatedText || text).trim();
    const sourceLanguage = (result?.sourceLanguage || "Unknown").trim();
    const wasTranslated = sourceLanguage.toLowerCase() !== "english" && translatedText !== text.trim();

    return Response.json({
      translatedText,
      sourceLanguage,
      wasTranslated,
    });
  } catch (error) {
    return Response.json({ error: error.message, translatedText: null }, { status: 500 });
  }
}