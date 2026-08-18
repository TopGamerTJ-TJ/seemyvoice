import React, { useState, useCallback } from "react";
import TranslationInput from "@/components/TranslationInput";
import CountdownOverlay from "@/components/CountdownOverlay";
import TranslationResult from "@/components/TranslationResult";
import SettingsPanel from "@/components/SettingsPanel";
import { SettingsProvider, useSettings } from "@/components/SettingsContext";
import { translateToASL } from "@/utils/localTranslator";

/**
 * Home — the main screen for ASL Translate.
 *
 * States: idle → countdown → ready/playing/paused/error
 */
function HomeContent() {
  const { settings } = useSettings();
  const [text, setText] = useState("");
  const [appState, setAppState] = useState("idle"); // idle | countdown | result
  const [result, setResult] = useState(null);

  const handleTranslate = useCallback(() => {
    if (!text.trim() || appState !== "idle") return;
    setAppState("countdown");
  }, [text, appState]);

  const handleCountdownComplete = useCallback(() => {
    const translation = translateToASL(text, {
      fingerspellingFallback: settings.fingerspellingFallback,
    });
    setResult(translation);
    setAppState("result");
  }, [text, settings.fingerspellingFallback]);

  const handleNewTranslation = useCallback(() => {
    setResult(null);
    setAppState("idle");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SettingsPanel />

      {appState === "countdown" && (
        <CountdownOverlay onComplete={handleCountdownComplete} />
      )}

      <main className="min-h-screen flex flex-col">
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

        {appState === "result" && result && (
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12">
            <TranslationResult
              result={result}
              onNewTranslation={handleNewTranslation}
            />
          </div>
        )}
      </main>
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