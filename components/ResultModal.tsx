"use client";

import { motion } from "framer-motion";
import { RotateCcw, Target, Trophy, XCircle } from "lucide-react";
import Link from "next/link";
import { scaleIn } from "@/animations/variants";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ResultModalProps {
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  accuracy: number;
  playerName: string;
  submitStatus: "idle" | "submitting" | "success" | "error";
  submitError?: string | null;
}

export function ResultModal({
  score,
  correctAnswers,
  wrongAnswers,
  accuracy,
  playerName,
  submitStatus,
  submitError,
}: ResultModalProps) {
  const animatedScore = useAnimatedCounter(score);

  const stats = [
    { label: "Correct", value: correctAnswers, icon: Target },
    { label: "Wrong", value: wrongAnswers, icon: XCircle },
    { label: "Accuracy", value: `${accuracy}%`, icon: Trophy },
  ];

  return (
    <motion.div {...scaleIn} transition={{ duration: 0.4 }}>
      <Card className="mx-auto max-w-xl text-center">
        <CardHeader className="items-center">
          <CardDescription>Time&apos;s up, {playerName}!</CardDescription>
          <CardTitle className="text-4xl sm:text-5xl">Final Score</CardTitle>
          <motion.p
            key={animatedScore}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            className="bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-6xl font-black text-transparent sm:text-7xl"
          >
            {animatedScore}
          </motion.p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4"
              >
                <stat.icon className="mx-auto mb-2 h-4 w-4 text-muted-foreground" />
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {submitStatus === "submitting" && (
            <p className="text-sm text-muted-foreground">Saving your score...</p>
          )}
          {submitStatus === "success" && (
            <p className="text-sm text-emerald-400">Score saved to the leaderboard!</p>
          )}
          {submitStatus === "error" && (
            <p className="text-sm text-red-400">
              {submitError ?? "Could not save score. Check your Supabase setup."}
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href="/game">
                <RotateCcw className="h-4 w-4" />
                Play Again
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/leaderboard">View Leaderboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
