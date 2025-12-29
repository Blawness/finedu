import { Variants } from "framer-motion";

// Page transitions
export const pageTransition: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

// Fade in animation
export const fadeIn: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0 },
};

// Stagger children animation
export const staggerContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

// Card animation
export const cardVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: {
        y: -5,
        scale: 1.02,
        transition: { duration: 0.2 },
    },
    tap: { scale: 0.98 },
};

// Quiz answer options
export const answerVariants: Variants = {
    initial: { opacity: 0, x: -20 },
    animate: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: { delay: i * 0.1, duration: 0.3 },
    }),
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98 },
    correct: {
        opacity: 1,
        x: 0,
        scale: [1, 1.02, 1],
        transition: { duration: 0.3 },
    },
    incorrect: {
        opacity: 1,
        x: [0, -5, 5, -5, 5, 0],
        transition: { duration: 0.4 },
    },
};

// XP Popup animation
export const xpPopupVariants: Variants = {
    initial: { opacity: 0, y: 50, scale: 0.5 },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    exit: {
        opacity: 0,
        y: -30,
        scale: 0.8,
        transition: { duration: 0.3 },
    },
};

// Level up celebration
export const levelUpVariants: Variants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
        scale: 1,
        rotate: 0,
        transition: { type: "spring", stiffness: 200, damping: 15 },
    },
};

// Streak counter
export const streakVariants: Variants = {
    pulse: {
        scale: [1, 1.1, 1],
        transition: { repeat: Infinity, duration: 2 },
    },
};

// Progress bar fill
export const progressFill: Variants = {
    initial: { width: 0 },
    animate: (progress: number) => ({
        width: `${progress}%`,
        transition: { duration: 1, ease: "easeOut" },
    }),
};

// Leaderboard entry
export const leaderboardEntryVariants: Variants = {
    initial: { opacity: 0, x: -50 },
    animate: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: { delay: i * 0.05, duration: 0.3 },
    }),
};

// Badge unlock animation
export const badgeUnlockVariants: Variants = {
    initial: { scale: 0, rotate: -180, opacity: 0 },
    animate: {
        scale: 1,
        rotate: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
        },
    },
};

// Timer pulse when low
export const timerPulseVariants: Variants = {
    normal: { scale: 1 },
    warning: {
        scale: [1, 1.1, 1],
        color: ["hsl(var(--foreground))", "hsl(var(--destructive))", "hsl(var(--foreground))"],
        transition: { duration: 0.5, repeat: Infinity },
    },
};

// Confetti particle
export const confettiVariants: Variants = {
    initial: (i: number) => ({
        opacity: 1,
        y: 0,
        x: 0,
        rotate: 0,
        scale: 1,
    }),
    animate: (i: number) => ({
        opacity: 0,
        y: 500,
        x: (i % 2 === 0 ? 1 : -1) * Math.random() * 200,
        rotate: Math.random() * 720,
        scale: 0,
        transition: {
            duration: 2 + Math.random(),
            ease: "easeOut",
        },
    }),
};

// Slide in from right
export const slideInRight: Variants = {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.4 } },
    exit: { x: -100, opacity: 0, transition: { duration: 0.3 } },
};

// Slide in from left
export const slideInLeft: Variants = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.4 } },
    exit: { x: 100, opacity: 0, transition: { duration: 0.3 } },
};

// Scale up animation
export const scaleUp: Variants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
    exit: { scale: 0.8, opacity: 0, transition: { duration: 0.2 } },
};

// Bounce animation
export const bounceVariants: Variants = {
    initial: { y: 0 },
    animate: {
        y: [0, -10, 0],
        transition: { duration: 0.6, repeat: Infinity, repeatDelay: 2 },
    },
};
