# 🔧 Troubleshooting - Vercel API Import Quiz

## ❌ Error: "Unauthorized" atau Redirect ke SSO

Jika Anda mendapat error `{"error":"Unauthorized"}` atau redirect ke halaman SSO Vercel, berikut solusinya:

---

## ✅ Solusi 1: Set Environment Variable di Vercel

### Step-by-Step:

1. **Buka Vercel Dashboard**
   - Go to: https://vercel.com/dashboard
   - Pilih project **finedu**

2. **Masuk ke Settings**
   - Klik tab **Settings**
   - Pilih **Environment Variables** di sidebar

3. **Tambah ADMIN_SECRET**
   - Klik **Add New**
   - Name: `ADMIN_SECRET`
   - Value: `dev-admin-secret-key-123` (atau secret key yang kamu mau)
   - Environment: Pilih **Production**, **Preview**, dan **Development**
   - Klik **Save**

4. **Redeploy Project**
   - Kembali ke tab **Deployments**
   - Klik titik tiga (...) pada deployment terakhir
   - Klik **Redeploy**
   - ATAU push commit baru:
   ```bash
   git commit --allow-empty -m "Trigger redeploy"
   git push
   ```

5. **Tunggu Deploy Selesai**
   - Tunggu sampai status deployment **Ready**
   - Biasanya 1-2 menit

6. **Test Lagi**
   ```bash
   curl -X POST "https://finedu-git-main-blawness-projects.vercel.app/api/admin/import-quiz" \
     -H "Authorization: Bearer dev-admin-secret-key-123"
   ```

---

## ✅ Solusi 2: Cek Environment Variables via Vercel CLI

```bash
# Install Vercel CLI jika belum
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# List environment variables
vercel env ls

# Add ADMIN_SECRET
vercel env add ADMIN_SECRET
# Masukkan value: dev-admin-secret-key-123
# Pilih environment: Production, Preview, Development

# Pull untuk verify
vercel env pull .env.vercel
cat .env.vercel
```

---

## ✅ Solusi 3: Gunakan Domain Production

Jika menggunakan custom domain `finedu.my.id`, pastikan:

1. **Domain sudah terhubung** di Vercel
2. **Environment variables** sudah di-set
3. **Deployment** sudah selesai

Test dengan domain production:
```bash
curl -X POST "https://www.finedu.my.id/api/admin/import-quiz" \
  -H "Authorization: Bearer dev-admin-secret-key-123"
```

---

## 🔍 Cara Verify Environment Variable Sudah Ter-set

### Method 1: Via Vercel Dashboard
1. Go to: https://vercel.com/blawness-projects/finedu/settings/environment-variables
2. Cek apakah `ADMIN_SECRET` ada di list
3. Pastikan ada checkmark di Production, Preview, Development

### Method 2: Via API Test
Buat file test sederhana untuk cek env var:

**src/app/api/test-env/route.ts**
```typescript
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasAdminSecret: !!process.env.ADMIN_SECRET,
    adminSecretLength: process.env.ADMIN_SECRET?.length || 0,
  });
}
```

Test:
```bash
curl https://finedu-git-main-blawness-projects.vercel.app/api/test-env
```

Expected response:
```json
{
  "hasAdminSecret": true,
  "adminSecretLength": 23
}
```

---

## 🐛 Common Issues

### Issue 1: Environment Variable Tidak Terbaca
**Penyebab**: Belum redeploy setelah add env var
**Solusi**: Redeploy project

### Issue 2: Unauthorized Terus
**Penyebab**: 
- Secret key salah
- Header format salah
- Env var belum di-set

**Solusi**:
```bash
# Pastikan format header benar (ada "Bearer ")
curl -X POST "URL" -H "Authorization: Bearer SECRET"

# Bukan:
curl -X POST "URL" -H "Authorization: SECRET"  # ❌ SALAH
```

### Issue 3: Redirect ke SSO
**Penyebab**: URL salah atau project private
**Solusi**: Pastikan URL endpoint benar dan project public

---

## ✅ Checklist Lengkap

- [ ] ADMIN_SECRET sudah di-set di Vercel Dashboard
- [ ] Environment variable di-set untuk Production, Preview, Development
- [ ] Project sudah di-redeploy setelah add env var
- [ ] Deployment status = Ready
- [ ] Curl command format benar (ada "Bearer ")
- [ ] URL endpoint benar (`/api/admin/import-quiz`)
- [ ] Secret key sama dengan yang di Vercel

---

## 🎯 Quick Fix Command

```bash
# 1. Set env var via CLI
vercel env add ADMIN_SECRET production
# Input: dev-admin-secret-key-123

# 2. Redeploy
git commit --allow-empty -m "Redeploy for env vars"
git push

# 3. Wait 1-2 minutes

# 4. Test
curl -X POST "https://finedu-git-main-blawness-projects.vercel.app/api/admin/import-quiz" \
  -H "Authorization: Bearer dev-admin-secret-key-123"
```

---

## 📞 Jika Masih Error

1. **Cek Vercel Logs**
   - Go to: https://vercel.com/blawness-projects/finedu
   - Tab **Deployments** → Klik deployment terakhir
   - Tab **Logs** → Lihat error message

2. **Test di Local Dulu**
   ```bash
   # Pastikan .env.development ada ADMIN_SECRET
   bun run dev
   
   # Test local
   curl -X POST "http://localhost:3000/api/admin/import-quiz" \
     -H "Authorization: Bearer dev-admin-secret-key-123"
   ```

3. **Cek File Route**
   - Pastikan file `src/app/api/admin/import-quiz/route.ts` ter-commit
   - Pastikan tidak ada syntax error

---

**Need Help?** Cek logs di Vercel Dashboard untuk detail error message.
