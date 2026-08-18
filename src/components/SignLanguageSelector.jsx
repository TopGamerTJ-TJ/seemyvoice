import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SIGN_LANGUAGES } from "@/data/signLanguages";
import { useSettings } from "@/components/SettingsContext";

const PRIMARY_IDS = ["asl", "lse", "lsf", "lis", "intl"];

/**
 * SignLanguageSelector — a button group for choosing the target sign language.
 * Shows a primary set of languages with a "Show more" button to reveal all.
 */
export default function SignLanguageSelector() {
  const { settings, updateSetting } = useSettings();
  const current = settings.signLanguage || "asl";
  const [showAll, setShowAll] = useState(false);

  const primary = SIGN_LANGUAGES.filter((l) => PRIMARY_IDS.includes(l.id));
  const rest = SIGN_LANGUAGES.filter((l) => !PRIMARY_IDS.includes(l.id));
  const visible = showAll ? [...primary, ...rest] : primary;

  const currentLang = SIGN_LANGUAGES.find((l) => l.id === current);
  const isCurrentInRest = !PRIMARY_IDS.includes(current);

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-sm font-medium text-muted-foreground">
        Target sign language
      </span>
      <div className="flex flex-wrap items-center justify-center gap-2 p-1 rounded-2xl bg-secondary max-w-2xl">
        {visible.map((lang) => (
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
      {showAll ? (
        <button
          onClick={() => setShowAll(false)}
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Show less
          <ChevronUp className="w-4 h-4" />
        </button>
      ) : (
        <button
          onClick={() => setShowAll(true)}
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Show more
          <ChevronDown className="w-4 h-4" />
        </button>
      )}
      <p className="text-sm font-medium text-foreground/80">
        {currentLang?.name}
      </p>
      <p className="text-xs text-muted-foreground/70">
        Source: {currentLang?.source}
      </p>
      {isCurrentInRest && !showAll && (
        <p className="text-xs text-amber-600 dark:text-amber-400">
          Selected language is in the full list — click "Show more" to view it.
        </p>
      )}
    </div>
  );
}