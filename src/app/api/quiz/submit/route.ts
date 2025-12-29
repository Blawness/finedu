import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { calculateXP, checkLevelUp, getLevelFromXP } from "@/lib/gamification";
import { checkAndAwardAchievements } from "@/lib/achievements";

interface SubmitQuizRequest {
    quizId: number;
    answers: Record<number, number>; // questionId -> selectedOptionId
    timeTaken: number;
}

export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body: SubmitQuizRequest = await request.json();
        const { quizId, answers, timeTaken } = body;

        // Fetch quiz with questions
        const quiz = await prisma.quiz.findUnique({
            where: { id: quizId },
            include: {
                questions: {
                    include: { options: true }
                }
            }
        });

        if (!quiz) {
            return NextResponse.json(
                { error: "Quiz not found" },
                { status: 404 }
            );
        }

        // Calculate score
        let correctCount = 0;
        const userAnswers: { questionId: number; selectedOptionId: number; isCorrect: boolean }[] = [];

        quiz.questions.forEach((question) => {
            const selectedOptionId = answers[question.id];
            const correctOption = question.options.find((o) => o.isCorrect);
            const isCorrect = selectedOptionId === correctOption?.id;

            if (isCorrect) correctCount++;

            if (selectedOptionId) {
                userAnswers.push({
                    questionId: question.id,
                    selectedOptionId,
                    isCorrect
                });
            }
        });

        const score = Math.round((correctCount / quiz.questions.length) * 100);

        // Fetch user's current streak for XP calculation
        const userStreak = await prisma.userStreak.findUnique({
            where: { userId: session.user.id }
        });
        const currentStreak = userStreak?.currentStreak || 0;

        // Calculate XP earned
        const xpEarned = calculateXP(
            { xpReward: quiz.xpReward, difficulty: quiz.difficulty as "EASY" | "MEDIUM" | "HARD", timeLimit: quiz.timeLimit },
            score,
            timeTaken,
            currentStreak
        );

        // Get user's current XP for level up check
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { totalXP: true }
        });
        const prevXP = user?.totalXP || 0;
        const newXP = prevXP + xpEarned;

        // Check for level up
        const levelUp = checkLevelUp(prevXP, newXP);
        const newLevel = getLevelFromXP(newXP).level;

        // Update streak based on last active date
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        let newStreak = 1;
        let newLongestStreak = 1;

        if (userStreak) {
            const lastActiveDate = new Date(userStreak.lastActiveDate);
            lastActiveDate.setHours(0, 0, 0, 0);

            if (lastActiveDate.getTime() === today.getTime()) {
                // Already active today, keep current streak
                newStreak = userStreak.currentStreak;
                newLongestStreak = userStreak.longestStreak;
            } else if (lastActiveDate.getTime() === yesterday.getTime()) {
                // Active yesterday, continue streak
                newStreak = userStreak.currentStreak + 1;
                newLongestStreak = Math.max(newStreak, userStreak.longestStreak);
            } else {
                // Streak broken, reset to 1
                newStreak = 1;
                newLongestStreak = Math.max(1, userStreak.longestStreak);
            }
        }

        // Transaction to save everything atomically
        const result = await prisma.$transaction(async (tx) => {
            // Create quiz attempt
            const attempt = await tx.quizAttempt.create({
                data: {
                    userId: session.user.id,
                    quizId,
                    score,
                    xpEarned,
                    timeTaken,
                    answers: {
                        create: userAnswers
                    }
                }
            });

            // Update user XP and level
            await tx.user.update({
                where: { id: session.user.id },
                data: {
                    totalXP: newXP,
                    level: newLevel
                }
            });

            // Upsert streak
            await tx.userStreak.upsert({
                where: { userId: session.user.id },
                create: {
                    userId: session.user.id,
                    currentStreak: newStreak,
                    longestStreak: newLongestStreak,
                    lastActiveDate: today
                },
                update: {
                    currentStreak: newStreak,
                    longestStreak: newLongestStreak,
                    lastActiveDate: today
                }
            });

            return attempt;
        });

        // Check and award achievements
        const newAchievements = await checkAndAwardAchievements(session.user.id);

        return NextResponse.json({
            success: true,
            attemptId: result.id,
            score,
            xpEarned,
            newTotalXP: newXP,
            newLevel,
            levelUp: levelUp ? {
                level: levelUp.level,
                title: levelUp.title
            } : null,
            streak: {
                current: newStreak,
                longest: newLongestStreak
            },
            achievements: newAchievements.map(a => ({
                id: a.id,
                name: a.name
            }))
        });

    } catch (error) {
        console.error("Error submitting quiz:", error);
        return NextResponse.json(
            { error: "Failed to submit quiz" },
            { status: 500 }
        );
    }
}
