import confetti from "canvas-confetti";
import { CONFETTI_SCORE_THRESHOLD } from "@/lib/constants";

export function triggerConfettiIfHighScore(score: number) {
  if (score <= CONFETTI_SCORE_THRESHOLD) return;

  const duration = 2500;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}
