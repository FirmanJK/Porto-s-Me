# 🚀 PANDUAN DEPLOY PORTFOLIO KE HOSTINGER

## 📋 Persyaratan

- Akun Hostinger dengan hosting aktif
- Domain sudah terhubung (opsional, bisa pakai subdomain hostinger)
- FTP/File Manager access
- Portfolio sudah di-build (`npm run build`)

---

## 📁 FILE YANG AKAN DI-UPLOAD

**HANYA upload isi folder `public/`**, JANGAN upload semua folder project!

```
✅ UPLOAD INI (dari folder public/):
├── index.html
├── 404.html
├── .htaccess (sudah dikonfigurasi)
├── manifest.webmanifest
├── robots.txt
├── sw.js
├── page-data/
├── static/
├── icons/
└── semua file .js, .css, images, dll

❌ JANGAN UPLOAD INI:
├── node_modules/
├── src/
├── .cache/
├── content/
├── gatsby-config.js
├── package.json
└── file development lainnya
```

---

## 🔧 CARA DEPLOY KE HOSTINGER

### Metode 1: Menggunakan File Manager (Recommended untuk Pemula)

1. **Login ke Hostinger**

   - Buka [hpanel.hostinger.com](https://hpanel.hostinger.com)
   - Login dengan akun Anda

2. **Buka File Manager**

   - Di dashboard, klik **"File Manager"**
   - Atau masuk ke hosting Anda → **"Files" → "File Manager"**

3. **Navigasi ke Public HTML**

   - Buka folder `public_html/` (ini adalah root website Anda)
   - Jika ada file lama (index.html default hostinger), hapus semua isinya

4. **Upload File Portfolio**

   - Klik tombol **"Upload Files"** di pojok kanan atas
   - **PENTING:** Compress dulu folder `public/` menjadi ZIP di komputer Anda:
     ```
     1. Masuk ke folder porto/public/
     2. Select ALL files di dalam public/
     3. Klik kanan → "Compress to ZIP" atau "Add to archive"
     4. Beri nama: portfolio.zip
     ```
   - Upload file `portfolio.zip` ke File Manager
   - Setelah upload selesai, klik kanan file ZIP → **"Extract"**
   - Tunggu hingga proses extract selesai
   - Hapus file `portfolio.zip` setelah di-extract

5. **Verifikasi File .htaccess**

   - Pastikan file `.htaccess` ada di root `public_html/`
   - Jika tidak terlihat, aktifkan "Show Hidden Files" di File Manager

6. **Selesai!**
   - Buka domain Anda di browser
   - Portfolio sudah online! 🎉

---

### Metode 2: Menggunakan FTP (FileZilla)

1. **Download FileZilla Client**

   - Download dari [filezilla-project.org](https://filezilla-project.org/)
   - Install di komputer Anda

2. **Dapatkan FTP Credentials dari Hostinger**

   - Login ke Hostinger hPanel
   - Masuk ke hosting → **"Files" → "FTP Accounts"**
   - Catat informasi:
     ```
     Host: ftp.yourdomain.com (atau IP)
     Username: yourusername@yourdomain.com
     Password: [password Anda]
     Port: 21
     ```

3. **Connect dengan FileZilla**

   - Buka FileZilla
   - Masukkan Host, Username, Password, Port
   - Klik **"Quickconnect"**

4. **Upload File**

   - Panel kiri = komputer Anda (local)
   - Panel kanan = server Hostinger (remote)
   - Di panel kiri, navigasi ke: `C:\Users\62817\Documents\GitHub\porto\public\`
   - Di panel kanan, navigasi ke: `public_html/`
   - **Select ALL files** di folder public (local)
   - **Drag & drop** ke panel kanan (atau klik kanan → Upload)
   - Tunggu hingga semua file ter-upload (tergantung ukuran & koneksi)

5. **Selesai!**
   - Buka domain Anda di browser
   - Portfolio sudah online! 🎉

---

## 🔒 SECURITY CHECKLIST

Setelah upload, pastikan:

- ✅ File `.htaccess` sudah ter-upload dan aktif
- ✅ File sensitif (package.json, gatsby-config.js) **TIDAK** ter-upload
- ✅ Folder `node_modules/`, `src/`, `.cache/` **TIDAK** ter-upload
- ✅ Directory browsing disabled (coba akses yourdomain.com/static/ → harus error atau redirect)
- ✅ SSL Certificate sudah aktif (HTTPS)

---

## 🌐 AKTIVASI SSL (HTTPS)

**WAJIB untuk keamanan!**

1. **Install SSL di Hostinger**

   - Login ke hPanel
   - Masuk ke hosting → **"Security" → "SSL"**
   - Pilih domain Anda
   - Klik **"Install SSL"** (biasanya gratis Let's Encrypt SSL)
   - Tunggu beberapa menit hingga aktif

2. **Force HTTPS**
   - Setelah SSL aktif, edit file `.htaccess` di server
   - Cari baris yang ada tulisan:
     ```apache
     # Uncomment 2 baris di bawah setelah SSL aktif:
     # RewriteCond %{HTTPS} off
     # RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
     ```
   - Hapus tanda `#` di depan 2 baris terakhir, jadi:
     ```apache
     # Force HTTPS (SSL aktif)
     RewriteCond %{HTTPS} off
     RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
     ```
   - Save file
   - Sekarang semua HTTP akan redirect ke HTTPS otomatis

---

## 🔄 UPDATE PORTFOLIO (Di Kemudian Hari)

Jika ada perubahan di portfolio:

1. **Di Komputer Lokal:**

   ```bash
   cd C:\Users\62817\Documents\GitHub\porto
   npm run build
   ```

2. **Upload File yang Berubah:**

   - Buka File Manager atau FileZilla
   - Upload hanya file yang berubah dari folder `public/`
   - Atau hapus semua & upload ulang (jika tidak yakin file mana yang berubah)

3. **Clear Cache Browser:**
   - Tekan `Ctrl + Shift + R` atau `Ctrl + F5`
   - Atau buka Incognito/Private mode

---

## 🐛 TROUBLESHOOTING

### Problem: Halaman 404 saat navigasi

**Solusi:**

- Pastikan file `.htaccess` ada dan ter-upload
- Check file `.htaccess` apakah syntax benar
- Restart hosting (optional)

### Problem: CSS/JS tidak load

**Solusi:**

- Clear browser cache (Ctrl + Shift + R)
- Check apakah semua file .css dan .js ter-upload
- Check console browser (F12) untuk error

### Problem: Images tidak muncul

**Solusi:**

- Pastikan folder `static/` dan semua subfolder ter-upload
- Check permissions folder (755)
- Pastikan path images benar

### Problem: Website lambat

**Solusi:**

- Pastikan GZIP compression aktif (.htaccess sudah set)
- Pastikan browser caching aktif
- Optimize images sebelum upload
- Gunakan Cloudflare (optional)

### Problem: 500 Internal Server Error

**Solusi:**

- Check syntax `.htaccess` - mungkin ada error
- Check error log di Hostinger (Files → Error Logs)
- Rename .htaccess jadi .htaccess.bak untuk test apakah .htaccess yang bermasalah
- Contact Hostinger support jika masih error

---

## 📊 OPTIMASI TAMBAHAN

### 1. Cloudflare (Free CDN)

- Daftar di [cloudflare.com](https://cloudflare.com)
- Add domain Anda
- Update nameservers di Hostinger sesuai yang diberikan Cloudflare
- Aktifkan Auto Minify, Brotli, Rocket Loader

### 2. Google Analytics

- Portfolio sudah ada config Google Analytics
- Jika belum, tambahkan tracking ID di `gatsby-config.js` sebelum build

### 3. Performance Test

- Test di [PageSpeed Insights](https://pagespeed.web.dev/)
- Test di [GTmetrix](https://gtmetrix.com/)
- Target: Score 90+ untuk performa optimal

---

## ✅ CHECKLIST DEPLOYMENT

Sebelum declare "LIVE":

- [ ] Build portfolio berhasil (`npm run build`)
- [ ] File `.htaccess` sudah dikonfigurasi
- [ ] Upload semua file dari folder `public/` ke `public_html/`
- [ ] SSL Certificate aktif (HTTPS)
- [ ] Force HTTPS aktif di .htaccess
- [ ] Test semua halaman (Home, About, Projects, Contact, dll)
- [ ] Test navigasi antar halaman
- [ ] Test responsive di mobile
- [ ] Test form contact (jika ada)
- [ ] Check console browser tidak ada error
- [ ] Test di berbagai browser (Chrome, Firefox, Safari, Edge)
- [ ] Gunakan Incognito untuk test versi fresh
- [ ] Performance test (PageSpeed score 90+)

---

## 🎉 PORTFOLIO LIVE!

Selamat! Portfolio Anda sudah online di:

- **HTTP:** http://yourdomain.com
- **HTTPS:** https://yourdomain.com (recommended)

Share link portfolio Anda di:

- LinkedIn Profile
- CV/Resume
- GitHub Profile
- Instagram Bio
- Email signature

---

## 📞 SUPPORT

Jika ada masalah:

1. Check dokumentasi ini dulu
2. Search error di Google
3. Contact Hostinger Support (24/7 Live Chat)
4. Community forum Hostinger

**Good luck! 🚀**
