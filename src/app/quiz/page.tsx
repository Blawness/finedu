import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import prisma from "@/lib/prisma";
import { ChevronRight } from "lucide-react";

async function getCategories() {
    const categories = await prisma.category.findMany({
        include: {
            _count: {
                select: { quizzes: true },
            },
        },
    });
    return categories;
}

export default async function QuizPage() {
    const categories = await getCategories();

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 py-12">
                <div className="container">
                    <div className="max-w-2xl mb-12">
                        <h1 className="text-4xl font-bold mb-4">Kategori Quiz</h1>
                        <p className="text-lg text-muted-foreground">
                            Pilih kategori yang ingin Anda pelajari. Setiap kategori memiliki
                            berbagai quiz dengan tingkat kesulitan yang berbeda.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category) => (
                            <Link key={category.id} href={`/quiz/${category.slug}`}>
                                <Card className="group cursor-pointer hover:border-primary/50 transition-all hover:-translate-y-1 h-full">
                                    <CardHeader>
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                                                style={{ backgroundColor: category.color }}
                                            >
                                                {category.icon}
                                            </div>
                                            <div className="flex-1">
                                                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                                    {category.name}
                                                </CardTitle>
                                                <CardDescription>
                                                    {category._count.quizzes} quiz tersedia
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            {category.description}
                                        </p>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-primary font-medium">
                                                Mulai belajar
                                            </span>
                                            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
