"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cardVariants } from "@/lib/animations";
import { getDifficultyColor, getDifficultyLabel } from "@/lib/gamification";
import { Clock, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";

interface QuizCardProps {
    title: string;
    description?: string;
    difficulty: string;
    xpReward: number;
    timeLimit: number;
    questionCount: number;
    categorySlug: string;
    quizSlug: string;
}

export function QuizCard({
    title,
    description,
    difficulty,
    xpReward,
    timeLimit,
    questionCount,
    categorySlug,
    quizSlug,
}: QuizCardProps) {
    return (
        <Link href={`/quiz/${categorySlug}/${quizSlug}`}>
            <motion.div
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
            >
                <Card className="cursor-pointer group h-full hover:border-primary/50 transition-colors">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <Badge
                                variant="outline"
                                className={getDifficultyColor(difficulty)}
                            >
                                {getDifficultyLabel(difficulty)}
                            </Badge>
                            <div className="flex items-center gap-1 text-amber-500">
                                <Zap className="w-4 h-4 fill-current" />
                                <span className="font-semibold text-sm">+{xpReward} XP</span>
                            </div>
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                            {title}
                        </CardTitle>
                        {description && (
                            <CardDescription className="line-clamp-2">
                                {description}
                            </CardDescription>
                        )}
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {Math.floor(timeLimit / 60)} menit
                                </span>
                                <span>{questionCount} soal</span>
                            </div>
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </Link>
    );
}
