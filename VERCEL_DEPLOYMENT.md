# 🚀 Deployment & Running Scripts di Vercel

## Cara Menjalankan Script di Vercel

Ada beberapa cara untuk menjalankan script `quiz:import` di environment Vercel:

---

## 🌐 Opsi 1: API Route (✅ RECOMMENDED untuk Production)

Saya sudah membuat API endpoint yang bisa dipanggil untuk import quiz.

### 1. Setup Environment Variable

Tambahkan di Vercel Dashboard → Settings → Environment Variables:

```
ADMIN_SECRET=your-super-secret-key-here-change-this
```

### 2. Deploy Project ke Vercel

```bash
git add .
git commit -m "Add quiz import API"
git push
```

### 3. Panggil API untuk Import Quiz

**Menggunakan cURL:**
```bash
curl -X POST https://your-app.vercel.app/api/admin/import-quiz \
  -H "Authorization: Bearer your-super-secret-key-here-change-this"
```

**Menggunakan Postman/Insomnia:**
- Method: `POST`
- URL: `https://your-app.vercel.app/api/admin/import-quiz`
- Headers: `Authorization: Bearer your-super-secret-key-here-change-this`

**Menggunakan JavaScript/Fetch:**
```javascript
fetch('https://your-app.vercel.app/api/admin/import-quiz', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-super-secret-key-here-change-this'
  }
})
.then(res => res.json())
.then(data => console.log(data));
```

### 4. Cek Status Quiz (GET)

```bash
curl https://www.finedu.my.id/api/admin/import-quiz \
  -H "Authorization: Bearer your-super-secret-key-here-change-this"
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalCategories": 6,
    "totalQuizzes": 12,
    "totalQuestions": 68
  },
  "categories": [...]
}
```

---

## 📦 Opsi 2: Vercel CLI (Recommended untuk Development)

### 1. Install Vercel CLI
```bash
npm i -g vercel
# atau
bun add -g vercel
```

### 2. Login ke Vercel
```bash
vercel login
```

### 3. Link Project
```bash
cd c:\Users\Laptop MSI\Project\finedu
vercel link
```

### 4. Pull Environment Variables
```bash
vercel env pull .env.local
```

### 5. Jalankan Script Lokal dengan Vercel Environment
```bash
# Import quiz
vercel env pull && bun run quiz:import

# Check quiz
vercel env pull && bun run quiz:check
```

---

## 🔧 Opsi 3: Build Hook (⚠️ Use with Caution)

Tambahkan script import ke dalam build process:

### Update package.json
```json
{
  "scripts": {
    "build": "prisma generate && next build --webpack",
    "vercel-build": "prisma generate && prisma db push && next build --webpack"
  }
}
```

**⚠️ Warning**: Jangan tambahkan `quiz:import` di build script karena akan running setiap deploy!

---

## 🎯 Workflow yang Direkomendasikan

### Untuk Development (Local)
```bash
# 1. Edit quiz JSON files
# 2. Import ke local database
bun run quiz:import

# 3. Test locally
bun run dev

# 4. Commit & push
git add .
git commit -m "Update quiz"
git push
```

### Untuk Production (Vercel)
```bash
# Setelah deploy, panggil API endpoint
curl -X POST https://your-app.vercel.app/api/admin/import-quiz \
  -H "Authorization: Bearer your-secret-key"
```

---

## 📋 Checklist Deployment

### Sebelum Deploy
- [ ] Pastikan semua quiz JSON valid
- [ ] Test import di local: `bun run quiz:import`
- [ ] Commit semua perubahan
- [ ] Push ke repository

### Di Vercel Dashboard
- [ ] Set environment variable `DATABASE_URL`
- [ ] Set environment variable `ADMIN_SECRET`
- [ ] Set environment variable `NEXTAUTH_SECRET`
- [ ] Set environment variable `NEXTAUTH_URL`

### Setelah Deploy
- [ ] Jalankan seed (kategori & achievements) via Vercel CLI atau API
- [ ] Import quiz via API endpoint
- [ ] Verifikasi di Prisma Studio atau via API GET

---

## 🔐 Security Notes

1. **ADMIN_SECRET** harus kuat dan rahasia
2. Jangan commit secret ke git
3. API endpoint `/api/admin/*` harus dilindungi
4. Gunakan HTTPS untuk semua request
5. Pertimbangkan rate limiting untuk API

---

## 🛠️ Troubleshooting

### Error: "Quiz directory not found"
- Pastikan folder `/quiz` ada di repository
- Pastikan semua file JSON ter-commit

### Error: "Unauthorized"
- Cek `ADMIN_SECRET` di environment variables
- Pastikan header Authorization benar

### Error: "Category not found"
- Jalankan seed terlebih dahulu: `bun run db:seed`
- Atau panggil API seed jika ada

### Database Connection Error
- Cek `DATABASE_URL` di environment variables
- Pastikan database accessible dari Vercel

---

## 📚 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/admin/import-quiz` | POST | Import semua quiz dari JSON |
| `/api/admin/import-quiz` | GET | Cek statistik quiz |

**Headers Required:**
```
Authorization: Bearer {ADMIN_SECRET}
```

---

## 💡 Tips

1. **Gunakan API Route** untuk production - lebih aman dan terkontrol
2. **Backup database** sebelum import massal
3. **Test di local** sebelum import ke production
4. **Monitor logs** di Vercel Dashboard
5. **Set up Vercel Cron** untuk scheduled imports jika diperlukan

