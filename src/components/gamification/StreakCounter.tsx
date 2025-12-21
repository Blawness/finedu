"use client";

import { motion } from "framer-motion";
import { streakVariants } from "@/lib/animations";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakCounterProps {
    currentStreak: number;
    className?: string;
}

export function StreakCounter({ currentStreak, className }: StreakCounterProps) {
    const isActive = currentStreak > 0;

    return (
        <motion.div
            variants={streakVariants}
            animate={isActive ? "pulse" : undefined}
            className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full",
                isActive
                    ? "bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30"
                    : "bg-muted",
                className
            )}
        >
            <Flame
                className={cn(
                    "w-5 h-5",
                    isActive ? "text-orange-500 fill-orange-500" : "text-muted-foreground"
                )}
            />
            <div className="flex flex-col">
                <span
                    className={cn(
                        "font-bold text-lg leading-none",
                        isActive ? "text-orange-500" : "text-muted-foreground"
                    )}
                >
                    {currentStreak}
                </span>
                <span className="text-xs text-muted-foreground">hari streak</span>
            </div>
        </motion.div>
    );
}
