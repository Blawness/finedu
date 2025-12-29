import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "dasar-literasi-keuangan" },
      update: {
        name: "Dasar Literasi Keuangan",
        description: "Pelajari konsep dasar keuangan: budgeting, menabung, dan pengelolaan keuangan pribadi",
        icon: "📖",
        color: "#10b981",
      },
      create: {
        name: "Dasar Literasi Keuangan",
        slug: "dasar-literasi-keuangan",
        description:
          "Pelajari konsep dasar keuangan: budgeting, menabung, dan pengelolaan keuangan pribadi",
        icon: "📖",
        color: "#10b981",
      },
    }),
    prisma.category.upsert({
      where: { slug: "perbankan-digital" },
      update: {
        name: "Perbankan Digital",
        description: "Mobile banking, transfer, dan berbagai layanan bank digital di Indonesia",
        icon: "🏦",
        color: "#3b82f6",
      },
      create: {
        name: "Perbankan Digital",
        slug: "perbankan-digital",
        description:
          "Mobile banking, transfer, dan berbagai layanan bank digital di Indonesia",
        icon: "🏦",
        color: "#3b82f6",
      },
    }),
    prisma.category.upsert({
      where: { slug: "fintech-ewallet" },
      update: {
        name: "Fintech & E-Wallet",
        description: "E-wallet, payment gateway, QRIS, dan pinjaman online di Indonesia",
        icon: "📱",
        color: "#8b5cf6",
      },
      create: {
        name: "Fintech & E-Wallet",
        slug: "fintech-ewallet",
        description:
          "E-wallet, payment gateway, QRIS, dan pinjaman online di Indonesia",
        icon: "📱",
        color: "#8b5cf6",
      },
    }),
    prisma.category.upsert({
      where: { slug: "investasi-saham" },
      update: {
        name: "Investasi & Saham",
        description: "Saham, reksadana, obligasi, dan instrumen investasi lainnya",
        icon: "📈",
        color: "#f59e0b",
      },
      create: {
        name: "Investasi & Saham",
        slug: "investasi-saham",
        description:
          "Saham, reksadana, obligasi, dan instrumen investasi lainnya",
        icon: "📈",
        color: "#f59e0b",
      },
    }),
    prisma.category.upsert({
      where: { slug: "asuransi-proteksi" },
      update: {
        name: "Asuransi & Proteksi",
        description: "Jenis asuransi, cara klaim, dan manfaat proteksi keuangan",
        icon: "🛡️",
        color: "#ef4444",
      },
      create: {
        name: "Asuransi & Proteksi",
        slug: "asuransi-proteksi",
        description: "Jenis asuransi, cara klaim, dan manfaat proteksi keuangan",
        icon: "🛡️",
        color: "#ef4444",
      },
    }),
    prisma.category.upsert({
      where: { slug: "pajak-perencanaan" },
      update: {
        name: "Pajak & Perencanaan",
        description: "Pajak penghasilan, NPWP, dan perencanaan keuangan jangka panjang",
        icon: "💰",
        color: "#06b6d4",
      },
      create: {
        name: "Pajak & Perencanaan",
        slug: "pajak-perencanaan",
        description:
          "Pajak penghasilan, NPWP, dan perencanaan keuangan jangka panjang",
        icon: "💰",
        color: "#06b6d4",
      },
    }),
    prisma.category.upsert({
      where: { slug: "fintech-syariah" },
      update: {
        name: "Fintech Syariah",
        description: "Layanan keuangan digital berbasis prinsip syariah",
        icon: "🌙",
        color: "#059669",
      },
      create: {
        name: "Fintech Syariah",
        slug: "fintech-syariah",
        description: "Layanan keuangan digital berbasis prinsip syariah",
        icon: "🌙",
        color: "#059669",
      },
    }),
    prisma.category.upsert({
      where: { slug: "zakat-digital" },
      update: {
        name: "Zakat & Wakaf Digital",
        description: "Pengelolaan zakat dan wakaf melalui platform digital",
        icon: "🤝",
        color: "#0891b2",
      },
      create: {
        name: "Zakat & Wakaf Digital",
        slug: "zakat-digital",
        description: "Pengelolaan zakat dan wakaf melalui platform digital",
        icon: "🤝",
        color: "#0891b2",
      },
    }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  // Create sample quiz for "Dasar Literasi Keuangan"
  const quiz1 = await prisma.quiz.upsert({
    where: { slug: "pengenalan-literasi-keuangan" },
    update: {},
    create: {
      title: "Pengenalan Literasi Keuangan",
      slug: "pengenalan-literasi-keuangan",
      description:
        "Quiz dasar untuk memahami konsep-konsep fundamental dalam pengelolaan keuangan pribadi",
      categoryId: categories[0].id,
      difficulty: "EASY",
      xpReward: 100,
      timeLimit: 300,
    },
  });

  // Create questions for quiz1
  const questions = [
    {
      content: "Apa yang dimaksud dengan 'budgeting' dalam keuangan pribadi?",
      explanation:
        "Budgeting adalah proses merencanakan dan mengontrol pengeluaran dengan membuat anggaran. Ini membantu memastikan uang digunakan secara efektif untuk memenuhi kebutuhan dan tujuan finansial.",
      options: [
        { content: "Meminjam uang dari bank", isCorrect: false },
        {
          content: "Merencanakan dan mengontrol pemasukan serta pengeluaran",
          isCorrect: true,
        },
        { content: "Investasi saham di bursa efek", isCorrect: false },
        { content: "Menabung semua pendapatan", isCorrect: false },
      ],
    },
    {
      content: "Berapa persentase ideal untuk dana darurat dari pengeluaran bulanan?",
      explanation:
        "Idealnya, dana darurat sebesar 3-6 bulan pengeluaran. Ini untuk mengantisipasi situasi darurat seperti kehilangan pekerjaan atau biaya medis tak terduga.",
      options: [
        {
          content: "1 bulan pengeluaran",
          isCorrect: false,
        },
        {
          content: "3-6 bulan pengeluaran",
          isCorrect: true,
        },
        { content: "10% dari gaji bulanan", isCorrect: false },
        { content: "50% dari total aset", isCorrect: false },
      ],
    },
    {
      content: "Apa perbedaan antara 'kebutuhan' dan 'keinginan' dalam keuangan?",
      explanation:
        "Kebutuhan adalah hal esensial untuk hidup (makanan, tempat tinggal, kesehatan), sedangkan keinginan adalah hal yang diinginkan tapi tidak wajib (gadget terbaru, liburan mewah).",
      options: [
        { content: "Tidak ada perbedaan", isCorrect: false },
        { content: "Kebutuhan = esensial, Keinginan = tidak wajib", isCorrect: true },
        { content: "Kebutuhan lebih mahal dari keinginan", isCorrect: false },
        { content: "Keinginan lebih penting dari kebutuhan", isCorrect: false },
      ],
    },
    {
      content: "Apa itu compound interest (bunga majemuk)?",
      explanation:
        "Compound interest adalah bunga yang dihitung dari pokok ditambah bunga sebelumnya. Ini membuat investasi tumbuh lebih cepat seiring waktu karena 'bunga berbunga'.",
      options: [
        { content: "Bunga tetap yang tidak berubah", isCorrect: false },
        { content: "Bunga yang dihitung dari pokok plus bunga sebelumnya", isCorrect: true },
        { content: "Biaya administrasi bank", isCorrect: false },
        { content: "Penalti keterlambatan pembayaran", isCorrect: false },
      ],
    },
    {
      content: "Prinsip 50/30/20 dalam budgeting artinya...",
      explanation:
        "Prinsip 50/30/20 adalah panduan alokasi pendapatan: 50% untuk kebutuhan, 30% untuk keinginan, dan 20% untuk tabungan/investasi.",
      options: [
        { content: "50% tabungan, 30% investasi, 20% pengeluaran", isCorrect: false },
        { content: "50% kebutuhan, 30% keinginan, 20% tabungan/investasi", isCorrect: true },
        { content: "50% makan, 30% transportasi, 20% hiburan", isCorrect: false },
        { content: "Jumlah cicilan maksimal", isCorrect: false },
      ],
    },
  ];

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const question = await prisma.question.upsert({
      where: {
        id: i + 1,
      },
      update: {},
      create: {
        quizId: quiz1.id,
        content: q.content,
        explanation: q.explanation,
        order: i + 1,
      },
    });

    for (const opt of q.options) {
      await prisma.answerOption.create({
        data: {
          questionId: question.id,
          content: opt.content,
          isCorrect: opt.isCorrect,
        },
      });
    }
  }

  console.log(`✅ Created quiz "${quiz1.title}" with ${questions.length} questions`);

  // Create Achievements
  const achievements = await Promise.all([
    prisma.achievement.upsert({
      where: { name: "Langkah Pertama" },
      update: {},
      create: {
        name: "Langkah Pertama",
        description: "Selesaikan quiz pertama Anda",
        icon: "🎯",
        type: "QUIZ_COMPLETE",
        threshold: 1,
        badgeColor: "#10b981",
      },
    }),
    prisma.achievement.upsert({
      where: { name: "Pembelajar Aktif" },
      update: {},
      create: {
        name: "Pembelajar Aktif",
        description: "Selesaikan 10 quiz",
        icon: "📚",
        type: "QUIZ_COMPLETE",
        threshold: 10,
        badgeColor: "#3b82f6",
      },
    }),
    prisma.achievement.upsert({
      where: { name: "Ahli Quiz" },
      update: {},
      create: {
        name: "Ahli Quiz",
        description: "Selesaikan 50 quiz",
        icon: "🏆",
        type: "QUIZ_COMPLETE",
        threshold: 50,
        badgeColor: "#f59e0b",
      },
    }),
    prisma.achievement.upsert({
      where: { name: "Sempurna!" },
      update: {},
      create: {
        name: "Sempurna!",
        description: "Dapatkan skor 100% pada quiz",
        icon: "⭐",
        type: "PERFECT_SCORE",
        threshold: 1,
        badgeColor: "#fbbf24",
      },
    }),
    prisma.achievement.upsert({
      where: { name: "Konsisten" },
      update: {},
      create: {
        name: "Konsisten",
        description: "Belajar 7 hari berturut-turut",
        icon: "🔥",
        type: "STREAK",
        threshold: 7,
        badgeColor: "#ef4444",
      },
    }),
    prisma.achievement.upsert({
      where: { name: "Dedikasi" },
      update: {},
      create: {
        name: "Dedikasi",
        description: "Belajar 30 hari berturut-turut",
        icon: "💪",
        type: "STREAK",
        threshold: 30,
        badgeColor: "#8b5cf6",
      },
    }),
    prisma.achievement.upsert({
      where: { name: "Rising Star" },
      update: {},
      create: {
        name: "Rising Star",
        description: "Kumpulkan 1000 XP",
        icon: "🌟",
        type: "XP_MILESTONE",
        threshold: 1000,
        badgeColor: "#06b6d4",
      },
    }),
    prisma.achievement.upsert({
      where: { name: "Knowledge Seeker" },
      update: {},
      create: {
        name: "Knowledge Seeker",
        description: "Kumpulkan 5000 XP",
        icon: "🎓",
        type: "XP_MILESTONE",
        threshold: 5000,
        badgeColor: "#ec4899",
      },
    }),
  ]);

  console.log(`✅ Created ${achievements.length} achievements`);

  console.log("🎉 Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
