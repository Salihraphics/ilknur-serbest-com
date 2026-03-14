# Docker ile PostgreSQL Kurulum Rehberi

## 1️⃣ Docker Desktop Kur

### Windows'ta:
1. https://www.docker.com/products/docker-desktop/ adresine git
2. "Download for Windows" butonuna tıkla
3. `.msi` dosyasını indir ve çalıştır
4. Kurulum bittikten sonra bilgisayarı yeniden başlat
5. Docker Desktop uygulamasını başlat

**Kontrol et:**
```bash
docker --version
# Çıktı: Docker version 26.0.0 (veya yeneri)
```

---

## 2️⃣ PostgreSQL Container'i Oluştur

### En Basit Komut:
```bash
docker run --name ilknur-db -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:latest
```

**Bu komut ne yapıyor:**
- `--name ilknur-db` → Container'a "ilknur-db" adı veriyor
- `-e POSTGRES_PASSWORD=password` → PostgreSQL admin şifresi "password"
- `-p 5432:5432` → Bağlantı noktası 5432 (varsayılan PostgreSQL portu)
- `-d` → Arka planda çalıştır
- `postgres:latest` → En yeni PostgreSQL versiyonu indir

**Şifre değiştirmek istersen:**
```bash
docker run --name ilknur-db -e POSTGRES_PASSWORD=BENİM_ŞİFREM -p 5432:5432 -d postgres:latest
```

---

## 3️⃣ Container'ı Kontrol Et

### Container çalışıyor mu?
```bash
docker ps

# Çıktı örneği:
# CONTAINER ID   IMAGE      COMMAND                  CREATED         STATUS         PORTS                    NAMES
# abc123def456   postgres   "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   0.0.0.0:5432->5432/tcp  ilknur-db
```

### Sadece ilknur-db'yi görmek istersen:
```bash
docker ps -a | grep ilknur-db
```

---

## 4️⃣ Veritabanını Oluştur

### PostgreSQL Container'ında Komut Çalıştır:
```bash
docker exec -it ilknur-db psql -U postgres -c "CREATE DATABASE ilknurablasite;"

# Çıktı:
# CREATE DATABASE
```

**Oluşturuldu mu kontrol et:**
```bash
docker exec -it ilknur-db psql -U postgres -c "\l"

# Çıktı örneği:
#                               List of databases
#    Name    │  Owner   │ Encoding │  Collate   │    Ctype    │ Access privileges
# ────────────┼──────────┼──────────┼────────────┼─────────────┼───────────────────
#  ilknurablasite │ postgres │ UTF8     │ en_US.utf8 │ en_US.utf8  │
#  postgres   │ postgres │ UTF8     │ en_US.utf8 │ en_US.utf8  │
#  template0  │ postgres │ UTF8     │ en_US.utf8 │ en_US.utf8  │
#  template1  │ postgres │ UTF8     │ en_US.utf8 │ en_US.utf8  │
```

---

## 5️⃣ .env.local Dosyasını Güncelle

### C:\Users\SALIH\Documents\ilknurablasite\.env.local dosyasını aç:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/ilknurablasite"
```

**Eğer farklı şifre kullandıysan:**
```env
DATABASE_URL="postgresql://postgres:BENİM_ŞİFREM@localhost:5432/ilknurablasite"
```

---

## 6️⃣ Prisma Migration Çalıştır

### Proje Klasöründe Terminal Aç:
```bash
cd C:\Users\SALIH\Documents\ilknurablasite

npx prisma migrate deploy

# Çıktı:
# ✓ No pending migrations to apply.
# ✓ Prisma Migrate applied the following migration(s):
# 
# migrations/
#   └─ 20240307120000_init/
#     └─ migration.sql
```

### Eğer migration yoksa:
```bash
npx prisma migrate dev --name init

# Çıktı:
# ✓ Created migration ...
# ✓ Applied migration ...
```

---

## 7️⃣ JSON Verilerini Taşı (İsteğe Bağlı)

Eski blog yazılarını PostgreSQL'e aktarmak istersen:

```bash
npx ts-node --esm src/scripts/migration-blogs.ts

