# 🚀 Quick Reference - Vercel Deployment

## 📝 Ringkasan Singkat

### Cara Tercepat Import Quiz di Vercel

1. **Deploy project** ke Vercel
2. **Set environment variable** `ADMIN_SECRET` di Vercel Dashboard
3. **Panggil API** setelah deploy:

```bash
curl -X POST https://your-app.vercel.app/api/admin/import-quiz \
  -H "Authorization: Bearer your-secret-key"
```

---

## 🔑 Environment Variables yang Diperlukan

Di **Vercel Dashboard → Settings → Environment Variables**, tambahkan:

```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://your-app.vercel.app
ADMIN_SECRET=your-admin-secret-key
```

---

## 📡 API Endpoints

### Import Quiz
```bash
POST /api/admin/import-quiz
Header: Authorization: Bearer {ADMIN_SECRET}
```

### Check Status
```bash
GET /api/admin/import-quiz
Header: Authorization: Bearer {ADMIN_SECRET}
```

---

## 🎯 Workflow Lengkap

### Local Development
```bash
# 1. Edit quiz
vim quiz/kategori.json

# 2. Import local
bun run quiz:import

# 3. Test
bun run dev

# 4. Commit & push
git add .
git commit -m "Update quiz"
git push
```

### Production (Vercel)
```bash
# Setelah auto-deploy dari git push
curl -X POST https://your-app.vercel.app/api/admin/import-quiz \
  -H "Authorization: Bearer your-secret-key"
```

---

## ⚡ Commands Cheat Sheet

```bash
# Local
bun run quiz:import          # Import quiz
bun run quiz:check           # Check stats
bun run db:seed              # Seed categories
bun run db:studio            # Open Prisma Studio

# Vercel CLI
vercel login                 # Login
vercel link                  # Link project
vercel env pull              # Pull env vars
vercel deploy                # Deploy
vercel --prod                # Deploy to production

# API (Production)
curl -X POST https://your-app.vercel.app/api/admin/import-quiz \
  -H "Authorization: Bearer SECRET"

curl https://your-app.vercel.app/api/admin/import-quiz \
  -H "Authorization: Bearer SECRET"
```

---

## 🔒 Security Checklist

- [ ] `ADMIN_SECRET` sudah di-set di Vercel
- [ ] `ADMIN_SECRET` tidak ter-commit di git
- [ ] Database URL aman dan tidak public
- [ ] NEXTAUTH_SECRET sudah di-generate (random string)
- [ ] NEXTAUTH_URL sesuai dengan production URL

---

## 📞 Troubleshooting Cepat

| Error | Solusi |
|-------|--------|
| 401 Unauthorized | Cek ADMIN_SECRET di header |
| 404 Not Found | Pastikan folder /quiz ter-commit |
| 500 Server Error | Cek DATABASE_URL dan logs |
| Category not found | Run seed dulu |

---

## 💡 Pro Tips

1. ✅ Gunakan API route untuk production
2. ✅ Test di local sebelum deploy
3. ✅ Backup database sebelum import
4. ✅ Monitor Vercel logs
5. ✅ Simpan ADMIN_SECRET di password manager

---

**Dokumentasi Lengkap**: Lihat `VERCEL_DEPLOYMENT.md`
