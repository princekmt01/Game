import { createClient } from "./client";
import type { GameStats, Score } from "@/types";

export async function insertScore(stats: GameStats): Promise<Score> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("scores")
    .insert({
      player_name: stats.playerName,
      score: stats.score,
      correct_answers: stats.correctAnswers,
      wrong_answers: stats.wrongAnswers,
      accuracy: stats.accuracy,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Score;
}

export async function fetchTopScores(limit = 20): Promise<Score[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("scores")
    .select("*")
    .order("score", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Score[];
}

export async function checkScoresTable(): Promise<boolean> {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("scores").select("id").limit(1);
    return !error;
  } catch {
    return false;
  }
}
