import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AchievementCard } from "@/components/gamification/AchievementCard";
import prisma from "@/lib/prisma";
import { Trophy } from "lucide-react";

async function getAchievements() {
    const achievements = await prisma.achievement.findMany({
        orderBy: [{ type: "asc" }, { threshold: "asc" }],
    });
    return achievements;
}

// Group achievements by type
function groupByType(achievements: Awaited<ReturnType<typeof getAchievements>>) {
    const groups: Record<string, typeof achievements> = {};
    achievements.forEach((a) => {
        if (!groups[a.type]) {
            groups[a.type] = [];
        }
        groups[a.type].push(a);
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
    const achievements = await getAchievements();
    const grouped = groupByType(achievements);

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
                            <p className="text-muted-foreground">
                                Kumpulkan badge dengan menyelesaikan berbagai tantangan
                            </p>
                        </div>

                        <div className="space-y-8">
                            {Object.entries(grouped).map(([type, items]) => (
                                <Card key={type}>
                                    <CardHeader>
                                        <CardTitle>{typeLabels[type] || type}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-4">
                                            {items.map((achievement) => (
                                                <AchievementCard
                                                    key={achievement.id}
                                                    name={achievement.name}
                                                    description={achievement.description}
                                                    icon={achievement.icon}
                                                    badgeColor={achievement.badgeColor}
                                                    isUnlocked={false} // TODO: Check user achievements
                                                />
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
