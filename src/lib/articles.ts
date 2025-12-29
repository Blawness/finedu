import { readdirSync, readFileSync } from "fs";
import { join } from "path";

export interface Article {
    title: string;
    slug: string;
    category: string;
    author: string;
    publishedAt: string;
    readTime: number;
    excerpt: string;
    featuredImage: {
        url: string;
        alt: string;
    };
    content: string;
    tags: string[];
    relatedQuizSlug?: string;
    infographics?: {
        title: string;
        embedUrl: string;
    }[];
}

const articlesDirectory = join(process.cwd(), "articles");

export function getAllArticles(): Article[] {
    try {
        const fileNames = readdirSync(articlesDirectory);
        const articles = fileNames
            .filter((fileName) => fileName.endsWith(".json"))
            .map((fileName) => {
                const filePath = join(articlesDirectory, fileName);
                const fileContents = readFileSync(filePath, "utf8");
                return JSON.parse(fileContents) as Article;
            })
            .sort(
                (a, b) =>
                    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
            );
        return articles;
    } catch {
        return [];
    }
}

export function getArticleBySlug(slug: string): Article | undefined {
    const articles = getAllArticles();
    return articles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
    const articles = getAllArticles();
    return articles.filter((article) => article.category === category);
}

export function getAllCategories(): string[] {
    const articles = getAllArticles();
    const categories = new Set(articles.map((article) => article.category));
    return Array.from(categories);
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}
