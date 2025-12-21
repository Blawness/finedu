import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import QuizClient from "./QuizClient";

interface Props {
    params: Promise<{ categorySlug: string; quizSlug: string }>;
}

async function getQuiz(categorySlug: string, quizSlug: string) {
    const quiz = await prisma.quiz.findFirst({
        where: {
            slug: quizSlug,
            category: { slug: categorySlug },
            isActive: true,
        },
        include: {
            category: {
                select: { name: true, slug: true },
            },
            questions: {
                orderBy: { order: "asc" },
                include: {
                    options: true,
                },
            },
        },
    });
    return quiz;
}

export default async function QuizPlayPage({ params }: Props) {
    const { categorySlug, quizSlug } = await params;
    const quiz = await getQuiz(categorySlug, quizSlug);

    if (!quiz || quiz.questions.length === 0) {
        notFound();
    }

    return <QuizClient quiz={quiz} />;
}
