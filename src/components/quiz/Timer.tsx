"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { timerPulseVariants } from "@/lib/animations";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimerProps {
    timeLimit: number; // in seconds
    onTimeUp: () => void;
    isPaused?: boolean;
    className?: string;
}

export function Timer({ timeLimit, onTimeUp, isPaused = false, className }: TimerProps) {
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const isWarning = timeLeft <= 30;
    const isCritical = timeLeft <= 10;

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isPaused, onTimeUp]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const progressPercent = (timeLeft / timeLimit) * 100;

    return (
        <motion.div
            variants={timerPulseVariants}
            animate={isCritical ? "warning" : "normal"}
            className={cn("flex items-center gap-2", className)}
        >
            <Clock
                className={cn(
                    "w-5 h-5",
                    isCritical && "text-red-500",
                    isWarning && !isCritical && "text-yellow-500"
                )}
            />
            <div className="flex flex-col gap-1">
                <span
                    className={cn(
                        "font-mono text-lg font-bold",
                        isCritical && "text-red-500",
                        isWarning && !isCritical && "text-yellow-500"
                    )}
                >
                    {formatTime(timeLeft)}
                </span>
                <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                        className={cn(
                            "h-full rounded-full",
                            isCritical && "bg-red-500",
                            isWarning && !isCritical && "bg-yellow-500",
                            !isWarning && "bg-primary"
                        )}
                        initial={{ width: "100%" }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>
        </motion.div>
    );
}
