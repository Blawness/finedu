import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import { Trophy, Medal, Award, Zap, Flame } from "lucide-react";

async function getLeaderboard() {
    const users = await prisma.user.findMany({
        orderBy: { totalXP: "desc" },
        take: 50,
        select: {
            id: true,
            name: true,
            image: true,
            totalXP: true,
            level: true,
            streak: {
                select: { currentStreak: true },
            },
        },
    });
    return users;
}

function getRankIcon(rank: number) {
    switch (rank) {
        case 1:
            return <Trophy className="w-6 h-6 text-amber-500" />;
        case 2:
            return <Medal className="w-6 h-6 text-gray-400" />;
        case 3:
            return <Award className="w-6 h-6 text-amber-700" />;
        default:
            return (
                <span className="w-6 h-6 flex items-center justify-center font-bold text-muted-foreground">
                    {rank}
                </span>
            );
    }
}

function getRankBadgeColor(rank: number) {
    switch (rank) {
        case 1:
            return "bg-gradient-to-r from-amber-400 to-amber-600";
        case 2:
            return "bg-gradient-to-r from-gray-300 to-gray-500";
        case 3:
            return "bg-gradient-to-r from-amber-600 to-amber-800";
        default:
            return "bg-muted";
    }
}

export default async function LeaderboardPage() {
    const users = await getLeaderboard();

    return (
        <div className="container py-24">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
                    <p className="text-muted-foreground">
                        Lihat peringkat pengguna dengan XP tertinggi
                    </p>
                </div>

                <Tabs defaultValue="global" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="global">Global</TabsTrigger>
                        <TabsTrigger value="weekly">Minggu Ini</TabsTrigger>
                    </TabsList>

                    <TabsContent value="global">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Trophy className="w-5 h-5 text-primary" />
                                    Top 50 Pelajar
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {users.length === 0 ? (
                                    <p className="text-center text-muted-foreground py-8">
                                        Belum ada pengguna terdaftar.
                                    </p>
                                ) : (
                                    <div className="space-y-2">
                                        {users.map((user, index) => {
                                            const rank = index + 1;
                                            return (
                                                <div
                                                    key={user.id}
                                                    className={`flex items-center gap-4 p-3 rounded-lg ${rank <= 3
                                                        ? getRankBadgeColor(rank) + " text-white"
                                                        : "hover:bg-muted"
                                                        }`}
                                                >
                                                    <div className="w-8 flex justify-center">
                                                        {getRankIcon(rank)}
                                                    </div>
                                                    <Avatar>
                                                        <AvatarImage src={user.image || undefined} />
                                                        <AvatarFallback>
                                                            {user.name?.charAt(0).toUpperCase() || "?"}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium truncate">
                                                            {user.name || "Anonymous"}
                                                        </p>
                                                        <div className="flex items-center gap-2 text-sm opacity-80">
                                                            <Badge variant="secondary" className="text-xs">
                                                                Level {user.level}
                                                            </Badge>
                                                            {user.streak?.currentStreak && user.streak.currentStreak > 0 && (
                                                                <span className="flex items-center gap-1">
                                                                    <Flame className="w-3 h-3" />
                                                                    {user.streak.currentStreak}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1 font-bold">
                                                        <Zap className="w-4 h-4 text-amber-500" />
                                                        {user.totalXP.toLocaleString()}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="weekly">
                        <Card>
                            <CardContent className="py-12">
                                <p className="text-center text-muted-foreground">
                                    Leaderboard mingguan akan segera hadir!
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
