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

async function importQuizFromFile(filePath: string) {
    console.log(`\n📖 Reading file: ${filePath}`);

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const quizzes: QuizData[] = JSON.parse(fileContent);

    for (const quizData of quizzes) {
        console.log(`\n🎯 Processing quiz: ${quizData.title}`);

        // Find category by slug
        const category = await prisma.category.findUnique({
            where: { slug: quizData.categorySlug },
        });

        if (!category) {
            console.error(`❌ Category not found: ${quizData.categorySlug}`);
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

        console.log(`✅ Quiz created/updated: ${quiz.title} (ID: ${quiz.id})`);

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

            console.log(`  ✓ Question ${i + 1}: ${questionData.content.substring(0, 50)}...`);
        }

        console.log(`✅ Created ${quizData.questions.length} questions for "${quiz.title}"`);
    }
}

async function main() {
    console.log("🚀 Starting quiz import process...\n");

    const quizDir = path.join(process.cwd(), "quiz");

    // Check if quiz directory exists
    if (!fs.existsSync(quizDir)) {
        console.error("❌ Quiz directory not found!");
        process.exit(1);
    }

    // Get all JSON files in quiz directory
    const files = fs.readdirSync(quizDir).filter((file) => file.endsWith(".json"));

    if (files.length === 0) {
        console.error("❌ No quiz JSON files found in /quiz directory!");
        process.exit(1);
    }

    console.log(`📁 Found ${files.length} quiz files:\n`);
    files.forEach((file) => console.log(`  - ${file}`));

    // Import each quiz file
    for (const file of files) {
        const filePath = path.join(quizDir, file);
        try {
            await importQuizFromFile(filePath);
        } catch (error) {
            console.error(`❌ Error importing ${file}:`, error);
        }
    }

    console.log("\n🎉 Quiz import completed!");
}

main()
    .catch((e) => {
        console.error("❌ Fatal error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
