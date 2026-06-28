"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { pageTransition } from "@/animations/variants";
import { GameCard } from "@/components/GameCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useGame } from "@/hooks/useGame";
import { useTimer } from "@/hooks/useTimer";
import { getPlayerName, saveGameResult } from "@/utils/storage";

export default function GamePage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [playerName, setPlayerName] = useState<string | null>(null);

  useEffect(() => {
    const name = getPlayerName();
    if (!name) {
      router.replace("/");
      return;
    }
    setPlayerName(name);
  }, [router]);

  const {
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
  } = useGame({ playerName: playerName ?? "Player" });

  const statsRef = useRef(getStats);
  statsRef.current = getStats;

  const onTimerComplete = useCallback(() => {
    const stats = statsRef.current();
    saveGameResult(stats);
    router.push("/result");
  }, [router]);

  const { timeLeft, progress, isUrgent } = useTimer({
    onComplete: onTimerComplete,
  });

  useEffect(() => {
    if (!playerName) return;
    inputRef.current?.focus();
  }, [question.text, playerName]);

  useEffect(() => {
    if (!playerName || timeLeft === 0) return;
    inputRef.current?.focus();
  }, [timeLeft, playerName]);

  if (!playerName) {
    return <LoadingSpinner label="Preparing game..." />;
  }

  return (
    <motion.div {...pageTransition} className="py-4">
      <GameCard
        question={question}
        answer={answer}
        onAnswerChange={setAnswer}
        onSubmit={submitAnswer}
        score={score}
        correctAnswers={correctAnswers}
        wrongAnswers={wrongAnswers}
        accuracy={accuracy}
        timeLeft={timeLeft}
        progress={progress}
        isUrgent={isUrgent}
        flash={flash}
        inputRef={inputRef}
      />
    </motion.div>
  );
}
