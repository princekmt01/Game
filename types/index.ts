export type Operation = "+" | "-" | "×" | "÷";

export interface Question {
  text: string;
  answer: number;
  operation: Operation;
}

export interface GameStats {
  playerName: string;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  accuracy: number;
}

export interface Score {
  id: string;
  player_name: string;
  score: number;
  correct_answers: number;
  wrong_answers: number;
  accuracy: number;
  created_at: string;
}

export type AnswerFlash = "correct" | "wrong" | null;

export interface GameSession extends GameStats {
  submitted?: boolean;
}
