# 📸 Gallery Guide - Organizations Leadership Documentation

## ✨ What's New?

### Header Improvements:

✅ **Better Color Sync**: Header now has transparent background at top, transitions to solid background when scrolling
✅ **No Content Overlap**: Header properly positioned with shadow effects to prevent content overlap
✅ **Smooth Animations**:

- Slide-down animation on page load
- Hover effects on navigation items with underline animation
- Button lift effect on hover
- Smooth transitions when scrolling up/down

### Organizations Gallery Feature:

✅ **Show Your Leadership**: Display photos of activities, events, and documentation
✅ **Responsive Grid**: Auto-adjusts from 4 columns to 2 on mobile
✅ **Hover Effects**: Images scale up and darken on hover for modern look
✅ **Professional Display**: Shows your role as organizer and leader

---

## 📁 How to Add Gallery Images

### 1. Prepare Your Images

**Recommended Specs:**

- Format: JPG, PNG, or WEBP
- Size: 800x800px (square format works best)
- File size: < 500KB per image
- Quality: High resolution for clarity

**What to Include:**

- Leadership moments (meetings, speeches, presentations)
- Event organization (setup, coordination, execution)
- Team activities and group photos
- Achievements and awards
- Documentation of your contributions

### 2. File Structure

Each organization folder can have:

```
content/organizations/PolinemaKeagamaan/
├── index.md                  # Organization details
├── polinema-logo.png        # Organization logo
├── gallery-1.jpg            # Gallery photo 1
├── gallery-2.jpg            # Gallery photo 2
├── gallery-3.jpg            # Gallery photo 3
└── gallery-4.jpg            # Gallery photo 4
```

### 3. Update index.md File

Add the `gallery` field to your frontmatter:

```markdown
---
date: '2024-01-01'
title: 'Ketua Umum dan Pelaksana Bidang Mentoring Keagamaan'
company: 'Politeknik Negeri Malang'
location: 'Kota Malang'
range: 'January 2024 - January 2026'
url: ''
logo: './polinema-logo.png'
gallery:
  - './gallery-1.jpg'
  - './gallery-2.jpg'
  - './gallery-3.jpg'
  - './gallery-4.jpg'
---

- Your description here...
```

**Gallery Tips:**

- Use relative paths starting with `./`
- List as many or as few images as you want (2-8 images recommended)
- Order matters: first image shows first
- Gallery only appears if images are added (optional feature)

---

## 🎯 Examples for Each Organization

### 1. Politeknik Negeri Malang (Keagamaan)

**Folder:** `content/organizations/PolinemaKeagamaan/`

**Suggested Images:**

- Opening ceremony of mentoring program
- You coordinating with mentors
- Large group photo with 30,000+ students
- Mentoring session documentation

### 2. AMKI Muda Jawa Timur

**Folder:** `content/organizations/AMKIMudaJatim/`

**Suggested Images:**

- At regional AMKI events
- Organizational meetings
- Convention preparation activities
- Team coordination moments

### 3. AMKI Muda Nasional

**Folder:** `content/organizations/AMKIMudaNasional/`

**Suggested Images:**

- National convention scenes
- Presentations or speeches
- Networking with other regional leaders
- Official AMKI events

### 4. SMAN 2 Blitar

**Folder:** `content/organizations/SMAN2Blitar/`

**Suggested Images:**

- OSIS activities
- School events you organized
- Student leadership moments
- Achievement awards

### 5. FOM Blitar-Raya

**Folder:** `content/organizations/FOMBlitarRaya/`

**Suggested Images:**

- Marketing campaigns you managed
- Team meetings and strategy sessions
- Event promotions and executions
- Creative marketing materials

---

## 🚀 Quick Start

**Step-by-Step:**

1. **Choose your best photos** (4-6 per organization)

2. **Rename them clearly:**

   ```
   gallery-1.jpg  (Main leadership photo)
   gallery-2.jpg  (Team coordination)
   gallery-3.jpg  (Event execution)
   gallery-4.jpg  (Achievement/result)
   ```

3. **Place in correct folder:**

   - Example: `content/organizations/PolinemaKeagamaan/gallery-1.jpg`

4. **Update the index.md file:**

   - Add `gallery:` section to frontmatter
   - List all images with `- './filename.jpg'`

5. **Build and test:**

   ```bash
   npm run build
   ```

