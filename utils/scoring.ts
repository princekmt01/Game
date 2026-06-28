import { POINTS_PER_CORRECT } from "@/lib/constants";

export function calculateAccuracy(
  correctAnswers: number,
  wrongAnswers: number
): number {
  const total = correctAnswers + wrongAnswers;
  if (total === 0) return 0;
  return Math.round((correctAnswers / total) * 10000) / 100;
}

export function addCorrectAnswer(score: number, correctAnswers: number) {
  return {
    score: score + POINTS_PER_CORRECT,
    correctAnswers: correctAnswers + 1,
  };
}

export function addWrongAnswer(wrongAnswers: number) {
  return {
    wrongAnswers: wrongAnswers + 1,
  };
}
