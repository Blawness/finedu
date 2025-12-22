# 🎯 Environment-Specific Commands

## 📋 Overview

Sekarang Anda bisa menjalankan command untuk environment tertentu (development atau production) dengan mudah!

---

## 🚀 Quick Reference

### Development (Local Database)
```bash
# Database
bun run db:push:dev          # Push schema ke dev DB
bun run db:seed:dev          # Seed data ke dev DB
bun run db:studio:dev        # Buka Prisma Studio (dev DB)

# Quiz
bun run quiz:import:dev      # Import quiz ke dev DB
bun run quiz:check:dev       # Check quiz di dev DB
```

### Production (Production Database)
```bash
# Database
bun run db:push:prod         # Push schema ke prod DB
bun run db:seed:prod         # Seed data ke prod DB
bun run db:studio:prod       # Buka Prisma Studio (prod DB)

# Quiz
bun run quiz:import:prod     # Import quiz ke prod DB
bun run quiz:check:prod      # Check quiz di prod DB
```

### Default (Menggunakan .env atau .env.development)
```bash
# Database
bun run db:push              # Push schema
bun run db:seed              # Seed data
bun run db:studio            # Buka Prisma Studio

# Quiz
bun run quiz:import          # Import quiz
bun run quiz:check           # Check quiz
```

---

## 📁 Environment Files

Pastikan Anda punya file environment berikut:

```
finedu/
├── .env.development         # Development environment
├── .env.production          # Production environment
└── .env.example            # Template
```

### .env.development
```bash
DATABASE_URL="postgresql://dev-database-url"
ADMIN_SECRET="dev-admin-secret-key-123"
NEXTAUTH_URL="http://localhost:3000"
```

### .env.production
```bash
DATABASE_URL="postgresql://prod-database-url"
ADMIN_SECRET="prod-admin-secret-key"
NEXTAUTH_URL="https://www.finedu.my.id"
```

---

## 🎯 Use Cases

### 1. Import Quiz ke Development Database
```bash
bun run quiz:import:dev
```

**Kapan digunakan:**
- Testing quiz baru di local
- Development dan debugging
- Sebelum deploy ke production

### 2. Import Quiz ke Production Database
```bash
bun run quiz:import:prod
```

**Kapan digunakan:**
- Update quiz di production
- Setelah testing di development
- Maintenance production database

### 3. Check Quiz di Specific Environment
```bash
# Check development
bun run quiz:check:dev

# Check production
bun run quiz:check:prod
```

### 4. Seed Database per Environment
```bash
# Seed development (categories & achievements)
bun run db:seed:dev

# Seed production
bun run db:seed:prod
```

### 5. Open Prisma Studio per Environment
```bash
# Development database
bun run db:studio:dev

# Production database
bun run db:studio:prod
```

---

## 📊 Complete Command List

| Command | Development | Production | Default |
|---------|-------------|------------|---------|
| **Database Push** | `db:push:dev` | `db:push:prod` | `db:push` |
| **Database Seed** | `db:seed:dev` | `db:seed:prod` | `db:seed` |
| **Prisma Studio** | `db:studio:dev` | `db:studio:prod` | `db:studio` |
| **Quiz Import** | `quiz:import:dev` | `quiz:import:prod` | `quiz:import` |
| **Quiz Check** | `quiz:check:dev` | `quiz:check:prod` | `quiz:check` |

---

## 🔧 How It Works

Commands menggunakan `dotenv-cli` untuk load environment variables dari file tertentu:

```json
{
  "quiz:import:dev": "dotenv -e .env.development -- bun run scripts/import-quiz.ts",
  "quiz:import:prod": "dotenv -e .env.production -- bun run scripts/import-quiz.ts"
}
```

**Penjelasan:**
- `dotenv -e .env.development` → Load vars dari `.env.development`
- `--` → Separator
- `bun run scripts/import-quiz.ts` → Command yang dijalankan

---

## 💡 Best Practices

### 1. Development Workflow
```bash
# 1. Edit quiz JSON
vim quiz/kategori.json

# 2. Import ke development
bun run quiz:import:dev

# 3. Test di local
bun run dev

# 4. Verify
bun run quiz:check:dev
```

### 2. Production Deployment
```bash
# 1. Test di development dulu
bun run quiz:import:dev
bun run quiz:check:dev

# 2. Commit & push
git add .
git commit -m "Update quiz"
git push

# 3. Import ke production (via API atau command)
# Option A: Via API (recommended)
curl -X POST "https://www.finedu.my.id/api/admin/import-quiz" \
  -H "Authorization: Bearer SECRET"

# Option B: Via command (jika punya akses DB production)
bun run quiz:import:prod
```

### 3. Database Maintenance
```bash
# Development
bun run db:push:dev          # Update schema
bun run db:seed:dev          # Seed categories
bun run quiz:import:dev      # Import quiz

# Production
bun run db:push:prod         # Update schema
bun run db:seed:prod         # Seed categories
bun run quiz:import:prod     # Import quiz
```

---

## ⚠️ Important Notes

### Security
1. **Jangan commit** `.env.development` dan `.env.production` ke git
2. **Gunakan** `.env.example` sebagai template
3. **Simpan** production credentials dengan aman

### Database Safety
1. **Backup** database sebelum import massal
2. **Test** di development dulu sebelum production
3. **Verify** dengan `quiz:check` setelah import

### Production Access
1. **Untuk production**, lebih aman gunakan API endpoint
2. **Command production** hanya jika punya akses langsung ke DB
3. **Monitor** logs setelah import production

---

## 🎯 Quick Scenarios

### Scenario 1: Update Quiz di Local
```bash
# Edit JSON → Import → Test
vim quiz/kategori.json
bun run quiz:import:dev
bun run dev
```

### Scenario 2: Deploy Quiz ke Production
```bash
# Test local → Commit → Deploy → Import via API
bun run quiz:import:dev
git add . && git commit -m "Update quiz" && git push
curl -X POST "https://www.finedu.my.id/api/admin/import-quiz" \
  -H "Authorization: Bearer SECRET"
```

### Scenario 3: Compare Dev vs Prod
```bash
# Check both environments
bun run quiz:check:dev
bun run quiz:check:prod
```

### Scenario 4: Fresh Setup
```bash
# Development
bun run db:push:dev
bun run db:seed:dev
bun run quiz:import:dev

# Production
bun run db:push:prod
bun run db:seed:prod
bun run quiz:import:prod
```

---

## 📚 Related Documentation

- **quiz/README.md** - Quiz management guide
- **VERCEL_DEPLOYMENT.md** - Production deployment
- **VERCEL_QUICKSTART.md** - Quick reference

---

**Pro Tip**: Gunakan suffix `:dev` untuk development dan `:prod` untuk production pada semua commands! 🚀
