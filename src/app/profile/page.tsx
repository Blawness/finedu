import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Zap, Clock, Medal, BookOpen, Flame } from "lucide-react";
import { getLevelFromXP } from "@/lib/gamification";
import { XPBar } from "@/components/gamification/XPBar";

export default async function ProfilePage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    // Fetch complete user data including relations from DATABASE
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
            streak: true,
            quizAttempts: {
                orderBy: { completedAt: 'desc' },
                take: 5,
                include: {
                    quiz: true
                }
            },
            achievements: {
                include: {
                    achievement: true
                }
            }
        }
    });

    if (!user) return null;

    const currentLevel = getLevelFromXP(user.totalXP);
    const totalQuizzes = user.quizAttempts.length;
    const totalPerfectScores = user.quizAttempts.filter(q => q.score >= 90).length;

    return (
        <div className="container mx-auto px-4 py-24 min-h-screen">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-primary p-1 bg-background relative overflow-hidden">
                        {user.image ? (
                            <Image
                                src={user.image}
                                alt={user.name || "Profile"}
                                fill
                                className="rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-4xl font-bold text-primary">{user.name?.charAt(0) || "U"}</span>
                            </div>
                        )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-background z-10">
                        {currentLevel.level}
                    </div>
                </div>

                <div className="flex-1 text-center md:text-left space-y-4">
                    <div>
                        <h1 className="text-3xl font-bold">{user.name}</h1>
                        <p className="text-muted-foreground">Bergabung sejak {new Date(user.createdAt).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</p>
                    </div>

                    <div className="max-w-md w-full mx-auto md:mx-0">
                        <XPBar totalXP={user.totalXP} />
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        {user.achievements.slice(0, 3).map((ua) => (
                            <Badge key={`${ua.userId}-${ua.achievementId}`} variant="secondary" className="gap-1">
                                <Medal className="w-3 h-3 text-amber-500" />
                                {ua.achievement.name}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total XP</CardTitle>
                        <Star className="w-4 h-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{user.totalXP.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Level {currentLevel.level}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Current Streak</CardTitle>
                        <Flame className="w-4 h-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{user.streak?.currentStreak || 0} Hari</div>
                        <p className="text-xs text-muted-foreground">Best: {user.streak?.longestStreak || 0} Hari</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Quiz Selesai</CardTitle>
                        <BookOpen className="w-4 h-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalQuizzes}</div>
                        <p className="text-xs text-muted-foreground">{totalPerfectScores} Skor Tinggi</p>
                    </CardContent>
                </Card>
            </div>

            {/* Quiz History */}
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                Riwayat Quiz Terbaru
            </h2>

            <div className="space-y-4 mb-12">
                {user.quizAttempts.length > 0 ? (
                    user.quizAttempts.map((attempt) => (
                        <Card key={attempt.id} className="hover:bg-accent/5 transition-colors">
                            <CardContent className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Zap className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{attempt.quiz.title}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(attempt.completedAt).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-lg text-primary">{attempt.score} Poin</div>
                                    <div className="text-xs text-muted-foreground">
                                        +{attempt.xpEarned} XP
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="text-center py-8 text-muted-foreground bg-accent/10 rounded-lg border border-dashed text-sm">
                        Belum ada riwayat quiz. Ayo mulai main!
                    </div>
                )}
            </div>
        </div>
    );
}
