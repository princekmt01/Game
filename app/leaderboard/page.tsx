"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Radio } from "lucide-react";
import { fadeInUp, pageTransition } from "@/animations/variants";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LeaderboardPage() {
  const { scores, loading, error } = useLeaderboard();

  return (
    <motion.div {...pageTransition} className="space-y-6">
      <motion.div {...fadeInUp} className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            <Radio className="h-3.5 w-3.5" />
            Live updates enabled
          </div>
          <h1 className="text-4xl font-black tracking-tight">Leaderboard</h1>
          <p className="mt-2 text-muted-foreground">
            Top 20 scores ranked by highest score.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back Home
          </Link>
        </Button>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Top Players</CardTitle>
          <CardDescription>
            Scores update in realtime when new games are submitted.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LeaderboardTable scores={scores} loading={loading} error={error} />
        </CardContent>
      </Card>
    </motion.div>
  );
}
