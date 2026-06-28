"use client";

import { AnimatePresence, motion } from "framer-motion";
import { questionTransition } from "@/animations/variants";
import type { Question } from "@/types";

interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.text}
        {...questionTransition}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="text-center"
      >
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Solve this
        </p>
        <h2 className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl">
          {question.text}
        </h2>
      </motion.div>
    </AnimatePresence>
  );
}
