"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StreakCounter } from "@/components/gamification/StreakCounter";
import { cn } from "@/lib/utils";
import {
    Menu,
    Home,
    GraduationCap,
    Trophy,
    User,
    LogIn,
    Zap,
} from "lucide-react";

const navigation = [
    { name: "Beranda", href: "/", icon: Home },
    { name: "Quiz", href: "/quiz", icon: GraduationCap },
    { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
    { name: "Profil", href: "/profile", icon: User },
];

interface HeaderProps {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    } | null;
    totalXP?: number;
    currentStreak?: number;
}

export function Header({ user, totalXP = 0, currentStreak = 0 }: HeaderProps) {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white fill-white" />
                    </div>
                    <span className="font-bold text-xl hidden sm:inline">FinEdu</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.name} href={item.href}>
                                <Button
                                    variant={isActive ? "secondary" : "ghost"}
                                    className={cn(
                                        "gap-2",
                                        isActive && "bg-secondary"
                                    )}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.name}
                                </Button>
                            </Link>
                        );
                    })}
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <div className="hidden sm:flex items-center gap-3">
                                <StreakCounter currentStreak={currentStreak} />
                                <div className="flex items-center gap-1 text-amber-500 font-semibold">
                                    <Zap className="w-4 h-4 fill-current" />
                                    <span>{totalXP} XP</span>
                                </div>
                            </div>
                            <Link href="/profile">
                                <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                                    <AvatarImage src={user.image || undefined} />
                                    <AvatarFallback>
                                        {user.name?.charAt(0).toUpperCase() || "U"}
                                    </AvatarFallback>
                                </Avatar>
                            </Link>
                        </>
                    ) : (
                        <Link href="/login">
                            <Button>
                                <LogIn className="w-4 h-4 mr-2" />
                                Masuk
                            </Button>
                        </Link>
                    )}

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[280px]">
                            <nav className="flex flex-col gap-2 mt-8">
                                {navigation.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link key={item.name} href={item.href}>
                                            <Button
                                                variant={isActive ? "secondary" : "ghost"}
                                                className="w-full justify-start gap-3"
                                            >
                                                <item.icon className="w-5 h-5" />
                                                {item.name}
                                            </Button>
                                        </Link>
                                    );
                                })}
                            </nav>
                            {user && (
                                <div className="mt-8 pt-8 border-t space-y-4">
                                    <StreakCounter currentStreak={currentStreak} />
                                    <div className="flex items-center gap-2 text-amber-500 font-semibold">
                                        <Zap className="w-5 h-5 fill-current" />
                                        <span>{totalXP} XP Total</span>
                                    </div>
                                </div>
                            )}
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
