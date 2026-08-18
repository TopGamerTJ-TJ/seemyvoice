import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { TRANSLATIONS, UI_LANGUAGES } from "@/data/uiTranslations";

const I18nContext = createContext(null);

const STORAGE_KEY = "sl-now-ui-lang";

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && TRANSLATIONS[stored]) return stored;
    } catch (e) {
      // ignore
    }
    return "en";
  });

  const langInfo = UI_LANGUAGES.find((l) => l.code === lang) || UI_LANGUAGES[0];

  // Set document direction for RTL languages
  useEffect(() => {
    document.documentElement.dir = langInfo.rtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, langInfo.rtl]);

  // Persist language choice
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // ignore
    }
  }, [lang]);

  const t = useCallback(
    (key, params) => {
      const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
      let str = dict[key] ?? TRANSLATIONS.en[key] ?? key;
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          str = str.replace(new RegExp(`\\{${k}\\}`, "g"), v);
        });
      }
      return str;
    },
    [lang]
  );

  const changeLang = useCallback((code) => {
    if (TRANSLATIONS[code]) setLang(code);
  }, []);

  return (
    <I18nContext.Provider value={{ lang, langInfo, t, changeLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}