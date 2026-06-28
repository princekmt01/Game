"use client";

import Link from "next/link";
import { Trophy, Zap } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 text-primary">
            <Zap className="h-5 w-5" />
          </span>
          <span className="text-lg sm:text-xl">Math Sprint</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/leaderboard"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
          >
            <Trophy className="h-4 w-4" />
            <span className="hidden sm:inline">Leaderboard</span>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
