import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AchievementCard } from "@/components/gamification/AchievementCard";
import { Progress } from "@/components/ui/progress";
import { auth } from "@/auth";
import { getAchievementsWithProgress } from "@/lib/achievements";
import { Trophy } from "lucide-react";

// Group achievements by type
function groupByType<T extends { achievement: { type: string } }>(items: T[]) {
    const groups: Record<string, T[]> = {};
    items.forEach((item) => {
        const type = item.achievement.type;
        if (!groups[type]) {
            groups[type] = [];
        }
        groups[type].push(item);
    });
    return groups;
}

const typeLabels: Record<string, string> = {
    QUIZ_COMPLETE: "Penyelesaian Quiz",
    PERFECT_SCORE: "Skor Sempurna",
    STREAK: "Streak Harian",
    XP_MILESTONE: "Milestone XP",
};

export default async function AchievementsPage() {
    const session = await auth();
    const userId = session?.user?.id || null;

    const achievementsWithProgress = await getAchievementsWithProgress(userId);
    const grouped = groupByType(achievementsWithProgress);

    // Count unlocked
    const totalUnlocked = achievementsWithProgress.filter(a => a.isUnlocked).length;
    const totalAchievements = achievementsWithProgress.length;

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 py-12">
                <div className="container">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                                <Trophy className="w-8 h-8 text-amber-500" />
                            </div>
                            <h1 className="text-4xl font-bold mb-4">Achievements</h1>
                            <p className="text-muted-foreground mb-4">
                                Kumpulkan badge dengan menyelesaikan berbagai tantangan
                            </p>
                            {userId && (
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                                    <span className="font-semibold text-primary">
                                        {totalUnlocked} / {totalAchievements}
                                    </span>
                                    <span className="text-sm text-muted-foreground">achievement diraih</span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-8">
                            {Object.entries(grouped).map(([type, items]) => (
                                <Card key={type}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-between">
                                            <span>{typeLabels[type] || type}</span>
                                            <span className="text-sm font-normal text-muted-foreground">
                                                {items.filter(i => i.isUnlocked).length} / {items.length}
                                            </span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-4">
                                            {items.map((item) => (
                                                <div key={item.achievement.id} className="space-y-2">
                                                    <AchievementCard
                                                        name={item.achievement.name}
                                                        description={item.achievement.description}
                                                        icon={item.achievement.icon}
                                                        badgeColor={item.achievement.badgeColor}
                                                        isUnlocked={item.isUnlocked}
                                                        earnedAt={item.earnedAt || undefined}
                                                    />
                                                    {!item.isUnlocked && userId && (
                                                        <div className="flex items-center gap-2 px-4">
                                                            <Progress value={item.progress} className="h-2 flex-1" />
                                                            <span className="text-xs text-muted-foreground w-12 text-right">
                                                                {item.progress}%
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
