# 🎓 FinEdu - Platform Edukasi Fintech Indonesia

Platform pembelajaran literasi keuangan digital interaktif dengan sistem gamifikasi yang menyenangkan. Belajar tentang fintech, perbankan digital, investasi, dan keuangan pribadi melalui quiz interaktif dengan sistem XP, level, achievement, dan leaderboard.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=flat-square&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square&logo=postgresql)

---

## 📋 Daftar Isi

- [Tentang Project](#-tentang-project)
- [Fitur Utama](#-fitur-utama)
- [Teknologi](#-teknologi)
- [Instalasi](#-instalasi)
- [Penggunaan](#-penggunaan)
- [Struktur Project](#-struktur-project)
- [Database](#-database)
- [Quiz Management](#-quiz-management)
- [Deployment](#-deployment)
- [Tim Pengembang](#-tim-pengembang)
- [Lisensi](#-lisensi)

---

## 🎯 Tentang Project

**FinEdu** adalah platform edukasi fintech yang dirancang khusus untuk meningkatkan literasi keuangan digital masyarakat Indonesia. Platform ini menggunakan pendekatan gamifikasi untuk membuat pembelajaran menjadi lebih menarik dan efektif.

### Kategori Pembelajaran

1. **📖 Dasar Literasi Keuangan** - Budgeting, menabung, pengelolaan keuangan pribadi
2. **🏦 Perbankan Digital** - Mobile banking, transfer, layanan bank digital
3. **📱 Fintech & E-Wallet** - E-wallet, payment gateway, QRIS, pinjaman online
4. **📈 Investasi & Saham** - Saham, reksadana, obligasi, cryptocurrency
5. **🛡️ Asuransi & Proteksi** - Jenis asuransi, klaim, manfaat proteksi
6. **💰 Pajak & Perencanaan** - Pajak penghasilan, NPWP, perencanaan keuangan

---

## ✨ Fitur Utama

### 🎮 Sistem Gamifikasi
- **XP & Level System** - Kumpulkan Experience Points dan naik level
- **Achievement & Badge** - Raih berbagai pencapaian dan badge
- **Daily Streak** - Pertahankan streak harian untuk bonus XP
- **Leaderboard** - Bersaing dengan pengguna lain secara global

### 📚 Pembelajaran Interaktif
- **Quiz Interaktif** - 50+ pertanyaan dengan berbagai tingkat kesulitan
- **Penjelasan Detail** - Setiap jawaban dilengkapi penjelasan edukatif
- **Progress Tracking** - Pantau perkembangan belajar Anda
- **Artikel Edukasi** - 10+ artikel tentang topik keuangan

### 👤 Fitur Pengguna
- **Autentikasi** - Login/Register dengan NextAuth.js
- **Profile Management** - Kelola profil dan lihat statistik
- **History Quiz** - Riwayat quiz yang telah dikerjakan
- **Real-time Updates** - XP dan level update secara real-time

---

## 🛠 Teknologi

### Frontend
- **Next.js 16.1** - React framework dengan App Router
- **React 19.2** - Library UI
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Komponen UI yang dapat disesuaikan
- **Framer Motion** - Animasi dan transisi
- **Lucide React** - Icon library

### Backend & Database
- **Prisma 6** - ORM untuk database
- **PostgreSQL** - Database relational
- **NextAuth.js v5** - Autentikasi
- **bcryptjs** - Password hashing

### State Management & Utils
- **Zustand** - State management
- **React Markdown** - Render markdown content
- **Sonner** - Toast notifications

### Development Tools
- **Bun** - JavaScript runtime & package manager
- **ESLint** - Code linting
- **dotenv-cli** - Environment management

---

## 🚀 Instalasi

### Prerequisites
- **Bun** >= 1.0 (atau Node.js >= 18)
- **PostgreSQL** >= 14
- **Git**

### Langkah Instalasi

1. **Clone repository**
```bash
git clone https://github.com/yourusername/finedu.git
cd finedu
```

2. **Install dependencies**
```bash
bun install
```

3. **Setup environment variables**
```bash
# Copy file example
cp .env.example .env.development

# Edit .env.development dengan kredensial Anda
```

**Isi `.env.development`:**
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/finedu_dev"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Admin
ADMIN_SECRET="your-admin-secret-key"
```

4. **Setup database**
```bash
# Push schema ke database
bun run db:push:dev

# Seed data awal (categories & achievements)
bun run db:seed:dev

# Import quiz
bun run quiz:import:dev
```

5. **Jalankan development server**
```bash
bun run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 📖 Penggunaan

### Development Commands

```bash
# Development server
bun run dev

# Build production
bun run build

# Start production server
bun run start

# Linting
bun run lint
```

### Database Commands

```bash
# Development Database
bun run db:push:dev          # Push schema
bun run db:seed:dev          # Seed data
bun run db:studio:dev        # Buka Prisma Studio

# Production Database
bun run db:push:prod         # Push schema
bun run db:seed:prod         # Seed data
bun run db:studio:prod       # Buka Prisma Studio
```

### Quiz Management

```bash
# Development
bun run quiz:import:dev      # Import quiz dari JSON
bun run quiz:check:dev       # Check quiz di database

# Production
bun run quiz:import:prod     # Import quiz ke production
bun run quiz:check:prod      # Check quiz production
```

---

## 📁 Struktur Project

```
finedu/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── quiz/              # Halaman quiz
│   │   ├── artikel/           # Halaman artikel
│   │   ├── profile/           # Halaman profil
│   │   ├── leaderboard/       # Halaman leaderboard
│   │   ├── achievements/      # Halaman achievements
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── quiz/             # Quiz components
│   │   └── layout/           # Layout components
│   ├── lib/                   # Utility functions
│   ├── types/                 # TypeScript types
│   └── auth.ts               # NextAuth configuration
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Database seeder
├── quiz/                      # Quiz JSON files
│   ├── dasar-literasi-keuangan.json
│   ├── perbankan-digital.json
│   ├── fintech-ewallet.json
│   ├── investasi-saham.json
│   ├── asuransi-proteksi.json
│   └── pajak-perencanaan.json
├── articles/                  # Article JSON files
│   ├── mengenal-dana-darurat.json
│   ├── panduan-budgeting-50-30-20.json
│   └── ...
├── scripts/                   # Utility scripts
│   ├── import-quiz.ts        # Import quiz script
│   └── check-quiz.ts         # Check quiz script
├── public/                    # Static assets
├── .env.development          # Development environment
├── .env.production           # Production environment
└── package.json
```

---

## 🗄 Database

### Schema Overview

**User Management:**
- `User` - Data pengguna, XP, level
- `Account` - OAuth accounts
- `Session` - User sessions
- `VerificationToken` - Email verification

**Quiz System:**
- `Category` - Kategori quiz
- `Quiz` - Data quiz
- `Question` - Pertanyaan quiz
- `AnswerOption` - Opsi jawaban
- `QuizAttempt` - Riwayat quiz
- `UserAnswer` - Jawaban user

**Gamification:**
- `Achievement` - Data achievement
- `UserAchievement` - Achievement user
- `UserStreak` - Daily streak user

### Prisma Studio

Untuk melihat dan mengelola data database:

```bash
# Development
bun run db:studio:dev

# Production
bun run db:studio:prod
```

---

## 📝 Quiz Management

### Format Quiz JSON

Quiz disimpan dalam format JSON di folder `quiz/`:

```json
{
  "category": "dasar-literasi-keuangan",
  "quizzes": [
    {
      "title": "Dasar Budgeting",
      "slug": "dasar-budgeting",
      "description": "Pelajari dasar-dasar budgeting",
      "difficulty": "EASY",
      "xpReward": 100,
      "timeLimit": 300,
      "questions": [
        {
          "content": "Apa itu budgeting?",
          "explanation": "Penjelasan detail...",
          "options": [
            { "content": "Jawaban A", "isCorrect": false },
            { "content": "Jawaban B", "isCorrect": true }
          ]
        }
      ]
    }
  ]
}
```

### Import Quiz

```bash
# Development
bun run quiz:import:dev

# Production (via API)
curl -X POST "https://www.finedu.my.id/api/admin/import-quiz" \
  -H "Authorization: Bearer YOUR_ADMIN_SECRET"
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Push ke GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy ke Vercel**
   - Import project di [vercel.com](https://vercel.com)
   - Set environment variables
   - Deploy!

3. **Setup Database Production**
```bash
# Push schema
bun run db:push:prod

# Seed data
bun run db:seed:prod

# Import quiz via API
curl -X POST "https://your-domain.vercel.app/api/admin/import-quiz" \
  -H "Authorization: Bearer YOUR_ADMIN_SECRET"
```

### Environment Variables (Production)

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-production-secret"
ADMIN_SECRET="your-admin-secret"
```

---

## 👥 Tim Pengembang

Project ini dikembangkan oleh mahasiswa **Universitas Negeri Jakarta (UNJ)** - Program Studi **Bisnis Digital**:

### Development Team

- **Yudha Hafiz** - Full Stack Developer
- **Ramdhan Tri Fauzan** - UI/UX Designer  
- **Raditya Praba Junio** - Project Manager

### Informasi Project

- **Institusi:** Universitas Negeri Jakarta (UNJ)
- **Program Studi:** Bisnis Digital
- **Tahun:** 2025
- **Tujuan:** Meningkatkan literasi keuangan digital masyarakat Indonesia

---

## 📄 Lisensi

Project ini dibuat untuk tujuan edukasi dan pembelajaran.

---

## 🤝 Kontribusi

Kontribusi, issues, dan feature requests sangat diterima!

1. Fork project ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

---

## 📞 Kontak & Support

Jika ada pertanyaan atau masalah, silakan buat issue di repository ini.

---

## 🙏 Acknowledgments

- **Next.js Team** - Framework yang luar biasa
- **Vercel** - Platform deployment
- **shadcn/ui** - Komponen UI yang indah
- **Prisma** - ORM yang powerful
- **Universitas Negeri Jakarta** - Dukungan institusi

---

<div align="center">

**Dibuat dengan ❤️ oleh Mahasiswa UNJ Bisnis Digital**

[Website](https://www.finedu.my.id) • [Report Bug](../../issues)

</div>
