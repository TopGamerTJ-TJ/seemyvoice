import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const SettingsContext = createContext(null);

const STORAGE_KEY = "asl-translate-settings";

const defaultSettings = {
  signingSpeed: 1,        // 0.5, 0.75, 1, 1.25
  reducedMotion: false,
  darkMode: false,
  showGloss: true,
  fingerspellingFallback: true,
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return { ...defaultSettings, ...JSON.parse(stored) };
    } catch (e) {
      // ignore
    }
    return defaultSettings;
  });

  // Apply dark mode class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (settings.darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [settings.darkMode]);

  // Persist settings
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      // ignore
    }
  }, [settings]);

  const updateSetting = useCallback((key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const toggleSetting = useCallback((key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, toggleSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}