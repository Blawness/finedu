// Level and XP Configuration

export interface Level {
    level: number;
    minXP: number;
    title: string;
    titleEn: string;
}

export const LEVELS: Level[] = [
    { level: 1, minXP: 0, title: "Pemula", titleEn: "Beginner" },
    { level: 2, minXP: 100, title: "Pelajar", titleEn: "Learner" },
    { level: 3, minXP: 300, title: "Pengamat", titleEn: "Observer" },
    { level: 4, minXP: 600, title: "Praktisi", titleEn: "Practitioner" },
    { level: 5, minXP: 1000, title: "Ahli", titleEn: "Expert" },
    { level: 6, minXP: 1500, title: "Pakar", titleEn: "Specialist" },
    { level: 7, minXP: 2100, title: "Master", titleEn: "Master" },
    { level: 8, minXP: 2800, title: "Guru", titleEn: "Guru" },
    { level: 9, minXP: 3600, title: "Cendekiawan", titleEn: "Scholar" },
    { level: 10, minXP: 4500, title: "Pakar Keuangan", titleEn: "Financial Expert" },
];

export const MAX_LEVEL = LEVELS.length;

// XP rewards configuration
export const XP_CONFIG = {
    // Base XP per difficulty
    DIFFICULTY_MULTIPLIER: {
        EASY: 1,
        MEDIUM: 1.5,
        HARD: 2,
    },
    // Bonus for completing quiz quickly
    TIME_BONUS_MAX: 0.2, // 20% max bonus
    // Bonus for perfect score
    PERFECT_SCORE_BONUS: 50,
    // Streak bonuses
    STREAK_BONUS: {
        3: 1.1, // 10% bonus at 3 days
        7: 1.25, // 25% bonus at 7 days
        14: 1.5, // 50% bonus at 14 days
        30: 2, // 100% bonus at 30 days
    },
};
