import React from "react";
import {
  BookOpen,
  Languages,
  Users,
  Hand,
  Globe,
  Play,
  Sparkles,
} from "lucide-react";
import { useI18n } from "@/components/I18nContext";
import { SIGN_LANGUAGES } from "@/data/signLanguages";

/**
 * HomeShowcase — visual sections shown only on the homepage, beneath the
 * translation engine: live stats, about, how-it-works, and features.
 */
export default function HomeShowcase({ stats }) {
  const { t } = useI18n();
  const words = (stats?.totalWords ?? 0).toLocaleString();
  const langCount = SIGN_LANGUAGES.length;
  const totalSigners = SIGN_LANGUAGES.reduce((sum, l) => sum + (l.speakers || 0), 0);
  const signersDisplay =
    totalSigners >= 1_000_000
      ? `${(totalSigners / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`
      : totalSigners >= 1_000
      ? `${Math.round(totalSigners / 1_000)}K`
      : `${totalSigners}`;

  const statCards = [
    { value: words, label: t("wordsTranslated"), icon: BookOpen, gradient: "from-sky-500 to-cyan-500" },
    { value: langCount, label: t("languagesSupported"), icon: Languages, gradient: "from-cyan-500 to-emerald-500" },
    { value: signersDisplay, label: t("peopleWhoSign"), icon: Users, gradient: "from-violet-400 to-sky-400" },
  ];

  const steps = [
    { title: t("step1Title"), text: t("step1Text"), icon: Hand, gradient: "from-sky-500 to-cyan-500" },
    { title: t("step2Title"), text: t("step2Text"), icon: Languages, gradient: "from-cyan-500 to-emerald-500" },
    { title: t("step3Title"), text: t("step3Text"), icon: Play, gradient: "from-emerald-500 to-teal-500" },
  ];

  const features = [
    { title: t("feature1Title"), text: t("feature1Text"), icon: Languages, gradient: "from-sky-500 to-cyan-500" },
    { title: t("feature2Title"), text: t("feature2Text"), icon: Play, gradient: "from-cyan-500 to-emerald-500" },
    { title: t("feature3Title"), text: t("feature3Text"), icon: Hand, gradient: "from-emerald-500 to-teal-500" },
    { title: t("feature4Title"), text: t("feature4Text"), icon: Globe, gradient: "from-violet-400 to-sky-400" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mt-20 space-y-20">
      {/* Live stats */}
      <section>
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent mb-6">
          {t("liveStats")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {statCards.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="group relative rounded-3xl border border-border/60 bg-card p-6 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <div className={`mx-auto mb-4 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${s.gradient} shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-extrabold text-foreground tabular-nums">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* About */}
      <section className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold uppercase tracking-wider dark:bg-violet-500/15 dark:text-violet-300">
          <Sparkles className="w-3.5 h-3.5" />
          {t("aboutBadge")}
        </span>
        <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          {t("aboutTitle")}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          {t("aboutText")}
        </p>
      </section>

      {/* How it works */}
      <section>
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mb-10">
          {t("howItWorks")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="relative rounded-3xl border border-border/60 bg-card p-6 text-center shadow-sm">
                <div className={`mx-auto mb-4 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br ${s.gradient} text-white text-xs font-bold`}>
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mb-10">
          {t("featuresTitle")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group rounded-3xl border border-border/60 bg-card p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <div className={`mb-4 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${f.gradient} shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-bold text-foreground">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.text}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}