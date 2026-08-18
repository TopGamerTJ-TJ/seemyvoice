import React from "react";
import { SIGN_LANGUAGES } from "@/data/signLanguages";
import { useSettings } from "@/components/SettingsContext";

/**
 * SignLanguageSelector — a button group for choosing the target sign language.
 */
export default function SignLanguageSelector() {
  const { settings, updateSetting } = useSettings();
  const current = settings.signLanguage || "asl";

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-sm font-medium text-muted-foreground">
        Target sign language
      </span>
      <div className="flex items-center gap-2 p-1 rounded-full bg-secondary">
        {SIGN_LANGUAGES.map((lang) => (
          <button
            key={lang.id}
            onClick={() => updateSetting("signLanguage", lang.id)}
            aria-pressed={current === lang.id}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
              current === lang.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {lang.shortName}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground/70">
        {SIGN_LANGUAGES.find((l) => l.id === current)?.source}
      </p>
    </div>
  );
}