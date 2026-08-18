import React from "react";
import { Link } from "react-router-dom";

/**
 * SiteFooter — Terms/Privacy links + live stats (words translated, users).
 */
export default function SiteFooter({ stats }) {
  const words = (stats?.totalWords ?? 0).toLocaleString();
  const visitors = (stats?.totalVisitors ?? 0).toLocaleString();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-foreground tabular-nums">{words}</span>
            <span className="text-muted-foreground">words translated</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-foreground tabular-nums">{visitors}</span>
            <span className="text-muted-foreground">users</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link to="/terms" className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link to="/privacy" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}