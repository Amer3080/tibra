"use client";

import { useTranslations } from "next-intl";
import { type Locale } from "@/lib/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function GalleryPage({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const imgs = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2];
  return (
    <>
      <Header locale={locale} />
      <Breadcrumb
        title={t("gallery.breadcrumb")}
        homeLabel={t("gallery.home")}
        homeHref={`/${locale}`}
        current={t("gallery.breadcrumb")}
      />
      <div className="space bg-smoke overflow-hidden">
        <div className="container">
          <div className="title-area text-center mb-60">
            <span className="sub-title text-anime-style-1">
              Our Dates Gallery
            </span>
            <h2 className="sec-title text-anime-style-2">
              Let&apos;s See our Product Of
              <span className="text-theme">Dates</span>
            </h2>
            <img
              className="img-anime-style-1"
              src="/assets/img/icon/title-shape.png"
              alt="img"
            />
          </div>
          <div className="row gy-30">
            {imgs.map((n, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div className="gallery-thumb-1">
                  <img
                    src={`/assets/img/gallery/gallery_1_${n}.png`}
                    alt="Gallery"
                  />
                  <a
                    href={`/assets/img/gallery/gallery_1_${n}.png`}
                    className="gallery-btn popup-image">
                    <img src="/assets/img/icon/plus-icon.svg" alt="img" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer locale={locale} />
    </>
  );
}
