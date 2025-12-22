# Quiz Management - FinEdu

Dokumentasi untuk mengelola quiz dalam format JSON dan mengimpornya ke database.

## 📁 Struktur Folder

```
finedu/
├── quiz/                           # Folder berisi file JSON quiz
│   ├── dasar-ekonomi-syariah.json
│   ├── perbankan-syariah.json
│   ├── fintech-syariah.json
│   ├── investasi-halal.json
│   ├── asuransi-syariah.json
│   └── zakat-digital.json
└── scripts/
    └── import-quiz.ts              # Script untuk import quiz ke DB
```

## 📝 Format JSON Quiz

Setiap file JSON berisi array dari quiz objects dengan struktur berikut:

```json
[
  {
    "title": "Judul Quiz",
    "slug": "slug-quiz",
    "description": "Deskripsi quiz",
    "categorySlug": "slug-kategori",
    "difficulty": "EASY|MEDIUM|HARD",
    "xpReward": 100,
    "timeLimit": 300,
    "questions": [
      {
        "content": "Pertanyaan quiz?",
        "explanation": "Penjelasan jawaban yang benar",
        "options": [
          {
            "content": "Pilihan A",
            "isCorrect": false
          },
          {
            "content": "Pilihan B (Benar)",
            "isCorrect": true
          }
        ]
      }
    ]
  }
]
```

### Field Descriptions

- **title**: Judul quiz yang akan ditampilkan
- **slug**: URL-friendly identifier (harus unik)
- **description**: Deskripsi singkat tentang quiz
- **categorySlug**: Slug kategori yang sudah ada di database
  - `dasar-ekonomi-syariah`
  - `perbankan-syariah`
  - `fintech-syariah`
  - `investasi-halal`
  - `asuransi-syariah`
  - `zakat-digital`
- **difficulty**: Tingkat kesulitan (`EASY`, `MEDIUM`, `HARD`)
- **xpReward**: Jumlah XP yang didapat (100-200)
- **timeLimit**: Batas waktu dalam detik (300 = 5 menit)
- **questions**: Array berisi pertanyaan-pertanyaan
  - **content**: Teks pertanyaan
  - **explanation**: Penjelasan jawaban yang benar
  - **options**: Array pilihan jawaban (minimal 2, biasanya 4)
    - **content**: Teks pilihan
    - **isCorrect**: Boolean, hanya 1 yang `true`

## 🚀 Cara Menggunakan

### 1. Pastikan Database Sudah Siap

Jalankan seed untuk membuat kategori:

```bash
bun run db:seed
```

### 2. Buat atau Edit File Quiz JSON

Buat file baru atau edit file yang ada di folder `/quiz`:

```bash
# Contoh membuat quiz baru
touch quiz/nama-kategori.json
```

### 3. Import Quiz ke Database

Jalankan script import:

```bash
bun run quiz:import
```

Script akan:
- ✅ Membaca semua file `.json` di folder `/quiz`
- ✅ Validasi kategori yang ada
- ✅ Membuat atau update quiz
- ✅ Menghapus pertanyaan lama (jika update)
- ✅ Membuat pertanyaan dan pilihan jawaban baru

### 4. Verifikasi di Database

Buka Prisma Studio untuk melihat data:

```bash
bun run db:studio
```

## 📊 Quiz yang Tersedia

### 1. Dasar Ekonomi Syariah (2 quiz)
- ✅ Prinsip Dasar Ekonomi Islam (5 pertanyaan, EASY)
- ✅ Halal dan Haram dalam Ekonomi (6 pertanyaan, MEDIUM)

### 2. Perbankan Syariah (2 quiz)
- ✅ Akad-Akad Perbankan Syariah (6 pertanyaan, MEDIUM)
- ✅ Produk Perbankan Syariah (5 pertanyaan, EASY)

### 3. Fintech Syariah (2 quiz)
- ✅ Pengenalan Fintech Syariah (5 pertanyaan, EASY)
- ✅ Payment Gateway Syariah (6 pertanyaan, MEDIUM)

### 4. Investasi Halal (2 quiz)
- ✅ Dasar Investasi Halal (5 pertanyaan, EASY)
- ✅ Analisis Investasi Syariah (6 pertanyaan, MEDIUM)

### 5. Asuransi Syariah (2 quiz)
- ✅ Konsep Dasar Asuransi Syariah (5 pertanyaan, EASY)
- ✅ Produk dan Akad Takaful (6 pertanyaan, MEDIUM)

### 6. Zakat Digital (2 quiz)
- ✅ Dasar Zakat dalam Islam (5 pertanyaan, EASY)
- ✅ Zakat Digital dan Perhitungannya (6 pertanyaan, MEDIUM)

**Total: 12 quiz dengan 68 pertanyaan**

## 🔄 Update Quiz yang Sudah Ada

Jika ingin mengupdate quiz yang sudah ada:

1. Edit file JSON yang sesuai
2. Jalankan `bun run quiz:import` lagi
3. Script akan otomatis update quiz berdasarkan `slug`

## ⚠️ Catatan Penting

1. **Slug harus unik** - Setiap quiz harus memiliki slug yang berbeda
2. **Category slug harus valid** - Pastikan kategori sudah ada di database
3. **Minimal 1 jawaban benar** - Setiap pertanyaan harus punya minimal 1 jawaban yang benar
4. **Format JSON valid** - Pastikan JSON tidak ada syntax error
5. **Backup data** - Selalu backup database sebelum import massal

## 🛠️ Troubleshooting

### Error: Category not found
```
❌ Category not found: nama-kategori
```
**Solusi**: Pastikan `categorySlug` sesuai dengan slug kategori yang ada di database. Jalankan `bun run db:seed` untuk membuat kategori.

### Error: Duplicate slug
```
❌ Unique constraint failed on the fields: (`slug`)
```
**Solusi**: Ganti slug quiz dengan yang unik.

### Error: Invalid JSON
```
❌ Unexpected token in JSON
```
**Solusi**: Validasi JSON menggunakan JSON validator online atau IDE.

## 📚 Referensi

- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- Database Schema: `prisma/schema.prisma`
- Seed Script: `prisma/seed.ts`

---

**Dibuat dengan ❤️ untuk literasi keuangan syariah Indonesia**
