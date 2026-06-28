"use client";

import { useCallback, useMemo, useState } from "react";
import type { AnswerFlash, GameStats, Question } from "@/types";
import { generateQuestion } from "@/utils/questions";
import {
  addCorrectAnswer,
  addWrongAnswer,
  calculateAccuracy,
} from "@/utils/scoring";
import { playCorrectSound, playWrongSound } from "@/utils/sounds";

interface UseGameOptions {
  playerName: string;
}

export function useGame({ playerName }: UseGameOptions) {
  const [question, setQuestion] = useState<Question>(() => generateQuestion());
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [flash, setFlash] = useState<AnswerFlash>(null);

  const accuracy = useMemo(
    () => calculateAccuracy(correctAnswers, wrongAnswers),
    [correctAnswers, wrongAnswers]
  );

  const submitAnswer = useCallback(() => {
    const trimmed = answer.trim();
    if (!trimmed) return;

    const numericAnswer = Number(trimmed);
    if (Number.isNaN(numericAnswer)) return;

    const isCorrect = numericAnswer === question.answer;

    if (isCorrect) {
      playCorrectSound();
      setFlash("correct");
      const result = addCorrectAnswer(score, correctAnswers);
      setScore(result.score);
      setCorrectAnswers(result.correctAnswers);
    } else {
      playWrongSound();
      setFlash("wrong");
      const result = addWrongAnswer(wrongAnswers);
      setWrongAnswers(result.wrongAnswers);
    }

    setAnswer("");
    setQuestion(generateQuestion());

    window.setTimeout(() => setFlash(null), 250);
  }, [answer, correctAnswers, question.answer, score, wrongAnswers]);

  const getStats = useCallback((): GameStats => {
    return {
      playerName,
      score,
      correctAnswers,
      wrongAnswers,
      accuracy: calculateAccuracy(correctAnswers, wrongAnswers),
    };
  }, [correctAnswers, playerName, score, wrongAnswers]);

  return {
    question,
    answer,
    setAnswer,
    score,
    correctAnswers,
    wrongAnswers,
    accuracy,
    flash,
    submitAnswer,
    getStats,
  };
}
