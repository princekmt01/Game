"use client";

import { motion } from "framer-motion";
import { Calendar, Medal, Target, Trophy, User } from "lucide-react";
import { fadeInUp } from "@/animations/variants";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Score } from "@/types";

interface LeaderboardTableProps {
  scores: Score[];
  loading: boolean;
  error: string | null;
}

export function LeaderboardTable({ scores, loading, error }: LeaderboardTableProps) {
  if (loading) {
    return <LoadingSpinner label="Loading leaderboard..." />;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center text-sm text-red-200">
        {error}
      </div>
    );
  }

  if (scores.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
        <Trophy className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
        <p className="font-medium">No scores yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Be the first to play and claim the top spot!
        </p>
      </div>
    );
  }

  return (
    <motion.div {...fadeInUp} className="overflow-hidden rounded-2xl border border-white/10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>
              <span className="inline-flex items-center gap-1">
                <User className="h-3.5 w-3.5" /> Player
              </span>
            </TableHead>
            <TableHead>
              <span className="inline-flex items-center gap-1">
                <Medal className="h-3.5 w-3.5" /> Score
              </span>
            </TableHead>
            <TableHead>
              <span className="inline-flex items-center gap-1">
                <Target className="h-3.5 w-3.5" /> Accuracy
              </span>
            </TableHead>
            <TableHead className="hidden sm:table-cell">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> Date
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scores.map((entry, index) => (
            <TableRow key={entry.id}>
              <TableCell className="font-semibold">{index + 1}</TableCell>
              <TableCell className="font-medium">{entry.player_name}</TableCell>
              <TableCell className="font-bold text-primary">{entry.score}</TableCell>
              <TableCell>{Number(entry.accuracy).toFixed(1)}%</TableCell>
              <TableCell className="hidden text-muted-foreground sm:table-cell">
                {new Date(entry.created_at).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}
