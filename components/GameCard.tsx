"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { AnswerFlash } from "@/types";
import { QuestionCard } from "@/components/QuestionCard";
import { ScoreBoard } from "@/components/ScoreBoard";
import { Timer } from "@/components/Timer";
import { Input } from "@/components/ui/input";
import type { Question } from "@/types";

interface GameCardProps {
  question: Question;
  answer: string;
  onAnswerChange: (value: string) => void;
  onSubmit: () => void;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  accuracy: number;
  timeLeft: number;
  progress: number;
  isUrgent: boolean;
  flash: AnswerFlash;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export function GameCard({
  question,
  answer,
  onAnswerChange,
  onSubmit,
  score,
  correctAnswers,
  wrongAnswers,
  accuracy,
  timeLeft,
  progress,
  isUrgent,
  flash,
  inputRef,
}: GameCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      <AnimateFlash flash={flash} />

      <div className="mb-8">
        <Timer timeLeft={timeLeft} progress={progress} isUrgent={isUrgent} />
      </div>

      <div className="mb-8 min-h-[140px] flex items-center justify-center">
        <QuestionCard question={question} />
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        className="mx-auto mb-8 max-w-sm space-y-3"
      >
        <Input
          ref={inputRef}
          type="number"
          inputMode="numeric"
          placeholder="Your answer"
          value={answer}
          onChange={(event) => onAnswerChange(event.target.value)}
          autoComplete="off"
          aria-label="Answer input"
        />
        <p className="text-center text-xs text-muted-foreground">
          Press Enter to submit
        </p>
      </form>

      <ScoreBoard
        score={score}
        correctAnswers={correctAnswers}
        wrongAnswers={wrongAnswers}
        accuracy={accuracy}
      />
    </div>
  );
}

function AnimateFlash({ flash }: { flash: AnswerFlash }) {
  if (!flash) return null;

  return (
    <motion.div
      initial={{ opacity: 0.45 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "pointer-events-none absolute inset-0 z-10",
        flash === "correct" ? "bg-emerald-400/25" : "bg-red-500/25"
      )}
    />
  );
}
