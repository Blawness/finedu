"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AnswerOption } from "@/components/quiz/AnswerOption";
import { Timer } from "@/components/quiz/Timer";
import { pageTransition, xpPopupVariants } from "@/lib/animations";
import { getDifficultyColor, getDifficultyLabel } from "@/lib/gamification";
import { ChevronLeft, ChevronRight, Trophy, RotateCcw, Home, Zap } from "lucide-react";

interface Question {
    id: number;
    content: string;
    explanation: string | null;
    options: {
        id: number;
        content: string;
        isCorrect: boolean;
    }[];
}

interface Quiz {
    id: number;
    title: string;
    description: string | null;
    difficulty: string;
    xpReward: number;
    timeLimit: number;
    questions: Question[];
    category: {
        name: string;
        slug: string;
    };
}

interface QuizClientProps {
    quiz: Quiz;
}

export default function QuizClient({ quiz }: QuizClientProps) {
    const router = useRouter();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
    const [isRevealed, setIsRevealed] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);
    const [startTime] = useState(Date.now());

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

    const handleSelectAnswer = (optionId: number) => {
        if (isRevealed) return;
        setSelectedAnswers((prev) => ({
            ...prev,
            [currentQuestion.id]: optionId,
        }));
    };

    const handleCheckAnswer = () => {
        setIsRevealed(true);
        setShowExplanation(true);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setIsRevealed(false);
            setShowExplanation(false);
        } else {
            // Quiz completed
            const endTime = Date.now();
            setTimeTaken(Math.floor((endTime - startTime) / 1000));
            setIsCompleted(true);
        }
    };

    const handleTimeUp = useCallback(() => {
        const endTime = Date.now();
        setTimeTaken(Math.floor((endTime - startTime) / 1000));
        setIsCompleted(true);
    }, [startTime]);

    // Calculate score
    const calculateScore = () => {
        let correct = 0;
        quiz.questions.forEach((q) => {
            const selectedId = selectedAnswers[q.id];
            const correctOption = q.options.find((o) => o.isCorrect);
            if (selectedId === correctOption?.id) {
                correct++;
            }
        });
        return {
            correct,
            total: quiz.questions.length,
            percentage: Math.round((correct / quiz.questions.length) * 100),
        };
    };

    const score = calculateScore();
    const earnedXP = Math.round((score.percentage / 100) * quiz.xpReward);

    if (isCompleted) {
        return (
            <motion.div
                variants={pageTransition}
                initial="initial"
                animate="animate"
                className="min-h-screen flex items-center justify-center p-4"
            >
                <Card className="w-full max-w-lg text-center">
                    <CardHeader>
                        <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <Trophy className="w-10 h-10 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">Quiz Selesai!</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-6xl font-bold text-primary">
                            {score.percentage}%
                        </div>
                        <p className="text-muted-foreground">
                            Anda menjawab {score.correct} dari {score.total} pertanyaan dengan benar
                        </p>

                        <motion.div
                            variants={xpPopupVariants}
                            initial="initial"
                            animate="animate"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-full text-amber-500 font-semibold"
                        >
                            <Zap className="w-5 h-5 fill-current" />
                            +{earnedXP} XP
                        </motion.div>

                        <div className="text-sm text-muted-foreground">
                            Waktu: {Math.floor(timeTaken / 60)}:{(timeTaken % 60).toString().padStart(2, "0")}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => router.push(`/quiz/${quiz.category.slug}`)}
                            >
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Quiz Lainnya
                            </Button>
                            <Button
                                className="flex-1"
                                onClick={() => router.push("/")}
                            >
                                <Home className="w-4 h-4 mr-2" />
                                Beranda
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background border-b">
                <div className="container py-4">
                    <div className="flex items-center justify-between gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push(`/quiz/${quiz.category.slug}`)}
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Keluar
                        </Button>
                        <div className="flex-1 max-w-md">
                            <div className="flex items-center justify-between text-sm mb-1">
                                <span className="font-medium">
                                    Soal {currentQuestionIndex + 1} dari {quiz.questions.length}
                                </span>
                                <Badge variant="outline" className={getDifficultyColor(quiz.difficulty)}>
                                    {getDifficultyLabel(quiz.difficulty)}
                                </Badge>
                            </div>
                            <Progress value={progress} className="h-2" />
                        </div>
                        <Timer
                            timeLimit={quiz.timeLimit}
                            onTimeUp={handleTimeUp}
                            isPaused={isCompleted}
                        />
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1 container py-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestionIndex}
                        variants={pageTransition}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="max-w-2xl mx-auto"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl leading-relaxed">
                                    {currentQuestion.content}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {currentQuestion.options.map((option, index) => (
                                    <AnswerOption
                                        key={option.id}
                                        content={option.content}
                                        index={index}
                                        isSelected={selectedAnswers[currentQuestion.id] === option.id}
                                        isCorrect={option.isCorrect}
                                        isRevealed={isRevealed}
                                        onSelect={() => handleSelectAnswer(option.id)}
                                    />
                                ))}

                                {/* Explanation */}
                                <AnimatePresence>
                                    {showExplanation && currentQuestion.explanation && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-6 p-4 bg-muted rounded-lg"
                                        >
                                            <h4 className="font-semibold mb-2">Penjelasan:</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {currentQuestion.explanation}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <div className="flex justify-end mt-6">
                            {!isRevealed ? (
                                <Button
                                    size="lg"
                                    onClick={handleCheckAnswer}
                                    disabled={!selectedAnswers[currentQuestion.id]}
                                >
                                    Cek Jawaban
                                </Button>
                            ) : (
                                <Button size="lg" onClick={handleNextQuestion}>
                                    {currentQuestionIndex < quiz.questions.length - 1
                                        ? "Soal Berikutnya"
                                        : "Lihat Hasil"}
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}
