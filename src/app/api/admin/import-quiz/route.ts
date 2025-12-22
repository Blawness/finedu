import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

interface QuizOption {
    content: string;
    isCorrect: boolean;
}

interface QuizQuestion {
    content: string;
    explanation: string;
    options: QuizOption[];
}

interface QuizData {
    title: string;
    slug: string;
    description: string;
    categorySlug: string;
    difficulty: string;
    xpReward: number;
    timeLimit: number;
    questions: QuizQuestion[];
}

// Secret key untuk proteksi endpoint
const ADMIN_SECRET = process.env.ADMIN_SECRET || "your-secret-key-change-this";

export async function POST(request: NextRequest) {
    try {
        // Validasi authorization
        const authHeader = request.headers.get("authorization");
        if (authHeader !== `Bearer ${ADMIN_SECRET}`) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const logs: string[] = [];
        logs.push("🚀 Starting quiz import process...");

        const quizDir = path.join(process.cwd(), "quiz");

        // Check if quiz directory exists
        if (!fs.existsSync(quizDir)) {
            return NextResponse.json(
                { error: "Quiz directory not found!" },
                { status: 404 }
            );
        }

        // Get all JSON files in quiz directory
        const files = fs.readdirSync(quizDir).filter((file) => file.endsWith(".json"));

        if (files.length === 0) {
            return NextResponse.json(
                { error: "No quiz JSON files found in /quiz directory!" },
                { status: 404 }
            );
        }

        logs.push(`📁 Found ${files.length} quiz files`);

        let totalQuizzes = 0;
        let totalQuestions = 0;

        // Import each quiz file
        for (const file of files) {
            const filePath = path.join(quizDir, file);
            logs.push(`\n📖 Reading file: ${file}`);

            const fileContent = fs.readFileSync(filePath, "utf-8");
            const quizzes: QuizData[] = JSON.parse(fileContent);

            for (const quizData of quizzes) {
                logs.push(`🎯 Processing quiz: ${quizData.title}`);

                // Find category by slug
                const category = await prisma.category.findUnique({
                    where: { slug: quizData.categorySlug },
                });

                if (!category) {
                    logs.push(`❌ Category not found: ${quizData.categorySlug}`);
                    continue;
                }

                // Create or update quiz
                const quiz = await prisma.quiz.upsert({
                    where: { slug: quizData.slug },
                    update: {
                        title: quizData.title,
                        description: quizData.description,
                        difficulty: quizData.difficulty,
                        xpReward: quizData.xpReward,
                        timeLimit: quizData.timeLimit,
                    },
                    create: {
                        title: quizData.title,
                        slug: quizData.slug,
                        description: quizData.description,
                        categoryId: category.id,
                        difficulty: quizData.difficulty,
                        xpReward: quizData.xpReward,
                        timeLimit: quizData.timeLimit,
                    },
                });

                logs.push(`✅ Quiz created/updated: ${quiz.title}`);
                totalQuizzes++;

                // Delete existing questions for this quiz (if updating)
                await prisma.question.deleteMany({
                    where: { quizId: quiz.id },
                });

                // Create questions
                for (let i = 0; i < quizData.questions.length; i++) {
                    const questionData = quizData.questions[i];

                    const question = await prisma.question.create({
                        data: {
                            quizId: quiz.id,
                            content: questionData.content,
                            explanation: questionData.explanation,
                            order: i + 1,
                        },
                    });

                    // Create answer options
                    for (const optionData of questionData.options) {
                        await prisma.answerOption.create({
                            data: {
                                questionId: question.id,
                                content: optionData.content,
                                isCorrect: optionData.isCorrect,
                            },
                        });
                    }

                    totalQuestions++;
                }

                logs.push(`✅ Created ${quizData.questions.length} questions`);
            }
        }

        logs.push("\n🎉 Quiz import completed!");
        logs.push(`📊 Total: ${totalQuizzes} quizzes, ${totalQuestions} questions`);

        return NextResponse.json({
            success: true,
            message: "Quiz import completed successfully",
            stats: {
                totalQuizzes,
                totalQuestions,
                filesProcessed: files.length,
            },
            logs,
        });

    } catch (error) {
        console.error("Error importing quiz:", error);
        return NextResponse.json(
            {
                error: "Failed to import quiz",
                message: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

// GET untuk melihat status
export async function GET(request: NextRequest) {
    try {
        // Validasi authorization
        const authHeader = request.headers.get("authorization");
        if (authHeader !== `Bearer ${ADMIN_SECRET}`) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const quizCount = await prisma.quiz.count();
        const questionCount = await prisma.question.count();
        const categoryCount = await prisma.category.count();

        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: { quizzes: true },
                },
            },
        });

        return NextResponse.json({
            success: true,
            stats: {
                totalCategories: categoryCount,
                totalQuizzes: quizCount,
                totalQuestions: questionCount,
            },
            categories: categories.map((cat) => ({
                name: cat.name,
                slug: cat.slug,
                quizCount: cat._count.quizzes,
            })),
        });

    } catch (error) {
        console.error("Error getting quiz stats:", error);
        return NextResponse.json(
            {
                error: "Failed to get quiz stats",
                message: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
