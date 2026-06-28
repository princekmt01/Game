"use client";

import { motion } from "framer-motion";
import { Target, TrendingUp, XCircle } from "lucide-react";

interface ScoreBoardProps {
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  accuracy: number;
}

export function ScoreBoard({
  score,
  correctAnswers,
  wrongAnswers,
  accuracy,
}: ScoreBoardProps) {
  const items = [
    { label: "Score", value: score, icon: TrendingUp },
    { label: "Correct", value: correctAnswers, icon: Target },
    { label: "Wrong", value: wrongAnswers, icon: XCircle },
    { label: "Accuracy", value: `${accuracy}%`, icon: Target },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item) => (
        <motion.div
          key={item.label}
          layout
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
        >
          <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <item.icon className="h-3.5 w-3.5" />
            {item.label}
          </div>
          <motion.p
            key={String(item.value)}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold tabular-nums"
          >
            {item.value}
          </motion.p>
        </motion.div>
      ))}
    </div>
  );
}
