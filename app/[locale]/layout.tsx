import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, localeConfig, type Locale } from "@/lib/i18n";
import Script from "next/script";
import RouteAnimationReinit from "@/components/ui/RouteAnimationReinit";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import EmailJSInit from "@/components/ui/EmailJSInit";
import type { Metadata } from "next";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Tibra Foods | تيبرا — Premium Dates",
  description: "Tibra Foods — Premium Arabian Dates | تيبرا — أجود التمور العربية",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const messages = await getMessages();
  const dir = localeConfig[locale as Locale].dir;

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Barlow+Condensed:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Bangers&family=Jost:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=El+Messiri:wght@400;500;600;700&family=Marhey:wght@300;400;500;600;700&family=Amiri:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/fontawesome.min.css" />
        <link rel="stylesheet" href="/assets/css/magnific-popup.min.css" />
        <link rel="stylesheet" href="/assets/css/jquery.datetimepicker.min.css" />
        <link rel="stylesheet" href="/assets/css/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/tibra-logo-icon.png" />
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --theme-color: #ead369;
            --theme-color2: #136865;
            --theme-color3: #9c704e;
            --theme-color4: #1a1a1a;
            --theme-color5: #d6d6d6;
            --title-color: #1a1a1a;
            --body-color: #444444;
            --smoke-color: #f8f5f0;
            --black-color: #0d0d0d;
            --black-color5: #0d0d0d;
            --title-font: 'Barlow Condensed','Montserrat',sans-serif;
            --body-font: 'Montserrat','Jost',sans-serif;
            --ar-heading-font: 'El Messiri', sans-serif;
            --ar-subheading-font: 'Marhey', sans-serif;
            --ar-body-font: 'Amiri', serif;
          }
          [data-theme="dark"] {
            --title-color: #f0ebe3;
            --body-color: #b8b0a8;
            --smoke-color: #1e1e1e;
          }
          [data-theme="dark"] body { background-color:#121212; color:#b8b0a8; }
          [data-theme="dark"] h1,[data-theme="dark"] h2,[data-theme="dark"] h3,
          [data-theme="dark"] h4,[data-theme="dark"] h5,[data-theme="dark"] h6,
          [data-theme="dark"] .sec-title,[data-theme="dark"] .box-title { color:#f0ebe3; }
          [data-theme="dark"] p,[data-theme="dark"] .box-text { color:#b8b0a8; }
          [data-theme="dark"] section,[data-theme="dark"] .space,
          [data-theme="dark"] .space-bottom { background-color:#121212; }
          [data-theme="dark"] .bg-smoke,[data-theme="dark"] .food-sec-1 { background-color:#1e1e1e !important; }
          [data-theme="dark"] .food-card-1,[data-theme="dark"] .blog-card,
          [data-theme="dark"] .th-product,[data-theme="dark"] .product-content { background-color:#242424; }
          [data-theme="dark"] .accordion-card { background-color:#242424; border-color:rgba(255,255,255,0.08); }
          [data-theme="dark"] .accordion-button { background-color:#2c2c2c; color:#f0ebe3; }
          [data-theme="dark"] .accordion-body { background-color:#242424; color:#b8b0a8; }
          [data-theme="dark"] .form-control,[data-theme="dark"] .form-select { background-color:#2c2c2c; border-color:rgba(255,255,255,0.15); color:#f0ebe3; }
          [data-theme="dark"] .contact-form-v2 { background-color:#1e1e1e; }
          [data-theme="dark"] .breadcrumb-area { background-color:#1a1a1a; }
          [dir="rtl"] h1,[dir="rtl"] h2,[dir="rtl"] h3,
          [dir="rtl"] .sec-title,[dir="rtl"] .box-title,[dir="rtl"] .hero-title {
            font-family: var(--ar-heading-font) !important;
          }
          [dir="rtl"] .sub-title,[dir="rtl"] .subtitle,
          [dir="rtl"] h4,[dir="rtl"] h5,[dir="rtl"] h6 {
            font-family: var(--ar-subheading-font) !important;
          }
          [dir="rtl"] p,[dir="rtl"] .box-text,[dir="rtl"] li,
          [dir="rtl"] a,[dir="rtl"] input,[dir="rtl"] select,
          [dir="rtl"] textarea,[dir="rtl"] button {
            font-family: var(--ar-body-font) !important;
          }
          @media (max-width:767px) {
            .shape-mockup { display:none !important; }
            .hero-style1 { text-align:center; padding:20px 16px; }
            .hero-style1 h3.subtitle { font-size:1.4rem !important; }
            .hero-style1 .hero-title { font-size:2.2rem !important; }
            .hero-style1 .hero-img1 img { max-width:240px; margin:0 auto; }
            .wow { animation-duration: 0.3s !important; }
          }
          .tibra-header .menu-area,
          .sticky-wrapper.sticky .tibra-header .menu-area { background:#214137 !important; }
        ` }} />
        {/* ── EmailJS SDK ── */}
        <script
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
          async
        />
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            function hide(){
              var el=document.getElementById('tibra-preloader');
              if(!el)return;
              el.style.opacity='0';
              el.style.pointerEvents='none';
              el.style.transition='opacity 0.5s ease';
              setTimeout(function(){ el.style.display='none'; },520);
            }
            if(document.readyState==='loading'){
              document.addEventListener('DOMContentLoaded',function(){setTimeout(hide,400);});
            } else { setTimeout(hide,400); }
            window.addEventListener('load',function(){setTimeout(hide,200);});
            setTimeout(hide,2500);
          })();
        ` }} />
      </head>
      <body suppressHydrationWarning>
        <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: `
          <div class="preloader" id="tibra-preloader">
            <div id="preloader" class="preloader-inner">
              <div class="header-logo pb-2">
                <a href="/${locale}">
                  <img src="/assets/img/tibra-logo-icon.png" alt="Tibra" style="height:50px;width:auto" />
                </a>
              </div>
              <div class="txt-loading">
                <span data-text-preloader="T" class="letters-loading">T</span>
                <span data-text-preloader="I" class="letters-loading">I</span>
                <span data-text-preloader="B" class="letters-loading">B</span>
                <span data-text-preloader="R" class="letters-loading">R</span>
                <span data-text-preloader="A" class="letters-loading">A</span>
              </div>
            </div>
          </div>
        ` }} />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <EmailJSInit />
            <RouteAnimationReinit />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
        <Script src="/assets/js/vendor/jquery-3.7.1.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/swiper-bundle.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/bootstrap.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery-ui.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery.magnific-popup.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery.counterup.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery.datetimepicker.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/imagesloaded.pkgd.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/isotope.pkgd.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/lenis.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/gsap.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/ScrollTrigger.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/tilt.jquery.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/wow.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
