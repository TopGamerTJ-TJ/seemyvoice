import React, { useState, useCallback, useRef } from "react";
import { base44 } from "@/api/base44Client";
import TranslationInput from "@/components/TranslationInput";
import CountdownOverlay from "@/components/CountdownOverlay";
import TranslationResult from "@/components/TranslationResult";
import SettingsPanel from "@/components/SettingsPanel";
import { SettingsProvider, useSettings } from "@/components/SettingsContext";
import { translateToASL } from "@/utils/localTranslator";
import { useSiteStats } from "@/hooks/useSiteStats";
import SiteFooter from "@/components/SiteFooter";

/**
 * Home — the main screen for Sign Translate.
 *
 * Flow: idle → countdown → translating → ready/playing/paused
 * Text in any language is translated to English (via LLM), then
 * converted to a sign sequence for the selected sign language.
 */
function HomeContent() {
  const { settings } = useSettings();
  const { stats, trackTranslation } = useSiteStats();
  const [text, setText] = useState("");
  const [appState, setAppState] = useState("idle"); // idle | countdown | translating | result
  const [result, setResult] = useState(null);
  const translationPromiseRef = useRef(null);

  const handleTranslate = useCallback(() => {
    if (!text.trim() || appState !== "idle") return;
    // Start the LLM translation during the countdown to overlap the wait
    translationPromiseRef.current = base44.functions.invoke("translateText", { text });
    setAppState("countdown");
  }, [text, appState]);

  const handleCountdownComplete = useCallback(async () => {
    setAppState("translating");

    let englishText = text;
    let sourceLanguage = "English";
    let wasTranslated = false;

    if (translationPromiseRef.current) {
      try {
        const resp = await translationPromiseRef.current;
        if (resp.data?.translatedText) {
          englishText = resp.data.translatedText;
          sourceLanguage = resp.data.sourceLanguage || "English";
          wasTranslated = resp.data.wasTranslated || false;
        }
      } catch (e) {
        // Fallback: use original text as-is
      }
      translationPromiseRef.current = null;
    }

    const translation = translateToASL(englishText, {
      fingerspellingFallback: settings.fingerspellingFallback,
    });

    setResult({
      ...translation,
      originalText: text,
      translatedText: englishText,
      sourceLanguage,
      wasTranslated,
    });
    setAppState("result");

    const wordCount = englishText.trim().split(/\s+/).filter(Boolean).length;
    trackTranslation(wordCount);
  }, [text, settings.fingerspellingFallback, trackTranslation]);

  const handleNewTranslation = useCallback(() => {
    setResult(null);
    setAppState("idle");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SettingsPanel />

      {appState === "countdown" && (
        <CountdownOverlay onComplete={handleCountdownComplete} />
      )}

      <main className="flex-1 flex flex-col">
        {appState === "idle" && (
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
            <TranslationInput
              text={text}
              setText={setText}
              onTranslate={handleTranslate}
              disabled={appState !== "idle"}
            />
          </div>
        )}

        {appState === "translating" && (
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
            <div className="w-10 h-10 border-4 border-muted border-t-foreground rounded-full animate-spin mb-4" />
            <p className="text-muted-foreground">Translating to English…</p>
          </div>
        )}

        {appState === "result" && result && (
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12">
            <TranslationResult
              result={result}
              onNewTranslation={handleNewTranslation}
            />
          </div>
        )}
      </main>
      <SiteFooter stats={stats} />
    </div>
  );
}

export default function Home() {
  return (
    <SettingsProvider>
      <HomeContent />
    </SettingsProvider>
  );
}