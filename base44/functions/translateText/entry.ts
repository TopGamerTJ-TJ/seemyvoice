/**
 * translateText — translates text in any language to English
 * using Google Translate's free endpoint (no API key, no AI).
 * Falls back to the built-in LLM if the free endpoint is unavailable.
 *
 * Input:  { text: string }
 * Output: { translatedText: string, sourceLanguage: string, wasTranslated: boolean }
 */
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

const LANGUAGE_NAMES = {
  en: "English", uk: "Ukrainian", es: "Spanish", fr: "French", de: "German",
  it: "Italian", pt: "Portuguese", ru: "Russian", zh: "Chinese", ja: "Japanese",
  ko: "Korean", ar: "Arabic", hi: "Hindi", nl: "Dutch", pl: "Polish",
  tr: "Turkish", sv: "Swedish", no: "Norwegian", da: "Danish", fi: "Finnish",
  cs: "Czech", el: "Greek", he: "Hebrew", th: "Thai", vi: "Vietnamese",
  id: "Indonesian", ms: "Malay", ro: "Romanian", hu: "Hungarian", sk: "Slovak",
  bg: "Bulgarian", hr: "Croatian", sr: "Serbian", sl: "Slovenian", lt: "Lithuanian",
  lv: "Latvian", et: "Estonian", fa: "Persian", ur: "Urdu", bn: "Bengali",
  ta: "Tamil", te: "Telugu", ml: "Malayalam", mr: "Marathi", gu: "Gujarati",
  pa: "Punjabi", sw: "Swahili", tl: "Filipino", cy: "Welsh", ga: "Irish",
  is: "Icelandic", sq: "Albanian", mk: "Macedonian", be: "Belarusian",
  ca: "Catalan", eu: "Basque", gl: "Galician", af: "Afrikaans", la: "Latin",
  az: "Azerbaijani", uz: "Uzbek", kk: "Kazakh", ky: "Kyrgyz", tg: "Tajik",
  mn: "Mongolian", my: "Burmese", km: "Khmer", lo: "Lao", si: "Sinhala",
  ne: "Nepali", am: "Amharic", zu: "Zulu", xh: "Xhosa", yo: "Yoruba",
  ha: "Hausa", ig: "Igbo", st: "Southern Sotho", ny: "Chichewa",
};

function chunkText(text, maxLen = 4000) {
  if (text.length <= maxLen) return [text];
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    let end = Math.min(start + maxLen, text.length);
    if (end < text.length) {
      const lastSpace = text.lastIndexOf(" ", end);
      if (lastSpace > start + 100) end = lastSpace;
    }
    chunks.push(text.slice(start, end).trim());
    start = end;
  }
  return chunks.filter(Boolean);
}

async function translateWithGoogle(text) {
  const chunks = chunkText(text);
  const translatedChunks = [];
  let detectedLang = "en";

  for (const chunk of chunks) {
    const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=" + encodeURIComponent(chunk);

    const resp = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ASLTranslate/1.0)",
        "Accept": "application/json",
      },
    });

    if (!resp.ok) {
      throw new Error("Google Translate returned " + resp.status);
    }

    const data = await resp.json();
    const segments = (data[0] || []).map(function(seg) { return seg[0] || ""; });
    translatedChunks.push(segments.join(""));

    if (data[2]) detectedLang = data[2];
  }

  const translatedText = translatedChunks.join("").trim();
  const sourceLanguage = LANGUAGE_NAMES[detectedLang] || detectedLang || "Unknown";
  const wasTranslated = detectedLang !== "en";

  return { translatedText: translatedText, sourceLanguage: sourceLanguage, wasTranslated: wasTranslated };
}

export default async function(req) {
  try {
    const body = await req.json();
    const text = body?.text;

    if (!text || typeof text !== "string" || !text.trim()) {
      return Response.json({ error: "text is required" }, { status: 400 });
    }

    try {
      // Primary: free Google Translate endpoint (no API key, no AI)
      const result = await translateWithGoogle(text);
      return Response.json(result);
    } catch (googleError) {
      // Fallback: LLM translation if the free endpoint is unavailable
      const base44 = createClientFromRequest(req);
      const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt: "You are a translation engine. Translate the following text to English. If the text is already in English, return it unchanged. Detect the source language and provide its name in English.\n\nText:\n\"\"\"" + text + "\"\"\"",
        response_json_schema: {
          type: "object",
          properties: {
            translatedText: { type: "string" },
            sourceLanguage: { type: "string" }
          },
          required: ["translatedText", "sourceLanguage"]
        }
      });

      const translatedText = (result?.translatedText || text).trim();
      const sourceLanguage = (result?.sourceLanguage || "Unknown").trim();
      const wasTranslated = sourceLanguage.toLowerCase() !== "english";

      return Response.json({ translatedText: translatedText, sourceLanguage: sourceLanguage, wasTranslated: wasTranslated });
    }
  } catch (error) {
    return Response.json({ error: error.message, translatedText: null }, { status: 500 });
  }
}