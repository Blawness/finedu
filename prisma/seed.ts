import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "dasar-ekonomi-syariah" },
      update: {},
      create: {
        name: "Dasar Ekonomi Syariah",
        slug: "dasar-ekonomi-syariah",
        description:
          "Pelajari prinsip dasar ekonomi Islam: halal/haram, riba, gharar, dan maysir",
        icon: "📖",
        color: "#10b981",
      },
    }),
    prisma.category.upsert({
      where: { slug: "perbankan-syariah" },
      update: {},
      create: {
        name: "Perbankan Syariah",
        slug: "perbankan-syariah",
        description:
          "Memahami akad-akad dalam perbankan syariah: mudharabah, murabahah, musyarakah, wadi'ah",
        icon: "🏦",
        color: "#3b82f6",
      },
    }),
    prisma.category.upsert({
      where: { slug: "fintech-syariah" },
      update: {},
      create: {
        name: "Fintech Syariah",
        slug: "fintech-syariah",
        description:
          "P2P lending syariah, crowdfunding, dan payment gateway berbasis syariah",
        icon: "📱",
        color: "#8b5cf6",
      },
    }),
    prisma.category.upsert({
      where: { slug: "investasi-halal" },
      update: {},
      create: {
        name: "Investasi Halal",
        slug: "investasi-halal",
        description:
          "Saham syariah, sukuk, reksadana syariah, dan instrumen investasi halal lainnya",
        icon: "📈",
        color: "#f59e0b",
      },
    }),
    prisma.category.upsert({
      where: { slug: "asuransi-syariah" },
      update: {},
      create: {
        name: "Asuransi Syariah",
        slug: "asuransi-syariah",
        description: "Takaful, hibah, dan konsep asuransi berbasis syariah",
        icon: "🛡️",
        color: "#ef4444",
      },
    }),
    prisma.category.upsert({
      where: { slug: "zakat-digital" },
      update: {},
      create: {
        name: "Zakat Digital",
        slug: "zakat-digital",
        description:
          "Perhitungan zakat, platform digital, infaq dan sedekah online",
        icon: "💰",
        color: "#06b6d4",
      },
    }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  // Create sample quiz for "Dasar Ekonomi Syariah"
  const quiz1 = await prisma.quiz.upsert({
    where: { slug: "pengenalan-ekonomi-syariah" },
    update: {},
    create: {
      title: "Pengenalan Ekonomi Syariah",
      slug: "pengenalan-ekonomi-syariah",
      description:
        "Quiz dasar untuk memahami konsep-konsep fundamental dalam ekonomi syariah",
      categoryId: categories[0].id,
      difficulty: "EASY",
      xpReward: 100,
      timeLimit: 300,
    },
  });

  // Create questions for quiz1
  const questions = [
    {
      content: "Apa yang dimaksud dengan 'riba' dalam ekonomi Islam?",
      explanation:
        "Riba adalah tambahan atau kelebihan yang diambil dari transaksi utang-piutang atau jual beli secara batil. Islam melarang riba karena dianggap tidak adil dan eksploitatif.",
      options: [
        { content: "Keuntungan dari perdagangan yang halal", isCorrect: false },
        {
          content: "Tambahan yang diambil dari pinjaman secara batil",
          isCorrect: true,
        },
        { content: "Pembagian hasil usaha antara dua pihak", isCorrect: false },
        { content: "Biaya administrasi bank", isCorrect: false },
      ],
    },
    {
      content: "Apa perbedaan utama antara bank syariah dan bank konvensional?",
      explanation:
        "Bank syariah tidak menggunakan sistem bunga (riba) melainkan menggunakan sistem bagi hasil (profit sharing) yang sesuai dengan prinsip syariah.",
      options: [
        {
          content: "Bank syariah tidak memberikan pinjaman",
          isCorrect: false,
        },
        {
          content: "Bank syariah menggunakan sistem bagi hasil, bukan bunga",
          isCorrect: true,
        },
        { content: "Bank syariah hanya untuk muslim", isCorrect: false },
        { content: "Bank syariah tidak memiliki ATM", isCorrect: false },
      ],
    },
    {
      content: "Apa yang dimaksud dengan 'gharar' dalam transaksi syariah?",
      explanation:
        "Gharar adalah ketidakjelasan atau ketidakpastian dalam suatu transaksi. Islam melarang transaksi yang mengandung gharar karena dapat merugikan salah satu pihak.",
      options: [
        { content: "Keuntungan yang berlebihan", isCorrect: false },
        { content: "Ketidakjelasan atau ketidakpastian", isCorrect: true },
        { content: "Pemberian hadiah", isCorrect: false },
        { content: "Simpanan yang aman", isCorrect: false },
      ],
    },
    {
      content: "Akad mudharabah adalah bentuk kerjasama antara...",
      explanation:
        "Mudharabah adalah kerjasama antara pemilik modal (shahibul maal) dan pengelola dana (mudharib) dengan pembagian keuntungan sesuai kesepakatan.",
      options: [
        { content: "Penjual dan pembeli", isCorrect: false },
        { content: "Pemilik modal dan pengelola dana", isCorrect: true },
        { content: "Bank dan nasabah", isCorrect: false },
        { content: "Pegawai dan perusahaan", isCorrect: false },
      ],
    },
    {
      content:
        "Prinsip dasar ekonomi syariah yang melarang judi disebut...",
      explanation:
        "Maysir adalah segala bentuk perjudian atau spekulasi yang mengandung unsur untung-untungan. Islam melarang maysir karena dapat menyebabkan kerugian dan ketidakadilan.",
      options: [
        { content: "Riba", isCorrect: false },
        { content: "Gharar", isCorrect: false },
        { content: "Maysir", isCorrect: true },
        { content: "Tadlis", isCorrect: false },
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
