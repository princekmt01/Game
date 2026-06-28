"use client";

import { motion } from "framer-motion";
import { Play, Trophy, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fadeInUp, pageTransition } from "@/animations/variants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getPlayerName, savePlayerName } from "@/utils/storage";

export default function HomePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedName = getPlayerName();
    if (savedName) setName(savedName);
  }, []);

  const handlePlay = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter your name to play.");
      return;
    }

    savePlayerName(trimmed);
    router.push("/game");
  };

  return (
    <motion.div {...pageTransition} className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <div className="w-full max-w-2xl">
        <motion.div {...fadeInUp} className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary">
            <Zap className="h-8 w-8" />
          </div>
          <h1 className="mb-3 text-5xl font-black tracking-tight sm:text-6xl">
            Math Sprint
          </h1>
          <p className="mx-auto max-w-lg text-lg text-muted-foreground">
            Race the clock and sharpen your mental math. You have 60 seconds to
            answer as many questions as you can.
          </p>
        </motion.div>

        <Card>
          <CardHeader>
            <CardTitle>Ready to play?</CardTitle>
            <CardDescription>
              Enter your name, hit Play, and type answers with Enter.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Your name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  if (error) setError("");
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handlePlay();
                }}
                aria-label="Player name"
              />
              {error && <p className="text-sm text-red-400">{error}</p>}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="flex-1" onClick={handlePlay}>
                <Play className="h-4 w-4" />
                Play
              </Button>
              <Button asChild variant="outline" size="lg" className="flex-1">
                <Link href="/leaderboard">
                  <Trophy className="h-4 w-4" />
                  Leaderboard
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
