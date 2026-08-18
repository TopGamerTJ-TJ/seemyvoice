import React from "react";
import { AlertCircle, Info } from "lucide-react";
import SigningPlayer from "@/components/SigningPlayer";
import { useSettings } from "@/components/SettingsContext";
import { getSignLanguage } from "@/data/signLanguages";

/**
 * TranslationResult — displays the ASL translation output.
 *
 * Shows:
 *   - Original text
 *   - SigningPlayer with the sign sequence
 *   - ASL gloss reference (clearly labeled as reference, not written ASL)
 *   - Unmatched words with "sign unavailable" indicators
 *   - Fingerspelling notice
 */
export default function TranslationResult({ result, onNewTranslation }) {
  const { settings } = useSettings();
  const { originalText, translatedText, sourceLanguage, wasTranslated, signSequence, unmatchedWords, usedFingerspelling, status } = result;
  const langInfo = getSignLanguage(settings.signLanguage || "asl");

  // Error: no signs found at all
  if (status === "no_signs" || signSequence.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-6">
          <AlertCircle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-3">
          We couldn't find signs for this phrase yet.
        </h2>
        <p className="text-muted-foreground mb-2">
          You typed: <span className="font-medium text-foreground">"{originalText}"</span>
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          The local ASL sign library may not include these words yet.
        </p>
        <button
          onClick={onNewTranslation}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
        >
          Try Another Phrase
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
          {langInfo.name} Translation
        </h1>
        {wasTranslated ? (
          <>
            <p className="text-sm text-muted-foreground mt-2">
              Translated from {sourceLanguage}
            </p>
            <p className="text-muted-foreground mt-1 italic">
              "{originalText}"
            </p>
            <p className="text-foreground mt-2 font-medium">
              → "{translatedText}"
            </p>
          </>
        ) : (
          <p className="text-muted-foreground mt-2 italic">
            "{originalText}"
          </p>
        )}
      </div>

      {/* Signing player */}
      <SigningPlayer
        signSequence={signSequence}
        onNewTranslation={onNewTranslation}
      />

      {/* ASL Gloss reference */}
      {settings.showGloss && (
        <div className="mt-8 p-6 rounded-2xl bg-secondary/50 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
              ASL reference
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {signSequence.map((sign, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <span className="text-muted-foreground font-bold">•</span>
                )}
                {sign.fingerspelled ? (
                  <span className="px-3 py-1 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-semibold">
                    {sign.gloss}
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-semibold">
                    {sign.gloss}
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
          {unmatchedWords.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {unmatchedWords.map((word, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-destructive/10 text-destructive text-sm font-medium border border-destructive/20"
                >
                  [{word} — sign unavailable]
                </span>
              ))}
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
            This is a gloss reference for the sign sequence, not written ASL.
            A gloss does not represent the full visual or grammatical content of ASL.
          </p>
        </div>
      )}

      {/* Fingerspelling notice */}
      {usedFingerspelling && (
        <div className="mt-4 flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 dark:text-amber-200">
            Some words are being <strong>fingerspelled</strong> letter by letter
            because they don't have a dedicated sign in the local library yet.
          </p>
        </div>
      )}

      {/* Local library notice */}
      <div className="mt-4 flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800 dark:text-blue-200">
          This translation uses the app's local ASL sign library. Signs shown as
          placeholders will be replaced with verified signing assets as they become available.
        </p>
      </div>
    </div>
  );
}