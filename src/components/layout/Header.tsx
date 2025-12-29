"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Trophy, Star, Flame, User, LogOut, Settings } from "lucide-react";
import { StreakCounter } from "../gamification/StreakCounter";

export function Header() {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { label: "Beranda", href: "/" },
        { label: "Quiz", href: "/quiz" },
        { label: "Leaderboard", href: "/leaderboard" },
        { label: "Achievements", href: "/achievements" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-background/80 backdrop-blur-md border-b shadow-sm"
                : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center">
                        <span className="font-bold text-white text-lg">F</span>
                    </div>
                    <span className="font-bold text-xl hidden sm:inline-block">
                        FinEdu
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === item.href
                                ? "text-primary"
                                : "text-muted-foreground"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* User Actions */}
                <div className="flex items-center gap-3">
                    {status === "loading" ? (
                        <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
                    ) : status === "authenticated" && session.user ? (
                        <>
                            <div className="hidden sm:flex items-center gap-4 mr-2">
                                <StreakCounter currentStreak={session.user.currentStreak || 0} />
                                <div className="flex items-center gap-1.5 bg-accent/50 px-3 py-1.5 rounded-full">
                                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                    <span className="font-bold text-sm">{session.user.totalXP || 0} XP</span>
                                </div>
                            </div>

                            <div className="relative group">
                                <Button
                                    variant="ghost"
                                    className="relative h-10 w-10 rounded-full ring-2 ring-primary/20 hover:ring-primary/40 p-0"
                                >
                                    {session.user.image ? (
                                        <img
                                            src={session.user.image}
                                            alt={session.user.name || "User"}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                                            {session.user.name?.charAt(0) || "U"}
                                        </div>
                                    )}
                                </Button>

                                {/* Hover Profile Card */}
                                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div className="w-72 bg-background border rounded-xl shadow-lg overflow-hidden">
                                        {/* Profile Header */}
                                        <div className="bg-gradient-to-r from-primary/10 to-emerald-400/10 p-4">
                                            <div className="flex items-center gap-3">
                                                {session.user.image ? (
                                                    <img
                                                        src={session.user.image}
                                                        alt={session.user.name || "User"}
                                                        className="h-12 w-12 rounded-full object-cover border-2 border-background"
                                                    />
                                                ) : (
                                                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl border-2 border-background">
                                                        {session.user.name?.charAt(0) || "U"}
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold truncate">{session.user.name}</p>
                                                    <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-3 gap-2 p-3 border-b">
                                            <div className="text-center p-2 rounded-lg bg-amber-500/10">
                                                <div className="flex items-center justify-center gap-1 text-amber-500">
                                                    <Star className="w-4 h-4 fill-current" />
                                                    <span className="font-bold">{session.user.totalXP || 0}</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-0.5">XP</p>
                                            </div>
                                            <div className="text-center p-2 rounded-lg bg-primary/10">
                                                <div className="flex items-center justify-center gap-1 text-primary">
                                                    <Trophy className="w-4 h-4" />
                                                    <span className="font-bold">{session.user.level || 1}</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-0.5">Level</p>
                                            </div>
                                            <div className="text-center p-2 rounded-lg bg-orange-500/10">
                                                <div className="flex items-center justify-center gap-1 text-orange-500">
                                                    <Flame className="w-4 h-4 fill-current" />
                                                    <span className="font-bold">{session.user.currentStreak || 0}</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-0.5">Streak</p>
                                            </div>
                                        </div>

                                        {/* Quick Links */}
                                        <div className="p-2 space-y-1">
                                            <Link
                                                href="/profile"
                                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-sm"
                                            >
                                                <User className="w-4 h-4" />
                                                <span>Profil Saya</span>
                                            </Link>
                                            <Link
                                                href="/settings"
                                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-sm"
                                            >
                                                <Settings className="w-4 h-4" />
                                                <span>Pengaturan</span>
                                            </Link>
                                            <button
                                                onClick={() => signOut({ callbackUrl: "/" })}
                                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors text-sm w-full text-left"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span>Keluar</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" asChild>
                                <Link href="/login">Masuk</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/register">Daftar</Link>
                            </Button>
                        </div>
                    )}

                    {/* Mobile Menu Trigger */}
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
                            <div className="flex flex-col gap-6 mt-8">
                                {status === "authenticated" && session.user && (
                                    <div className="flex flex-col gap-4 p-4 bg-accent/20 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            {session.user.image ? (
                                                <img
                                                    src={session.user.image}
                                                    alt={session.user.name || "User"}
                                                    className="h-12 w-12 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                                                    {session.user.name?.charAt(0) || "U"}
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-bold">{session.user.name}</p>
                                                <p className="text-xs text-muted-foreground">Lv. {session.user.level || 1} • {session.user.totalXP || 0} XP</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <nav className="flex flex-col gap-2">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-accent/50 ${pathname === item.href
                                                ? "bg-accent text-primary"
                                                : "text-foreground"
                                                }`}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </nav>

                                {status === "unauthenticated" && (
                                    <div className="grid grid-cols-2 gap-3 mt-auto">
                                        <Button variant="outline" asChild onClick={() => setIsMobileMenuOpen(false)}>
                                            <Link href="/login">Masuk</Link>
                                        </Button>
                                        <Button asChild onClick={() => setIsMobileMenuOpen(false)}>
                                            <Link href="/register">Daftar</Link>
                                        </Button>
                                    </div>
                                )}

                                {status === "authenticated" && (
                                    <Button
                                        variant="destructive"
                                        className="mt-auto"
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            signOut({ callbackUrl: "/" });
                                        }}
                                    >
                                        Keluar
                                    </Button>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
