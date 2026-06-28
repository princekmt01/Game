"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimerProps {
  timeLeft: number;
  progress: number;
  isUrgent: boolean;
}

export function Timer({ timeLeft, progress, isUrgent }: TimerProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between">
        <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Time Left
        </span>
        <motion.span
          key={timeLeft}
          initial={{ scale: 1.2, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          className={cn(
            "text-3xl font-black tabular-nums",
            isUrgent ? "text-red-400" : "text-foreground"
          )}
        >
          {timeLeft}s
        </motion.span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className={cn(
            "h-full rounded-full bg-gradient-to-r from-primary to-violet-400",
            isUrgent && "from-red-500 to-orange-400"
          )}
          animate={{
            width: `${progress}%`,
            opacity: isUrgent ? [1, 0.65, 1] : 1,
          }}
          transition={{
            width: { duration: 0.35, ease: "easeOut" },
            opacity: isUrgent
              ? { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.2 },
          }}
        />
      </div>
    </div>
  );
}
