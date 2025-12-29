import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, ChevronRight } from "lucide-react";
import { Article, formatDate } from "@/lib/articles";

interface ArticleCardProps {
    article: Article;
}

const categoryColors: Record<string, string> = {
    "literasi-keuangan": "bg-emerald-500",
    "perbankan-digital": "bg-blue-500",
    "fintech-ewallet": "bg-purple-500",
    "investasi-saham": "bg-amber-500",
    "asuransi-proteksi": "bg-red-500",
    "pajak-perencanaan": "bg-cyan-500",
};

const categoryNames: Record<string, string> = {
    "literasi-keuangan": "Literasi Keuangan",
    "perbankan-digital": "Perbankan Digital",
    "fintech-ewallet": "Fintech & E-Wallet",
    "investasi-saham": "Investasi & Saham",
    "asuransi-proteksi": "Asuransi & Proteksi",
    "pajak-perencanaan": "Pajak & Perencanaan",
};

export function ArticleCard({ article }: ArticleCardProps) {
    return (
        <Link href={`/artikel/${article.slug}`}>
            <Card className="group cursor-pointer hover:border-primary/50 transition-all hover:-translate-y-1 h-full overflow-hidden">
                {/* Featured Image */}
                <div className="relative aspect-video overflow-hidden">
                    <Image
                        src={article.featuredImage.url}
                        alt={article.featuredImage.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                        <Badge
                            className={`${categoryColors[article.category] || "bg-primary"} text-white border-0`}
                        >
                            {categoryNames[article.category] || article.category}
                        </Badge>
                    </div>
                </div>

                <CardHeader className="pb-2">
                    <h3 className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                    </h3>
                </CardHeader>

                <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {formatDate(article.publishedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {article.readTime} min
                            </span>
                        </div>
                        <ChevronRight className="w-4 h-4 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
