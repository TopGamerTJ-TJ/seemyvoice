import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

/**
 * LegalLayout — shared wrapper for Terms and Privacy pages.
 */
export default function LegalLayout({ title, lastUpdated, children }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to SeeMyVoice
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading mb-2">
          {title}
        </h1>
        {lastUpdated && (
          <p className="text-sm text-muted-foreground mb-10">
            Last updated: {lastUpdated}
          </p>
        )}

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-foreground/90 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}