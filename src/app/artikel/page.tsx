import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { ArticleCard } from "@/components/article/ArticleCard";
import { getAllArticles, getAllCategories } from "@/lib/articles";
import { BookOpen, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
    title: "Artikel Edukasi Fintech | FinEdu",
    description:
        "Baca artikel edukasi fintech dan literasi keuangan untuk meningkatkan pemahaman Anda tentang keuangan digital di Indonesia.",
};

const categoryNames: Record<string, string> = {
    "literasi-keuangan": "Literasi Keuangan",
    "perbankan-digital": "Perbankan Digital",
    "fintech-ewallet": "Fintech & E-Wallet",
    "investasi-saham": "Investasi & Saham",
    "asuransi-proteksi": "Asuransi & Proteksi",
    "pajak-perencanaan": "Pajak & Perencanaan",
};

export default function ArtikelPage() {
    const articles = getAllArticles();
    const categories = getAllCategories();

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 md:py-24">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

                <div className="container relative">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <Badge variant="secondary" className="text-sm px-4 py-1.5">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Artikel Edukasi
                        </Badge>

                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Artikel{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                                Fintech & Keuangan
                            </span>
                        </h1>

                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Pelajari berbagai topik seputar literasi keuangan, investasi,
                            perbankan digital, dan teknologi finansial di Indonesia.
                        </p>

                        {/* Category Filters */}
                        <div className="flex flex-wrap justify-center gap-2 pt-4">
                            <Badge
                                variant="outline"
                                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2"
                            >
                                Semua
                            </Badge>
                            {categories.map((category) => (
                                <Badge
                                    key={category}
                                    variant="outline"
                                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2"
                                >
                                    {categoryNames[category] || category}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="py-12">
                <div className="container">
                    {articles.length > 0 ? (
                        <>
                            <div className="flex items-center gap-2 mb-8">
                                <TrendingUp className="w-5 h-5 text-primary" />
                                <h2 className="text-xl font-semibold">
                                    {articles.length} Artikel Tersedia
                                </h2>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {articles.map((article) => (
                                    <ArticleCard key={article.slug} article={article} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Belum Ada Artikel</h3>
                            <p className="text-muted-foreground">
                                Artikel sedang dalam proses pembuatan. Silakan cek kembali nanti!
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
