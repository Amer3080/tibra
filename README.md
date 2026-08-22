# Barab Next.js — Multilingual Restaurant Template

## ✅ What's included

- **Next.js 14** App Router + TypeScript
- **Tailwind CSS** + Bootstrap (original Barab styles preserved)
- **next-intl** — 3 languages: 🇸🇦 Arabic, 🇬🇧 English, 🇷🇺 Russian
- **RTL** full support for Arabic
- **All original assets** preserved (718 files: images, CSS, JS, fonts)
- **All original animations** preserved (GSAP, Lenis, ScrollTrigger, WOW.js, Swiper)

## 📁 Project Structure

```
barab-next/
├── app/
│   ├── [locale]/           ← All pages with locale prefix
│   │   ├── page.tsx        ← Home page (/)
│   │   ├── about/          ← About page
│   │   ├── contact/        ← Contact page
│   │   ├── blog/           ← Blog listing
│   │   ├── blog-details/   ← Blog detail
│   │   ├── shop/           ← Shop page
│   │   ├── shop-details/   ← Product detail
│   │   ├── menu-grid/      ← Menu grid
│   │   └── faq/            ← FAQ page
│   ├── api/contact/        ← Contact form API
│   ├── layout.tsx
│   ├── page.tsx            ← Redirects to /en
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Header.tsx      ← Full header with nav + lang switcher
│   │   └── Footer.tsx      ← Full footer
│   ├── sections/
│   │   ├── HomePage.tsx    ← Complete home page
│   │   ├── AboutPage.tsx   ← About page
│   │   ├── ContactPage.tsx ← Contact + form + map
│   │   └── BlogPage.tsx    ← Blog listing
│   └── ui/
│       ├── Breadcrumb.tsx
│       └── LanguageSwitcher.tsx
├── lib/
│   └── i18n.ts             ← Locale config
├── messages/
│   ├── en.json             ← English translations
│   ├── ar.json             ← Arabic translations
│   └── ru.json             ← Russian translations
├── middleware.ts            ← Locale routing
└── public/
    └── assets/             ← All original Barab assets
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open: http://localhost:3000

## 🌍 Language URLs

- English: http://localhost:3000/en
- Arabic:  http://localhost:3000/ar
- Russian: http://localhost:3000/ru

## ➕ Adding Translations

Edit files in `/messages/`:
- `en.json` — English
- `ar.json` — Arabic
- `ru.json` — Russian

## 🎨 Next Phase (Tiibra Customization)

- Replace brand colors in `/public/assets/css/style.css`
- Replace logo files in `/public/assets/img/`
- Update content in component files
- Add Framer Motion animations
