import prisma from "@/lib/prisma";

export interface AchievementProgress {
    id: number;
    name: string;
    type: string;
    threshold: number;
    currentValue: number;
    isEarned: boolean;
}

/**
 * Check and award achievements for a user after quiz completion
 * Returns list of newly earned achievements
 */
export async function checkAndAwardAchievements(userId: string): Promise<AchievementProgress[]> {
    // Get all achievements and user's current achievements
    const [achievements, userAchievements, userStats] = await Promise.all([
        prisma.achievement.findMany(),
        prisma.userAchievement.findMany({
            where: { userId },
            select: { achievementId: true }
        }),
        getUserStats(userId)
    ]);

    const earnedIds = new Set(userAchievements.map(ua => ua.achievementId));
    const newlyEarned: AchievementProgress[] = [];

    for (const achievement of achievements) {
        if (earnedIds.has(achievement.id)) continue;

        const currentValue = getProgressValue(achievement.type, userStats);
        const shouldEarn = currentValue >= achievement.threshold;

        if (shouldEarn) {
            // Award the achievement
            await prisma.userAchievement.create({
                data: {
                    userId,
                    achievementId: achievement.id
                }
            });

            newlyEarned.push({
                id: achievement.id,
                name: achievement.name,
                type: achievement.type,
                threshold: achievement.threshold,
                currentValue,
                isEarned: true
            });
        }
    }

    return newlyEarned;
}

interface UserStats {
    totalQuizCompleted: number;
    perfectScoreCount: number;
    currentStreak: number;
    longestStreak: number;
    totalXP: number;
}

async function getUserStats(userId: string): Promise<UserStats> {
    const [user, quizStats, streak] = await Promise.all([
        prisma.user.findUnique({
            where: { id: userId },
            select: { totalXP: true }
        }),
        prisma.quizAttempt.aggregate({
            where: { userId },
            _count: { id: true }
        }),
        prisma.userStreak.findUnique({
            where: { userId }
        }),
    ]);

    // Count perfect scores (100%)
    const perfectScores = await prisma.quizAttempt.count({
        where: {
            userId,
            score: 100
        }
    });

    return {
        totalQuizCompleted: quizStats._count.id,
        perfectScoreCount: perfectScores,
        currentStreak: streak?.currentStreak || 0,
        longestStreak: streak?.longestStreak || 0,
        totalXP: user?.totalXP || 0
    };
}

function getProgressValue(type: string, stats: UserStats): number {
    switch (type) {
        case "QUIZ_COMPLETE":
            return stats.totalQuizCompleted;
        case "PERFECT_SCORE":
            return stats.perfectScoreCount;
        case "STREAK":
            return stats.currentStreak;
        case "XP_MILESTONE":
            return stats.totalXP;
        default:
            return 0;
    }
}

/**
 * Get all achievements with user progress
 */
export async function getAchievementsWithProgress(userId: string | null): Promise<{
    achievement: {
        id: number;
        name: string;
        description: string;
        icon: string;
        badgeColor: string;
        type: string;
        threshold: number;
    };
    isUnlocked: boolean;
    earnedAt: Date | null;
    progress: number;
}[]> {
    const achievements = await prisma.achievement.findMany({
        orderBy: [{ type: "asc" }, { threshold: "asc" }],
    });

    if (!userId) {
        return achievements.map(a => ({
            achievement: a,
            isUnlocked: false,
            earnedAt: null,
            progress: 0
        }));
    }

    const [userAchievements, stats] = await Promise.all([
        prisma.userAchievement.findMany({
            where: { userId },
        }),
        getUserStats(userId)
    ]);

    const earnedMap = new Map(userAchievements.map(ua => [ua.achievementId, ua.earnedAt]));

    return achievements.map(achievement => {
        const earnedAt = earnedMap.get(achievement.id) || null;
        const currentValue = getProgressValue(achievement.type, stats);
        const progress = Math.min(100, Math.round((currentValue / achievement.threshold) * 100));

        return {
            achievement,
            isUnlocked: !!earnedAt,
            earnedAt,
            progress
        };
    });
}