6. **Preview locally:**
   ```bash
   npm run develop
   ```
   Then open: http://localhost:8000/#organizations

---

## 🎨 How It Looks

When visitors click on your organization tab, they'll see:

1. **Logo** (80x80px rounded) - Organization identity
2. **Title & Position** - Your role and responsibilities
3. **Description** - Your achievements and tasks
4. **Gallery Section** - "📸 Gallery & Documentation" heading
5. **Photo Grid** - Beautiful responsive gallery with hover effects

**Desktop:** 4 columns of images
**Tablet:** 3 columns
**Mobile:** 2 columns

---

## 💡 Pro Tips

### For Best Results:

1. **Quality over Quantity**: 4 great photos > 10 mediocre ones

2. **Tell a Story**:

   - Photo 1: Show your leadership role
   - Photo 2: Team coordination
   - Photo 3: Event execution
   - Photo 4: Impact/results

3. **Professional Photos**:

   - Use photos where you're visible
   - Good lighting
   - Clear focus
   - Appropriate formal setting

4. **File Naming**:

   - Keep names simple: `gallery-1.jpg`, not `IMG_20240315_DSC1234_EDITED_FINAL.jpg`
   - Use lowercase
   - No spaces in filenames

5. **Optimize Images**:
   - Compress before uploading (use TinyPNG.com)
   - Gatsby will optimize further, but smaller files = faster builds

---

## 🐛 Troubleshooting

### Gallery not showing?

- Check file paths are correct (start with `./`)
- Verify images exist in the folder
- File names must match exactly (case-sensitive)
- Rebuild after adding images: `npm run build`

### Images look blurry?

- Use higher resolution source images (min 800x800px)
- Check image hasn't been compressed too much

### Build errors?

- Ensure all gallery images listed actually exist
- Check YAML syntax (proper indentation)
- Image file extensions must match (`.jpg` vs `.JPG`)

### Gallery grid looks weird?

- Works best with 2-8 images
- All images should be similar aspect ratios (square preferred)
- For odd numbers, last row will auto-fill

---

## 📝 Current Status

**Images Needed:**

Organization Logos (1 per org, 80x80px):

- [ ] `polinema-logo.png` → PolinemaKeagamaan/
- [ ] `amki-jatim-logo.png` → AMKIMudaJatim/
- [ ] `amki-nasional-logo.png` → AMKIMudaNasional/
- [ ] `sman2-logo.png` → SMAN2Blitar/
- [ ] `fom-logo.png` → FOMBlitarRaya/

Featured Project Screenshots (1200x800px):

- [ ] `lippo-archive.png` → content/featured/LippoArchive/
- [ ] `rispol-portfolio.png` → content/featured/RISPOL/

Gallery Images (4-6 per org, 800x800px):

- [ ] PolinemaKeagamaan: `gallery-1.jpg` to `gallery-4.jpg`
- [ ] AMKIMudaJatim: `gallery-1.jpg` to `gallery-4.jpg`
- [ ] AMKIMudaNasional: `gallery-1.jpg` to `gallery-4.jpg`
- [ ] SMAN2Blitar: `gallery-1.jpg` to `gallery-4.jpg`
- [ ] FOMBlitarRaya: `gallery-1.jpg` to `gallery-4.jpg`

---

## ✅ What's Already Done

✨ **Header Fixed:**

- Smooth slide-down animation on load
- Color transitions from transparent to solid
- No more content overlap
- Hover animations on all nav items
- Shadow effects for depth

✨ **Gallery System:**

- GraphQL schema supports gallery arrays
- Responsive grid layout (4 → 3 → 2 columns)
- Hover scale and shadow effects
- Auto-optimization with Gatsby Image
- Only shows when images are added (optional)

✨ **Build Ready:**

- All code implemented and tested
- Build completes successfully (Exit Code: 0)
- Ready for image additions

---

## 🚀 Next Steps

1. Gather your best leadership photos (20-30 total)
2. Organize by organization (4-6 per org)
3. Rename using `gallery-X.jpg` format
4. Place in correct folders
5. Update each `index.md` with gallery field
6. Run `npm run build` to generate optimized images
7. Deploy to Hostinger (see DEPLOYMENT_GUIDE.md)

---

Need help? The gallery feature is completely optional - organizations without gallery images will display normally without the photo section.

**Your portfolio will stand out with visual proof of your leadership experience! 🎯**
