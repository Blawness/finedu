import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkQuizData() {
    console.log("🔍 Checking quiz data in database...\n");

    // Count categories
    const categoryCount = await prisma.category.count();
    console.log(`📚 Total Categories: ${categoryCount}`);

    // Count quizzes
    const quizCount = await prisma.quiz.count();
    console.log(`🎯 Total Quizzes: ${quizCount}`);

    // Count questions
    const questionCount = await prisma.question.count();
    console.log(`❓ Total Questions: ${questionCount}`);

    // Count answer options
    const optionCount = await prisma.answerOption.count();
    console.log(`📝 Total Answer Options: ${optionCount}\n`);

    // Get quizzes by category
    const categories = await prisma.category.findMany({
        include: {
            _count: {
                select: { quizzes: true },
            },
        },
        orderBy: { id: "asc" },
    });

    console.log("📊 Breakdown by Category:\n");
    for (const category of categories) {
        console.log(`${category.icon} ${category.name}`);
        console.log(`   Slug: ${category.slug}`);
        console.log(`   Quizzes: ${category._count.quizzes}`);
        console.log("");
    }

    // Get sample quiz with questions
    const sampleQuiz = await prisma.quiz.findFirst({
        include: {
            category: true,
            questions: {
                include: {
                    options: true,
                },
                take: 1,
            },
        },
    });

    if (sampleQuiz) {
        console.log("📖 Sample Quiz:\n");
        console.log(`Title: ${sampleQuiz.title}`);
        console.log(`Category: ${sampleQuiz.category.name}`);
        console.log(`Difficulty: ${sampleQuiz.difficulty}`);
        console.log(`XP Reward: ${sampleQuiz.xpReward}`);
        console.log(`Time Limit: ${sampleQuiz.timeLimit}s`);

        if (sampleQuiz.questions.length > 0) {
            const q = sampleQuiz.questions[0];
            console.log(`\nSample Question:`);
            console.log(`Q: ${q.content}`);
            console.log(`Options:`);
            q.options.forEach((opt, idx) => {
                console.log(`  ${idx + 1}. ${opt.content} ${opt.isCorrect ? "✓" : ""}`);
            });
        }
    }

    console.log("\n✅ Database check completed!");
}

checkQuizData()
    .catch((e) => {
        console.error("❌ Error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
