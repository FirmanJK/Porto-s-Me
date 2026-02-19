# 📸 PANDUAN MENAMBAHKAN GAMBAR/LOGO

## ✅ Yang Sudah Ditambahkan:

### 1. **Featured Projects Baru** (Some Things I've Built)

#### **Lippo Archive System (Matos)**

- **Link:** https://archivematos.com
- **Lokasi:** `content/featured/LippoArchive/`
- **Screenshot:** Tambahkan file `lippo-archive.png`
- **Cara:**
  1. Buka https://archivematos.com
  2. Ambil screenshot (Full page atau homepage hero section)
  3. Crop/resize ke 1200x800px (ratio 16:9)
  4. Simpan sebagai `lippo-archive.png`
  5. Letakkan di: `content/featured/LippoArchive/`

#### **UKM RISPOL Portfolio**

- **Link:** https://rohispolinema.com
- **Lokasi:** `content/featured/RISPOL/`
- **Screenshot:** Tambahkan file `rispol-portfolio.png`
- **Cara:**
  1. Buka https://rohispolinema.com
  2. Ambil screenshot (Full page atau homepage hero section)
  3. Crop/resize ke 1200x800px (ratio 16:9)
  4. Simpan sebagai `rispol-portfolio.png`
  5. Letakkan di: `content/featured/RISPOL/`

---

### 2. **Organizations Logo** (Organizations I've Joined)

Component sudah dimodifikasi untuk mendukung logo! Sekarang Anda bisa menambahkan logo untuk setiap organisasi.

#### **Lokasi & Nama File:**

| Organisasi               | Folder                                     | Nama File Logo           |
| ------------------------ | ------------------------------------------ | ------------------------ |
| Politeknik Negeri Malang | `content/organizations/PolinemaKeagamaan/` | `polinema-logo.png`      |
| AMKI Muda Java Timur     | `content/organizations/AMKIMudaJatim/`     | `amki-jatim-logo.png`    |
| AMKI Muda Nasional       | `content/organizations/AMKIMudaNasional/`  | `amki-nasional-logo.png` |
| SMAN 2 Blitar            | `content/organizations/SMAN2Blitar/`       | `sman2-logo.png`         |
| FOM Blitar-Raya          | `content/organizations/FOMBlitarRaya/`     | `fom-logo.png`           |

#### **Cara Menambahkan Logo:**

1. **Siapkan logo organisasi**

   - Format: PNG atau JPG (PNG dengan background transparan lebih baik)
   - Size: 200x200px atau persegi (ratio 1:1)
   - Quality: High resolution

2. **Rename sesuai tabel di atas**

   - Contoh: `polinema-logo.png` untuk Politeknik Negeri Malang

3. **Simpan di folder yang sesuai**

   - Logo harus satu folder dengan `index.md`
   - Contoh: Logo Polinema → `content/organizations/PolinemaKeagamaan/polinema-logo.png`

4. **Build ulang portfolio**
   ```bash
   npm run build
   ```

---

## 🎨 TIPS DESAIN:

### **Untuk Screenshots Featured Projects:**

- ✅ Gunakan tools seperti:
  - **Windows:** Win + Shift + S (Snipping Tool)
  - **Chrome Extension:** Full Page Screen Capture
  - **Online Tools:** screely.com, screenshot.rocks
- ✅ Pastikan website sudah fully loaded sebelum screenshot
- ✅ Ambil bagian yang paling menarik (hero section/landing page)
- ✅ Hindari screenshot dengan loading spinner atau error
- ✅ Edit/crop untuk fokus ke konten utama

### **Untuk Logo Organisasi:**

- ✅ Gunakan logo resmi organisasi
- ✅ Background transparan (PNG) lebih baik
- ✅ Jika background putih, pastikan ada border/padding
- ✅ Logo harus jelas dan tidak blur
- ✅ Hindari watermark atau copyright notice

---

## 📋 CHECKLIST SEBELUM BUILD:

