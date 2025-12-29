import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MarkdownRenderer } from "@/components/article/MarkdownRenderer";
import { InfographicEmbed } from "@/components/article/InfographicEmbed";
import {
    getAllArticles,
    getArticleBySlug,
    formatDate,
} from "@/lib/articles";
import {
    ArrowLeft,
    Calendar,
    Clock,
    User,
    Tag,
    BookOpen,
    ChevronRight,
} from "lucide-react";

interface ArticlePageProps {
    params: Promise<{ slug: string }>;
}

const categoryNames: Record<string, string> = {
    "literasi-keuangan": "Literasi Keuangan",
    "perbankan-digital": "Perbankan Digital",
    "fintech-ewallet": "Fintech & E-Wallet",
    "investasi-saham": "Investasi & Saham",
    "asuransi-proteksi": "Asuransi & Proteksi",
    "pajak-perencanaan": "Pajak & Perencanaan",
};

const categoryColors: Record<string, string> = {
    "literasi-keuangan": "bg-emerald-500",
    "perbankan-digital": "bg-blue-500",
    "fintech-ewallet": "bg-purple-500",
    "investasi-saham": "bg-amber-500",
    "asuransi-proteksi": "bg-red-500",
    "pajak-perencanaan": "bg-cyan-500",
};

export async function generateStaticParams() {
    const articles = getAllArticles();
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

export async function generateMetadata({
    params,
}: ArticlePageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = getArticleBySlug(slug);

    if (!article) {
        return {
            title: "Artikel Tidak Ditemukan | FinEdu",
        };
    }

    return {
        title: `${article.title} | FinEdu`,
        description: article.excerpt,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            images: [article.featuredImage.url],
        },
    };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
    const { slug } = await params;
    const article = getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    return (
        <div className="min-h-screen">
            {/* Hero with Featured Image */}
            <section className="relative">
                <div className="absolute inset-0 h-[400px] md:h-[500px]">
                    <Image
                        src={article.featuredImage.url}
                        alt={article.featuredImage.alt}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
                </div>

                <div className="container relative pt-32 pb-12">
                    {/* Back Button */}
                    <Link href="/artikel">
                        <Button variant="ghost" className="mb-6 -ml-2">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Kembali ke Artikel
                        </Button>
                    </Link>

                    {/* Article Header */}
                    <div className="max-w-3xl">
                        <Badge
                            className={`${categoryColors[article.category] || "bg-primary"} text-white border-0 mb-4`}
                        >
                            {categoryNames[article.category] || article.category}
                        </Badge>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                            {article.title}
                        </h1>

                        <p className="text-lg text-muted-foreground mb-6">
                            {article.excerpt}
                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                                <User className="w-4 h-4" />
                                {article.author}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                {formatDate(article.publishedAt)}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                {article.readTime} menit baca
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="py-8">
                <div className="container">
                    <div className="grid lg:grid-cols-[1fr_300px] gap-12">
                        {/* Main Content */}
                        <article>
                            <MarkdownRenderer content={article.content} />

                            {/* Infographics */}
                            {article.infographics && article.infographics.length > 0 && (
                                <div className="mt-12">
                                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                        📊 Infografis Terkait
                                    </h2>
                                    {article.infographics.map((infographic, index) => (
                                        <InfographicEmbed
                                            key={index}
                                            title={infographic.title}
                                            embedUrl={infographic.embedUrl}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Tags */}
                            {article.tags && article.tags.length > 0 && (
                                <div className="mt-12 pt-8 border-t">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <Tag className="w-4 h-4 text-muted-foreground" />
                                        {article.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </article>

                        {/* Sidebar */}
                        <aside className="space-y-6">
                            {/* Related Quiz CTA */}
                            {article.relatedQuizSlug && (
                                <Card className="bg-gradient-to-br from-primary/10 to-emerald-400/10 border-primary/20">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <BookOpen className="w-5 h-5 text-primary" />
                                            <h3 className="font-semibold">Quiz Terkait</h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Uji pemahaman Anda tentang topik ini dengan quiz interaktif!
                                        </p>
                                        <Link href={`/quiz`}>
                                            <Button className="w-full">
                                                Mulai Quiz
                                                <ChevronRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Share Card */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold mb-3">Bagikan Artikel</h3>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => {
                                                if (typeof window !== "undefined") {
                                                    window.open(
                                                        `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`,
                                                        "_blank"
                                                    );
                                                }
                                            }}
                                        >
                                            Twitter
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => {
                                                if (typeof window !== "undefined") {
                                                    window.open(
                                                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                                                        "_blank"
                                                    );
                                                }
                                            }}
                                        >
                                            Facebook
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Photo Credit */}
                            <div className="text-xs text-muted-foreground">
                                <p>
                                    Foto oleh{" "}
                                    <a
                                        href="https://unsplash.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline hover:text-foreground"
                                    >
                                        Unsplash
                                    </a>
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
}
