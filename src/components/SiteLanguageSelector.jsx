import React, { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { SIGN_LANGUAGES, getSignLanguage } from "@/data/signLanguages";
import { useSettings } from "@/components/SettingsContext";

const PRIMARY_IDS = ["asl", "lse", "lsf", "lis", "intl"];

/**
 * SiteLanguageSelector — compact dropdown at the top-left of the site
 * for changing the active sign language from any screen.
 */
export default function SiteLanguageSelector() {
  const { settings, updateSetting } = useSettings();
  const current = settings.signLanguage || "asl";
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const currentLang = getSignLanguage(current);
  const primary = SIGN_LANGUAGES.filter((l) => PRIMARY_IDS.includes(l.id));
  const rest = SIGN_LANGUAGES.filter((l) => !PRIMARY_IDS.includes(l.id));

  const select = (id) => {
    updateSetting("signLanguage", id);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-secondary text-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
      >
        <Globe className="w-4 h-4 text-muted-foreground" />
        <span className="hidden sm:inline">{currentLang.name}</span>
        <span className="sm:hidden">{currentLang.shortName}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-64 max-h-[60vh] overflow-y-auto rounded-2xl bg-popover border border-border shadow-xl z-50 p-2">
          <p className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Popular
          </p>
          {primary.map((lang) => (
            <button
              key={lang.id}
              onClick={() => select(lang.id)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors text-left"
            >
              <span>
                <span className="font-medium">{lang.name}</span>
                <span className="block text-xs text-muted-foreground">{lang.source}</span>
              </span>
              {current === lang.id && <Check className="w-4 h-4 text-primary shrink-0" />}
            </button>
          ))}

          <div className="my-2 border-t border-border" />

          <p className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            All languages
          </p>
          {rest.map((lang) => (
            <button
              key={lang.id}
              onClick={() => select(lang.id)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors text-left"
            >
              <span>
                <span className="font-medium">{lang.name}</span>
                <span className="block text-xs text-muted-foreground">{lang.source}</span>
              </span>
              {current === lang.id && <Check className="w-4 h-4 text-primary shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}