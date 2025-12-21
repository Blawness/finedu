"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { badgeUnlockVariants } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

interface AchievementCardProps {
    name: string;
    description: string;
    icon: string;
    badgeColor: string;
    isUnlocked: boolean;
    earnedAt?: Date;
}

export function AchievementCard({
    name,
    description,
    icon,
    badgeColor,
    isUnlocked,
    earnedAt,
}: AchievementCardProps) {
    return (
        <Card
            className={cn(
                "relative overflow-hidden transition-all",
                isUnlocked
                    ? "border-2"
                    : "opacity-60 grayscale"
            )}
            style={{
                borderColor: isUnlocked ? badgeColor : undefined,
            }}
        >
            {isUnlocked && (
                <div
                    className="absolute inset-0 opacity-10"
                    style={{ backgroundColor: badgeColor }}
                />
            )}
            <CardContent className="p-4 flex items-center gap-4">
                <motion.div
                    variants={badgeUnlockVariants}
                    initial={isUnlocked ? "initial" : false}
                    animate={isUnlocked ? "animate" : false}
                    className={cn(
                        "w-14 h-14 rounded-full flex items-center justify-center text-2xl shrink-0",
                        isUnlocked ? "" : "bg-muted"
                    )}
                    style={{
                        backgroundColor: isUnlocked ? badgeColor : undefined,
                    }}
                >
                    {isUnlocked ? icon : <Lock className="w-6 h-6 text-muted-foreground" />}
                </motion.div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">{name}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {description}
                    </p>
                    {isUnlocked && earnedAt && (
                        <p className="text-xs text-muted-foreground mt-1">
                            Diraih {new Date(earnedAt).toLocaleDateString("id-ID")}
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