- [ ] Screenshot **Lippo Archive** (`lippo-archive.png`) sudah ditambahkan
- [ ] Screenshot **RISPOL Portfolio** (`rispol-portfolio.png`) sudah ditambahkan
- [ ] Logo **Politeknik Negeri Malang** (`polinema-logo.png`) sudah ditambahkan
- [ ] Logo **AMKI Jatim** (`amki-jatim-logo.png`) sudah ditambahkan
- [ ] Logo **AMKI Nasional** (`amki-nasional-logo.png`) sudah ditambahkan
- [ ] Logo **SMAN 2 Blitar** (`sman2-logo.png`) sudah ditambahkan
- [ ] Logo **FOM Blitar-Raya** (`fom-logo.png`) sudah ditambahkan
- [ ] Semua gambar ukurannya sudah optimal (tidak terlalu besar)
- [ ] Run `npm run build` untuk generate portfolio baru

---

## 📁 STRUKTUR FOLDER:

```
content/
├── featured/
│   ├── SIMENTOR/
│   │   ├── index.md
│   │   └── simentor.png ✅
│   ├── JTITracer/
│   │   ├── index.md
│   │   └── jti-tracer.png ✅
│   ├── CreativeTekno/
│   │   ├── index.md
│   │   └── creativetekno.png ✅
│   ├── LippoArchive/         ← BARU!
│   │   ├── index.md ✅
│   │   ├── README.txt
│   │   └── lippo-archive.png ❌ TAMBAHKAN!
│   └── RISPOL/               ← BARU!
│       ├── index.md ✅
│       ├── README.txt
│       └── rispol-portfolio.png ❌ TAMBAHKAN!
│
└── organizations/
    ├── PolinemaKeagamaan/
    │   ├── index.md ✅
    │   ├── README.txt
    │   └── polinema-logo.png ❌ TAMBAHKAN!
    ├── AMKIMudaJatim/
    │   ├── index.md ✅
    │   ├── README.txt
    │   └── amki-jatim-logo.png ❌ TAMBAHKAN!
    ├── AMKIMudaNasional/
    │   ├── index.md ✅
    │   ├── README.txt
    │   └── amki-nasional-logo.png ❌ TAMBAHKAN!
    ├── SMAN2Blitar/
    │   ├── index.md ✅
    │   ├── README.txt
    │   └── sman2-logo.png ❌ TAMBAHKAN!
    └── FOMBlitarRaya/
        ├── index.md ✅
        ├── README.txt
        └── fom-logo.png ❌ TAMBAHKAN!
```

---

## 🚀 SETELAH MENAMBAHKAN GAMBAR:

```bash
# 1. Build portfolio
npm run build

# 2. Test local (opsional)
npm run serve

# 3. Upload ke Hostinger (ikuti DEPLOYMENT_GUIDE.md)
# Upload semua isi folder public/ ke public_html/
```

---

## ⚠️ TROUBLESHOOTING:

### **Gambar tidak muncul setelah build:**

- Pastikan nama file PERSIS sama (case-sensitive!)
- Pastikan file ada di folder yang benar
- Pastikan format PNG atau JPG (bukan JPEG atau lainnya)
- Clear cache: `npm run clean` lalu `npm run build` lagi

### **Gambar terlalu besar (ukuran file):**

- Compress online: tinypng.com atau compressor.io
- Target: < 500KB per image
- Featured screenshots: max 1MB
- Logo: max 200KB

### **Logo blur atau pecah:**

- Gunakan image dengan resolution lebih tinggi
- Minimum 200x200px untuk logo
- Minimum 1200x800px untuk screenshots

---

## 💡 CATATAN PENTING:

1. **Gambar wajib ada** sebelum build, jika tidak ada akan error atau tampil broken image
2. **Nama file harus persis sama** dengan yang ada di frontmatter
3. **Jangan ganti nama file** di markdown tanpa ganti nama file aslinya
4. **Jika tidak punya logo**, bisa:
   - Hapus field `logo:` dari markdown
   - Atau pakai placeholder/dummy logo dulu
5. **Featured projects** lebih terlihat professional dengan screenshot yang bagus!

---

**Good luck! 🎉**
