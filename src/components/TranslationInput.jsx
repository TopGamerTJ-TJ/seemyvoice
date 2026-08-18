import React from "react";

const MAX_LENGTH = 500;

const EXAMPLE_PHRASES = [
  "Hello",
  "Thank you",
  "How are you?",
  "What is your name?",
  "My name is...",
  "Where is the bathroom?",
  "What time is it?",
  "I love you",
  "Nice to meet you",
  "Can you help me?",
  "I am learning ASL",
  "Where are you from?",
];

/**
 * TranslationInput — the text input interface on the home screen.
 */
export default function TranslationInput({ text, setText, onTranslate, disabled }) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Logo / Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-3">
          ASL Translate
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground">
          Type English. See it in American Sign Language.
        </p>
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
          placeholder="Type something you want to sign..."
          maxLength={MAX_LENGTH}
          aria-label="English text to translate to ASL"
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
        aria-label="Translate to ASL"
        className="w-full mt-5 py-4 sm:py-5 rounded-2xl bg-primary text-primary-foreground text-lg font-semibold hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/10 active:scale-[0.99]"
      >
        Translate to ASL →
      </button>

      {/* Example phrases */}
      <div className="mt-8">
        <p className="text-sm font-medium text-muted-foreground mb-3 text-center">
          Try an example
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {EXAMPLE_PHRASES.map((phrase) => (
            <button
              key={phrase}
              onClick={() => setText(phrase)}
              className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/70 transition-colors border border-border/50"
            >
              {phrase}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}