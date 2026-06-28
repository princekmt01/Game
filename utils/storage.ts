import type { GameSession } from "@/types";
import { GAME_RESULT_KEY, PLAYER_NAME_KEY } from "@/lib/constants";

export function savePlayerName(name: string) {
  sessionStorage.setItem(PLAYER_NAME_KEY, name.trim());
}

export function getPlayerName(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(PLAYER_NAME_KEY);
}

export function saveGameResult(result: GameSession) {
  sessionStorage.setItem(GAME_RESULT_KEY, JSON.stringify(result));
}

export function getGameResult(): GameSession | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(GAME_RESULT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as GameSession;
  } catch {
    return null;
  }
}

export function markGameResultSubmitted() {
  const result = getGameResult();
  if (!result) return;
  saveGameResult({ ...result, submitted: true });
}

export function clearGameResult() {
  sessionStorage.removeItem(GAME_RESULT_KEY);
}
