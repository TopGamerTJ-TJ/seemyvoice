import React, { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { UI_LANGUAGES } from "@/data/uiTranslations";
import { useI18n } from "@/components/I18nContext";

/**
 * SiteLanguageSelector — compact dropdown at the top-left of the site
 * for changing the interface language (the language the site UI is displayed in).
 */
export default function SiteLanguageSelector() {
  const { lang, langInfo, changeLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-card border border-border shadow-sm text-foreground text-sm font-medium hover:bg-secondary transition-colors"
      >
        <Globe className="w-4 h-4 text-muted-foreground" />
        <span>{langInfo.nativeName}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-56 max-h-[60vh] overflow-y-auto rounded-2xl bg-popover border border-border shadow-xl z-50 p-2">
          {UI_LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                changeLang(l.code);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors text-left"
            >
              <span>
                <span className="font-medium">{l.nativeName}</span>
                <span className="block text-xs text-muted-foreground">{l.name}</span>
              </span>
              {lang === l.code && <Check className="w-4 h-4 text-primary shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}