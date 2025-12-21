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

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
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
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <div className="flex items-center justify-start gap-2 p-2">
                                        <div className="flex flex-col space-y-1 leading-none">
                                            <p className="font-medium">{session.user.name}</p>
                                            <p className="w-[200px] truncate text-xs text-muted-foreground">
                                                {session.user.email}
                                            </p>
                                        </div>
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile" className="cursor-pointer">
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Profil Saya</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/settings" className="cursor-pointer">
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Pengaturan</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="text-red-500 cursor-pointer focus:text-red-500 focus:bg-red-50"
                                        onClick={() => signOut({ callbackUrl: "/" })}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Keluar</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
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