# Çıktı:
# Migrating 2 blog posts...
# ✓ Migrated: Dneme
# ✓ Migrated: hgfhgf
# ✓ Migration completed successfully!
```

---

## 8️⃣ Test Et

```bash
npm run dev

# Tarayıcıda aç:
# http://localhost:3000/Y
# Şifre: ilknurserbest
```

---

## 🔄 Container'ı Başlat/Durdur

### Container'ı Durdur (Verileri Sakla):
```bash
docker stop ilknur-db

# Container durduruldu
```

### Container'ı Yeniden Başlat:
```bash
docker start ilknur-db

# Verilerin Hepsi Koruma Altında
```

### Container'ı Tamamen Sil (VERİ KALIR):
```bash
docker rm ilknur-db
```

### Container + Verileri Sil (GERİ DÖNÜŞ YOK):
```bash
docker rm -v ilknur-db  # -v flag'ı volumeyi de siler
```

---

## 📊 Docker GUI (DkstarPane - Kolay Yönetim)

**Docker Desktop'ın kendi GUI'si kullan:**

1. Docker Desktop uygulamasını aç
2. Sol menüde "Containers" butonuna tıkla
3. "ilknur-db" container'ını gör
4. Sağ tıkla → Pause/Resume/Stop/Remove seçenekleri

---

## 🔧 Sık Sorunlar & Çözümler

### ❌ "Port 5432 already in use"
```bash
# Başka bir port kullan:
docker run --name ilknur-db -e POSTGRES_PASSWORD=password -p 5433:5432 -d postgres

# Sonra .env.local'ı güncelle:
DATABASE_URL="postgresql://postgres:password@localhost:5433/ilknurablasite"
```

### ❌ "Cannot connect to Docker daemon"
```bash
# Docker Desktop'ı başlat veya restart et
docker restart
```

### ❌ "ilknur-db container already exists"
```bash
# Container'ı sil:
docker rm ilknur-db

# Sonra yeniden oluştur:
docker run --name ilknur-db -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
```

### ❌ "Database does not exist"
```bash
# Veritabanını oluştur:
docker exec -it ilknur-db psql -U postgres -c "CREATE DATABASE ilknurablasite;"
```

---

## 💾 Yedekleme & Restore (Önemli!)

### Veritabanını Yedekle:
```bash
docker exec -it ilknur-db pg_dump -U postgres ilknurablasite > backup.sql

# Dosya: C:\Users\SALIH\Documents\ilknurablasite\backup.sql
```

### Yedekten Geri Yükle:
```bash
docker exec -it ilknur-db psql -U postgres ilknurablasite < backup.sql
```

---

## 🎯 Tüm Komutlar Özet

```bash
# 1. Container oluştur
docker run --name ilknur-db -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres

# 2. Veritabanını oluştur
docker exec -it ilknur-db psql -U postgres -c "CREATE DATABASE ilknurablasite;"

# 3. Veritabanları listele
docker exec -it ilknur-db psql -U postgres -c "\l"

# 4. Proje klasöründe: Migration çalıştır
npx prisma migrate deploy

# 5. Blog verilerini taşı (isteğe bağlı)
npx ts-node --esm src/scripts/migration-blogs.ts

# 6. Dev sunucuyu başlat
npm run dev

# 7. Test et
# http://localhost:3000/Y (admin paneli)
```

---

## 📋 Kontrol Listesi

- [ ] Docker Desktop yüklü
- [ ] Container çalışıyor (`docker ps` ile kontrol)
- [ ] Veritabanı oluşturuldu
- [ ] `.env.local` güncellendi
- [ ] `npx prisma migrate deploy` çalıştırıldı
- [ ] `npm run dev` başlatıldı
- [ ] Admin paneline erişebiliyorsun
- [ ] Blog ekleme teste geçti
