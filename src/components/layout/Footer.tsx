import Link from "next/link";
import { Zap } from "lucide-react";

const footerLinks = {
    product: [
        { name: "Quiz", href: "/quiz" },
        { name: "Leaderboard", href: "/leaderboard" },
        { name: "Achievements", href: "/achievements" },
    ],
    categories: [
        { name: "Ekonomi Syariah", href: "/quiz/dasar-ekonomi-syariah" },
        { name: "Perbankan Syariah", href: "/quiz/perbankan-syariah" },
        { name: "Fintech Syariah", href: "/quiz/fintech-syariah" },
    ],
    legal: [
        { name: "Kebijakan Privasi", href: "/privacy" },
        { name: "Syarat & Ketentuan", href: "/terms" },
    ],
};

export function Footer() {
    return (
        <footer className="border-t bg-muted/30">
            <div className="container py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white fill-white" />
                            </div>
                            <span className="font-bold text-xl">FinEdu</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Platform edukasi interaktif untuk meningkatkan literasi keuangan
                            syariah di Indonesia.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="font-semibold mb-4">Produk</h4>
                        <ul className="space-y-2">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="font-semibold mb-4">Kategori Quiz</h4>
                        <ul className="space-y-2">
                            {footerLinks.categories.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} FinEdu. Semua hak dilindungi.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Dibuat dengan ❤️ untuk literasi keuangan syariah Indonesia
                    </p>
                </div>
            </div>
        </footer>
    );
}
