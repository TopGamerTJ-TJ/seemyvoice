import React, { useState } from "react";
import { Settings as SettingsIcon, X, Gauge, Eye, Moon, Type, Hand } from "lucide-react";
import { useSettings } from "@/components/SettingsContext";
import { useI18n } from "@/components/I18nContext";

const SPEEDS = [0.5, 0.75, 1, 1.25];

/**
 * SettingsPanel — slide-over panel for user preferences.
 */
export default function SettingsPanel() {
  const { settings, updateSetting, toggleSetting } = useSettings();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open settings"
        className="fixed top-4 right-4 z-30 inline-flex items-center justify-center w-11 h-11 rounded-full bg-card border border-border shadow-sm hover:bg-secondary transition-colors"
      >
        <SettingsIcon className="w-5 h-5 text-foreground" />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-card shadow-2xl transition-transform duration-300 overflow-y-auto ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Settings"
      >
        <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card z-10">
          <h2 className="text-xl font-bold text-foreground">{t("settings")}</h2>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close settings"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Signing speed */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Gauge className="w-4 h-4 text-muted-foreground" />
              <label className="text-sm font-semibold text-foreground">
                {t("signingSpeed")}
              </label>
            </div>
            <div className="flex gap-2">
              {SPEEDS.map((s) => (
                <button
                  key={s}
                  onClick={() => updateSetting("signingSpeed", s)}
                  aria-pressed={settings.signingSpeed === s}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    settings.signingSpeed === s
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s}×
                </button>
              ))}
            </div>
          </div>

          {/* Reduced motion */}
          <ToggleRow
            icon={<Eye className="w-4 h-4" />}
            label={t("reducedMotion")}
            description={t("reducedMotionDesc")}
            checked={settings.reducedMotion}
            onChange={() => toggleSetting("reducedMotion")}
          />

          {/* Dark mode */}
          <ToggleRow
            icon={<Moon className="w-4 h-4" />}
            label={t("darkMode")}
            description={t("darkModeDesc")}
            checked={settings.darkMode}
            onChange={() => toggleSetting("darkMode")}
          />

          {/* Show gloss */}
          <ToggleRow
            icon={<Type className="w-4 h-4" />}
            label={t("showGloss")}
            description={t("showGlossDesc")}
            checked={settings.showGloss}
            onChange={() => toggleSetting("showGloss")}
          />

          {/* Fingerspelling fallback */}
          <ToggleRow
            icon={<Hand className="w-4 h-4" />}
            label={t("fingerspellingFallback")}
            description={t("fingerspellingFallbackDesc")}
            checked={settings.fingerspellingFallback}
            onChange={() => toggleSetting("fingerspellingFallback")}
          />
        </div>
      </div>
    </>
  );
}

function ToggleRow({ icon, label, description, checked, onChange }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="text-muted-foreground mt-0.5">{icon}</div>
        <div>
          <p className="text-sm font-semibold text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onChange}
        className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-muted-foreground/30"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}