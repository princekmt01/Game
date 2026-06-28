"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { fetchTopScores } from "@/lib/supabase/scores";
import { LEADERBOARD_LIMIT } from "@/lib/constants";
import type { Score } from "@/types";

export function useLeaderboard() {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadScores = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setError("Supabase is not configured. Add your credentials to .env.local.");
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const data = await fetchTopScores(LEADERBOARD_LIMIT);
      setScores(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load leaderboard.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadScores();
  }, [loadScores]);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const supabase = createClient();

    const channel = supabase
      .channel("scores-leaderboard")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "scores" },
        () => {
          loadScores();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadScores]);

  return { scores, loading, error, reload: loadScores };
}
