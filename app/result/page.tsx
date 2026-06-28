"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { pageTransition } from "@/animations/variants";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ResultModal } from "@/components/ResultModal";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { insertScore } from "@/lib/supabase/scores";
import { triggerConfettiIfHighScore } from "@/utils/confetti";
import {
  getGameResult,
  markGameResultSubmitted,
} from "@/utils/storage";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export default function ResultPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const hasSubmittedRef = useRef(false);

  const result = ready ? getGameResult() : null;

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const gameResult = getGameResult();
    if (!gameResult) {
      router.replace("/");
      return;
    }

    triggerConfettiIfHighScore(gameResult.score);

    if (gameResult.submitted || hasSubmittedRef.current) {
      setSubmitStatus("success");
      return;
    }

    if (!isSupabaseConfigured()) {
      setSubmitStatus("error");
      setSubmitError(
        "Supabase is not configured. Add your credentials to .env.local and restart the dev server."
      );
      return;
    }

    hasSubmittedRef.current = true;
    setSubmitStatus("submitting");

    insertScore(gameResult)
      .then(() => {
        markGameResultSubmitted();
        setSubmitStatus("success");
      })
      .catch((error: Error) => {
        hasSubmittedRef.current = false;
        setSubmitStatus("error");
        setSubmitError(error.message);
      });
  }, [ready, router]);

  if (!ready || !result) {
    return <LoadingSpinner label="Loading results..." />;
  }

  return (
    <motion.div
      {...pageTransition}
      className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-8"
    >
      <ResultModal
        score={result.score}
        correctAnswers={result.correctAnswers}
        wrongAnswers={result.wrongAnswers}
        accuracy={result.accuracy}
        playerName={result.playerName}
        submitStatus={submitStatus}
        submitError={submitError}
      />
    </motion.div>
  );
}
