import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { XPBar } from "@/components/gamification/XPBar";
import { StreakCounter } from "@/components/gamification/StreakCounter";
import { AchievementCard } from "@/components/gamification/AchievementCard";
import {
    GraduationCap,
    Trophy,
    Target,
    Calendar,
    ChevronRight,
} from "lucide-react";

// Mock user data (replace with real auth later)
const mockUser = {
    name: "Guest User",
    email: "guest@example.com",
    image: null,
    totalXP: 450,
    level: 3,
    quizzesCompleted: 8,
    perfectScores: 2,
    currentStreak: 5,
};

const mockAchievements = [
    {
        name: "Langkah Pertama",
        description: "Selesaikan quiz pertama Anda",
        icon: "🎯",
        badgeColor: "#10b981",
        isUnlocked: true,
        earnedAt: new Date("2024-01-15"),
    },
    {
        name: "Sempurna!",
        description: "Dapatkan skor 100% pada quiz",
        icon: "⭐",
        badgeColor: "#fbbf24",
        isUnlocked: true,
        earnedAt: new Date("2024-01-18"),
    },
    {
        name: "Konsisten",
        description: "Belajar 7 hari berturut-turut",
        icon: "🔥",
        badgeColor: "#ef4444",
        isUnlocked: false,
    },
];

const recentQuizzes = [
    { title: "Pengenalan Ekonomi Syariah", score: 80, xpEarned: 80 },
    { title: "Dasar Perbankan Syariah", score: 100, xpEarned: 150 },
    { title: "Fintech P2P Lending", score: 60, xpEarned: 60 },
];

export default function ProfilePage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header user={mockUser} totalXP={mockUser.totalXP} currentStreak={mockUser.currentStreak} />

            <main className="flex-1 py-12">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        {/* Profile Header */}
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary">
                                {mockUser.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold mb-2">{mockUser.name}</h1>
                                <XPBar totalXP={mockUser.totalXP} />
                            </div>
                            <StreakCounter currentStreak={mockUser.currentStreak} />
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <GraduationCap className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold">{mockUser.quizzesCompleted}</p>
                                            <p className="text-sm text-muted-foreground">Quiz Selesai</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                                            <Trophy className="w-5 h-5 text-amber-500" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold">{mockUser.perfectScores}</p>
                                            <p className="text-sm text-muted-foreground">Skor Sempurna</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                            <Target className="w-5 h-5 text-purple-500" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold">Level {mockUser.level}</p>
                                            <p className="text-sm text-muted-foreground">Praktisi</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                                            <Calendar className="w-5 h-5 text-red-500" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold">{mockUser.currentStreak}</p>
                                            <p className="text-sm text-muted-foreground">Hari Streak</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Recent Quizzes */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>Quiz Terakhir</CardTitle>
                                    <Link href="/quiz">
                                        <Button variant="ghost" size="sm">
                                            Lihat Semua
                                            <ChevronRight className="w-4 h-4 ml-1" />
                                        </Button>
                                    </Link>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {recentQuizzes.map((quiz, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                                            >
                                                <div>
                                                    <p className="font-medium">{quiz.title}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Skor: {quiz.score}%
                                                    </p>
                                                </div>
                                                <span className="text-amber-500 font-semibold">
                                                    +{quiz.xpEarned} XP
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Achievements */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>Achievement</CardTitle>
                                    <Link href="/achievements">
                                        <Button variant="ghost" size="sm">
                                            Lihat Semua
                                            <ChevronRight className="w-4 h-4 ml-1" />
                                        </Button>
                                    </Link>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {mockAchievements.map((achievement, index) => (
                                            <AchievementCard key={index} {...achievement} />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
