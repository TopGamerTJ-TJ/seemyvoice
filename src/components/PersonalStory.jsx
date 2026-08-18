import React from "react";
import { Heart } from "lucide-react";

/**
 * PersonalStory — a short founder note from Tejus Bhasin explaining
 * why SL Now was built. Rendered on the homepage between the
 * translation input and the stats showcase.
 */
export default function PersonalStory() {
  return (
    <section className="w-full max-w-2xl mx-auto mt-12">
      <div className="relative rounded-3xl border border-border/60 bg-gradient-to-br from-sky-50 via-cyan-50 to-emerald-50 p-6 sm:p-8 shadow-sm overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-violet-200/40 to-sky-200/20 blur-2xl pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-500 shadow-lg">
              <Heart className="w-4.5 h-4.5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-foreground">A personal note from the maker</h3>
          </div>
          <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
            I'm Tejus Bhasin. I built SL Now because I saw, firsthand, that the
            people around me who are deaf or hard of hearing struggled to be
            understood — not because they couldn't communicate, but because so few
            people around them knew any sign language at all. The barrier was
            awareness, not ability. As a hearing-impaired user myself, I wanted to
            close that gap: to make signing something anyone can reach in a moment,
            right from their phone, in their own language.
          </p>
          <p className="mt-4 text-sm font-medium text-muted-foreground">
            — Tejus Bhasin, Creator of SL Now
          </p>
        </div>
      </div>
    </section>
  );
}