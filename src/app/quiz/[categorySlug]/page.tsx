import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import prisma from "@/lib/prisma";
import { getDifficultyColor, getDifficultyLabel } from "@/lib/gamification";
import { ChevronLeft, Clock, Zap, ChevronRight } from "lucide-react";

interface Props {
    params: Promise<{ categorySlug: string }>;
}

async function getCategoryWithQuizzes(slug: string) {
    const category = await prisma.category.findUnique({
        where: { slug },
        include: {
            quizzes: {
                where: { isActive: true },
                include: {
                    _count: {
                        select: { questions: true },
                    },
                },
                orderBy: { createdAt: "desc" },
            },
        },
    });
    return category;
}

export default async function CategoryPage({ params }: Props) {
    const { categorySlug } = await params;
    const category = await getCategoryWithQuizzes(categorySlug);

    if (!category) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 py-12">
                <div className="container">
                    {/* Back button */}
                    <Link href="/quiz">
                        <Button variant="ghost" className="mb-6 -ml-2">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Kembali ke Kategori
                        </Button>
                    </Link>

                    {/* Category header */}
                    <div className="flex items-center gap-4 mb-8">
                        <div
                            className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                            style={{ backgroundColor: category.color }}
                        >
                            {category.icon}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">{category.name}</h1>
                            <p className="text-muted-foreground">{category.description}</p>
                        </div>
                    </div>

                    {/* Quiz list */}
                    {category.quizzes.length === 0 ? (
                        <Card className="text-center py-12">
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Belum ada quiz tersedia untuk kategori ini.
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-6">
                            {category.quizzes.map((quiz) => (
                                <Link
                                    key={quiz.id}
                                    href={`/quiz/${category.slug}/${quiz.slug}`}
                                >
                                    <Card className="group cursor-pointer hover:border-primary/50 transition-all hover:-translate-y-1 h-full">
                                        <CardHeader>
                                            <div className="flex items-center justify-between mb-2">
                                                <Badge
                                                    variant="outline"
                                                    className={getDifficultyColor(quiz.difficulty)}
                                                >
                                                    {getDifficultyLabel(quiz.difficulty)}
                                                </Badge>
                                                <div className="flex items-center gap-1 text-amber-500">
                                                    <Zap className="w-4 h-4 fill-current" />
                                                    <span className="font-semibold text-sm">
                                                        +{quiz.xpReward} XP
                                                    </span>
                                                </div>
                                            </div>
                                            <CardTitle className="group-hover:text-primary transition-colors">
                                                {quiz.title}
                                            </CardTitle>
                                            {quiz.description && (
                                                <CardDescription className="line-clamp-2">
                                                    {quiz.description}
                                                </CardDescription>
                                            )}
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                                <div className="flex items-center gap-4">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        {Math.floor(quiz.timeLimit / 60)} menit
                                                    </span>
                                                    <span>{quiz._count.questions} soal</span>
                                                </div>
                                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
