import { LEVELS, XP_CONFIG, Level } from "@/constants/levels";

interface Quiz {
    xpReward: number;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    timeLimit: number;
}

/**
 * Calculate XP earned from completing a quiz
 */
export function calculateXP(
    quiz: Quiz,
    score: number,
    timeTaken: number,
    currentStreak: number = 0
): number {
    const baseXP = quiz.xpReward;
    const scoreMultiplier = score / 100;

    // Time bonus (faster = more XP, up to 20%)
    const timeRatio = Math.max(0, (quiz.timeLimit - timeTaken) / quiz.timeLimit);
    const timeBonus = timeRatio * XP_CONFIG.TIME_BONUS_MAX;

    // Difficulty multiplier
    const difficultyMultiplier = XP_CONFIG.DIFFICULTY_MULTIPLIER[quiz.difficulty] || 1;

    // Perfect score bonus
    const perfectBonus = score === 100 ? XP_CONFIG.PERFECT_SCORE_BONUS : 0;

    // Streak bonus
    let streakMultiplier = 1;
    const streakThresholds = Object.keys(XP_CONFIG.STREAK_BONUS)
        .map(Number)
        .sort((a, b) => b - a);

    for (const threshold of streakThresholds) {
        if (currentStreak >= threshold) {
            streakMultiplier = XP_CONFIG.STREAK_BONUS[threshold as keyof typeof XP_CONFIG.STREAK_BONUS];
            break;
        }
    }

    const totalXP = Math.round(
        (baseXP * scoreMultiplier * difficultyMultiplier * (1 + timeBonus) + perfectBonus) *
        streakMultiplier
    );

    return totalXP;
}

/**
 * Get level info from total XP
 */
export function getLevelFromXP(totalXP: number): Level {
    let currentLevel = LEVELS[0];

    for (const level of LEVELS) {
        if (totalXP >= level.minXP) {
            currentLevel = level;
        } else {
            break;
        }
    }

    return currentLevel;
}

/**
 * Get XP progress to next level
 */
export function getXPProgress(totalXP: number): {
    currentLevel: Level;
    nextLevel: Level | null;
    xpInCurrentLevel: number;
    xpNeededForNextLevel: number;
    progressPercent: number;
} {
    const currentLevel = getLevelFromXP(totalXP);
    const currentLevelIndex = LEVELS.findIndex((l) => l.level === currentLevel.level);
    const nextLevel = LEVELS[currentLevelIndex + 1] || null;

    if (!nextLevel) {
        return {
            currentLevel,
            nextLevel: null,
            xpInCurrentLevel: totalXP - currentLevel.minXP,
            xpNeededForNextLevel: 0,
            progressPercent: 100,
        };
    }

    const xpInCurrentLevel = totalXP - currentLevel.minXP;
    const xpNeededForNextLevel = nextLevel.minXP - currentLevel.minXP;
    const progressPercent = Math.min(100, (xpInCurrentLevel / xpNeededForNextLevel) * 100);

    return {
        currentLevel,
        nextLevel,
        xpInCurrentLevel,
        xpNeededForNextLevel,
        progressPercent,
    };
}

/**
 * Check if user leveled up
 */
export function checkLevelUp(prevXP: number, newXP: number): Level | null {
    const prevLevel = getLevelFromXP(prevXP);
    const newLevel = getLevelFromXP(newXP);

    if (newLevel.level > prevLevel.level) {
        return newLevel;
    }

    return null;
}

/**
 * Format XP number with K/M suffix
 */
export function formatXP(xp: number): string {
    if (xp >= 1000000) {
        return `${(xp / 1000000).toFixed(1)}M`;
    }
    if (xp >= 1000) {
        return `${(xp / 1000).toFixed(1)}K`;
    }
    return xp.toString();
}

/**
 * Calculate streak bonus multiplier
 */
export function getStreakMultiplier(streak: number): number {
    const thresholds = Object.keys(XP_CONFIG.STREAK_BONUS)
        .map(Number)
        .sort((a, b) => b - a);

    for (const threshold of thresholds) {
        if (streak >= threshold) {
            return XP_CONFIG.STREAK_BONUS[threshold as keyof typeof XP_CONFIG.STREAK_BONUS];
        }
    }

    return 1;
}

/**
 * Get difficulty color
 */
export function getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
        case "EASY":
            return "text-green-500";
        case "MEDIUM":
            return "text-yellow-500";
        case "HARD":
            return "text-red-500";
        default:
            return "text-gray-500";
    }
}

/**
 * Get difficulty label in Indonesian
 */
export function getDifficultyLabel(difficulty: string): string {
    switch (difficulty) {
        case "EASY":
            return "Mudah";
        case "MEDIUM":
            return "Sedang";
        case "HARD":
            return "Sulit";
        default:
            return difficulty;
    }
}
