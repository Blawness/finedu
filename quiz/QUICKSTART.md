# 🚀 Quick Start - Quiz Management

## Perintah Cepat

```bash
# Import semua quiz dari folder /quiz ke database
bun run quiz:import

# Cek statistik quiz di database
bun run quiz:check

# Buka database viewer (Prisma Studio)
bun run db:studio

# Seed database (kategori & achievements)
bun run db:seed
```

## Workflow Menambah Quiz Baru

### 1️⃣ Buat File JSON Baru
```bash
# Di folder /quiz
touch quiz/nama-kategori-baru.json
```

### 2️⃣ Isi dengan Format Berikut
```json
[
  {
    "title": "Judul Quiz",
    "slug": "slug-unik-quiz",
    "description": "Deskripsi quiz",
    "categorySlug": "slug-kategori-yang-ada",
    "difficulty": "EASY",
    "xpReward": 100,
    "timeLimit": 300,
    "questions": [
      {
        "content": "Pertanyaan?",
        "explanation": "Penjelasan jawaban",
        "options": [
          { "content": "Pilihan A", "isCorrect": false },
          { "content": "Pilihan B", "isCorrect": true },
          { "content": "Pilihan C", "isCorrect": false },
          { "content": "Pilihan D", "isCorrect": false }
        ]
      }
    ]
  }
]
```

### 3️⃣ Import ke Database
```bash
bun run quiz:import
```

### 4️⃣ Verifikasi
```bash
bun run quiz:check
# atau
bun run db:studio
```

## 📋 Kategori yang Tersedia

| Slug Kategori | Nama | Icon |
|---------------|------|------|
| `dasar-ekonomi-syariah` | Dasar Ekonomi Syariah | 📖 |
| `perbankan-syariah` | Perbankan Syariah | 🏦 |
| `fintech-syariah` | Fintech Syariah | 📱 |
| `investasi-halal` | Investasi Halal | 📈 |
| `asuransi-syariah` | Asuransi Syariah | 🛡️ |
| `zakat-digital` | Zakat Digital | 💰 |

## 🎯 Tingkat Kesulitan

| Difficulty | XP Reward | Time Limit | Jumlah Soal |
|------------|-----------|------------|-------------|
| `EASY` | 100 | 300s (5 min) | 5 soal |
| `MEDIUM` | 150 | 420s (7 min) | 6 soal |
| `HARD` | 200 | 600s (10 min) | 8-10 soal |

## ✅ Checklist Sebelum Import

- [ ] File JSON valid (tidak ada syntax error)
- [ ] Slug quiz unik (belum ada di database)
- [ ] Category slug valid (ada di database)
- [ ] Setiap pertanyaan punya minimal 1 jawaban benar
- [ ] Penjelasan sudah lengkap untuk setiap pertanyaan
- [ ] Difficulty sesuai (EASY/MEDIUM/HARD)
- [ ] XP reward sesuai tingkat kesulitan

## 🔧 Troubleshooting Cepat

### Quiz tidak muncul di aplikasi?
```bash
# Cek apakah quiz sudah masuk database
bun run quiz:check

# Pastikan isActive = true
bun run db:studio
# Cek field isActive di tabel Quiz
```

### Error saat import?
```bash
# Validasi JSON
# Gunakan https://jsonlint.com/

# Cek log error
bun run quiz:import
# Baca pesan error dengan teliti
```

### Ingin update quiz yang sudah ada?
```bash
# 1. Edit file JSON
# 2. Import ulang (akan auto-update berdasarkan slug)
bun run quiz:import
```

## 📊 Status Saat Ini

✅ **12 Quiz** telah dibuat  
✅ **68 Pertanyaan** siap digunakan  
✅ **6 Kategori** lengkap  
✅ **1,500 XP** total reward  

## 📚 Dokumentasi Lengkap

- **README.md** - Dokumentasi detail format & penggunaan
- **SUMMARY.md** - Ringkasan semua quiz yang ada
- **QUICKSTART.md** - File ini (panduan cepat)

---

**Tips**: Selalu backup database sebelum import massal! 🔐
