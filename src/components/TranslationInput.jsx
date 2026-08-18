import React from "react";
import SignLanguageSelector from "@/components/SignLanguageSelector";
import { useSettings } from "@/components/SettingsContext";
import { useI18n } from "@/components/I18nContext";
import { getSignLanguage } from "@/data/signLanguages";

const MAX_LENGTH = 20000;

const EXAMPLE_PHRASES = [
  "Hello, how are you?",          // English
  "Hola, ¿cómo estás?",           // Spanish
  "Bonjour, comment ça va?",       // French
  "Привіт, як справи?",            // Ukrainian
  "Hallo, wie geht's?",            // German
  "Ciao, come stai?",              // Italian
  "Olá, como vai?",                // Portuguese
  "你好，你好吗？",                  // Chinese
  "こんにちは、お元気ですか？",        // Japanese
  "안녕하세요, 어떻게 지내세요?",      // Korean
  "مرحبا، كيف حالك؟",              // Arabic
  "नमस्ते, आप कैसे हैं?",          // Hindi
];

/**
 * TranslationInput — the text input interface on the home screen.
 * Accepts text in any language; the selected sign language determines
 * which video dictionary is used for playback.
 */
export default function TranslationInput({ text, setText, onTranslate, disabled }) {
  const { settings } = useSettings();
  const { t } = useI18n();
  const langInfo = getSignLanguage(settings.signLanguage || "asl");

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Logo / Title */}
      <div className="text-center mb-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-serif mb-3 bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
          SL <span className="italic">Now</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground">
          {t("tagline")}
        </p>
      </div>

      {/* Sign language selector */}
      <div className="mb-6">
        <SignLanguageSelector />
      </div>

      {/* Text box */}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX_LENGTH))}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              if (!disabled && text.trim()) onTranslate();
            }
          }}
          placeholder={t("placeholder")}
          maxLength={MAX_LENGTH}
          aria-label="Text to translate to sign language"
          className="w-full min-h-[140px] sm:min-h-[160px] p-5 sm:p-6 text-lg rounded-3xl border border-border bg-card text-card-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
        />
        <div className="absolute bottom-4 right-5 text-sm text-muted-foreground tabular-nums">
          {text.length}/{MAX_LENGTH}
        </div>
      </div>

      {/* Translate button */}
      <button
        onClick={onTranslate}
        disabled={disabled || !text.trim()}
        aria-label={`${t("translateTo")} ${langInfo.name}`}
        className="w-full mt-5 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 text-white text-lg font-semibold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-cyan-500/30 active:scale-[0.99]"
      >
        {t("translateTo")} {langInfo.shortName} →
      </button>

      {/* Example phrases */}
      <div className="mt-8 flex flex-col items-center">
        <p className="text-sm font-medium text-muted-foreground mb-3 text-center">
          {t("tryExample")}
        </p>
        <div className="flex flex-wrap gap-2 justify-center max-w-2xl">
          {EXAMPLE_PHRASES.map((phrase) => (
            <button
              key={phrase}
              onClick={() => setText(phrase)}
              className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:border-cyan-400 hover:text-cyan-600 transition-colors border border-border/50"
            >
              {phrase}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}