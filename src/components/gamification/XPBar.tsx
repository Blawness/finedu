"use client";

import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { progressFill } from "@/lib/animations";
import { getXPProgress, formatXP } from "@/lib/gamification";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface XPBarProps {
    totalXP: number;
    className?: string;
    showLevel?: boolean;
}

export function XPBar({ totalXP, className, showLevel = true }: XPBarProps) {
    const progress = getXPProgress(totalXP);

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className={cn("flex items-center gap-3", className)}>
                        {showLevel && (
                            <div className="flex items-center gap-1.5 shrink-0">
                                <span className="text-2xl">⭐</span>
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground">Level</span>
                                    <span className="font-bold text-lg leading-none">
                                        {progress.currentLevel.level}
                                    </span>
                                </div>
                            </div>
                        )}
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">
                                    {progress.currentLevel.title}
                                </span>
                                <span className="flex items-center gap-1 text-amber-500 font-semibold">
                                    <Zap className="w-3 h-3 fill-current" />
                                    {formatXP(totalXP)} XP
                                </span>
                            </div>
                            <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-amber-500 rounded-full"
                                    custom={progress.progressPercent}
                                    variants={progressFill}
                                    initial="initial"
                                    animate="animate"
                                />
                            </div>
                            {progress.nextLevel && (
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>{formatXP(progress.xpInCurrentLevel)} XP</span>
                                    <span>{formatXP(progress.xpNeededForNextLevel)} XP</span>
                                </div>
                            )}
                        </div>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <div className="text-center">
                        <p className="font-semibold">
                            {progress.nextLevel
                                ? `${formatXP(progress.xpNeededForNextLevel - progress.xpInCurrentLevel)} XP ke Level ${progress.nextLevel.level}`
                                : "Level Maksimum! 🎉"}
                        </p>
                        {progress.nextLevel && (
                            <p className="text-xs text-muted-foreground">
                                Berikutnya: {progress.nextLevel.title}
                            </p>
                        )}
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
