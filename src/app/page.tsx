import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Trophy,
  Target,
  TrendingUp,
  Users,
  BookOpen,
  ChevronRight,
  Star,
  Flame,
} from "lucide-react";

const categories = [
  {
    name: "Dasar Ekonomi Syariah",
    slug: "dasar-ekonomi-syariah",
    icon: "📖",
    color: "bg-emerald-500",
    description: "Prinsip halal/haram, riba, gharar, maysir",
  },
  {
    name: "Perbankan Syariah",
    slug: "perbankan-syariah",
    icon: "🏦",
    color: "bg-blue-500",
    description: "Mudharabah, murabahah, musyarakah, wadi'ah",
  },
  {
    name: "Fintech Syariah",
    slug: "fintech-syariah",
    icon: "📱",
    color: "bg-purple-500",
    description: "P2P lending syariah, crowdfunding, payment",
  },
  {
    name: "Investasi Halal",
    slug: "investasi-halal",
    icon: "📈",
    color: "bg-amber-500",
    description: "Saham syariah, sukuk, reksadana syariah",
  },
  {
    name: "Asuransi Syariah",
    slug: "asuransi-syariah",
    icon: "🛡️",
    color: "bg-red-500",
    description: "Takaful, hibah, dana investasi",
  },
  {
    name: "Zakat Digital",
    slug: "zakat-digital",
    icon: "💰",
    color: "bg-cyan-500",
    description: "Perhitungan zakat, infaq, sedekah online",
  },
];

const features = [
  {
    icon: Target,
    title: "Quiz Interaktif",
    description:
      "Pelajari konsep keuangan syariah melalui quiz yang menyenangkan dan edukatif",
  },
  {
    icon: Zap,
    title: "Sistem XP & Level",
    description:
      "Kumpulkan Experience Points dan naik level sambil belajar konsep baru",
  },
  {
    icon: Trophy,
    title: "Achievement & Badge",
    description:
      "Raih berbagai achievement dan badge sebagai bukti pencapaian Anda",
  },
  {
    icon: Flame,
    title: "Daily Streak",
    description:
      "Pertahankan streak harian untuk bonus XP dan motivasi belajar konsisten",
  },
  {
    icon: Users,
    title: "Leaderboard",
    description:
      "Bersaing dengan pengguna lain dan lihat posisi Anda di peringkat global",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Pantau perkembangan belajar Anda dengan statistik dan visualisasi",
  },
];

const stats = [
  { value: "6+", label: "Kategori Quiz" },
  { value: "50+", label: "Pertanyaan" },
  { value: "10", label: "Level" },
  { value: "8+", label: "Achievement" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <Badge variant="secondary" className="text-sm px-4 py-1.5">
                🎓 Platform Edukasi Fintech Syariah #1 di Indonesia
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Belajar{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                  Fintech Syariah
                </span>{" "}
                dengan Cara Menyenangkan
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Tingkatkan literasi keuangan syariah Anda melalui quiz interaktif
                dengan sistem gamifikasi. Kumpulkan XP, raih achievement, dan
                bersaing di leaderboard!
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <Button size="lg" className="text-lg px-8 h-12">
                    Mulai Belajar Gratis
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/quiz">
                  <Button variant="outline" size="lg" className="text-lg px-8 h-12">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Jelajahi Quiz
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-4 rounded-xl bg-card border"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Fitur Gamifikasi yang Menarik
              </h2>
              <p className="text-muted-foreground text-lg">
                Belajar tidak harus membosankan! Nikmati pengalaman belajar yang
                menyenangkan dengan berbagai fitur gamifikasi.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="group hover:border-primary/50 transition-all hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Kategori Quiz Fintech Syariah
              </h2>
              <p className="text-muted-foreground text-lg">
                Pelajari berbagai aspek keuangan syariah dari dasar hingga
                tingkat lanjut.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Link key={category.slug} href={`/quiz/${category.slug}`}>
                  <Card className="group cursor-pointer hover:border-primary/50 transition-all hover:-translate-y-1 h-full">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-14 h-14 rounded-xl ${category.color} flex items-center justify-center text-2xl`}
                        >
                          {category.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {category.name}
                          </CardTitle>
                          <CardDescription>{category.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
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
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-emerald-600 text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Siap Meningkatkan Literasi Keuangan Syariah Anda?
              </h2>
              <p className="text-lg opacity-90">
                Bergabunglah sekarang dan mulai perjalanan belajar Anda. Gratis
                selamanya!
              </p>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 h-12 mt-4"
                >
                  Daftar Sekarang - Gratis!
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
