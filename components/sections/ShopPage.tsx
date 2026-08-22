"use client";

import { useTranslations } from "next-intl";
import NavLink from "@/components/ui/NavLink";
import { type Locale } from "@/lib/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function ShopPage({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const products = t.raw("products.items") as any[];

  return (
    <>
      <Header locale={locale} />
      <Breadcrumb
        title={t("products.breadcrumb")}
        homeLabel={t("shop.home")}
        homeHref={`/${locale}`}
        current={t("products.breadcrumb")}
      />
      <section className="space-top space-extra2-bottom">
        <div className="container">
          <div className="title-area text-center mb-60">
            <span className="sub-title text-anime-style-1">{t("products.subtitle")}</span>
            <h2 className="sec-title text-anime-style-2">
              {t("products.title")}
              <span className="text-theme">{t("products.titleHighlight")}</span>
            </h2>
            <img className="img-anime-style-1" src="/assets/img/icon/title-shape.png" alt="shape" />
          </div>

          <div className="row gy-40 gx-30">
            {products.map((item: any, i: number) => (
              <div key={i} className="col-xl-4 col-lg-4 col-sm-6">
                <div className="th-product product-grid wow fadeinup" data-wow-delay={`.${(i % 3) * 2 + 2}s`}>
                  <div className="product-img">
                    <div className="food-mask" data-mask-src="/assets/img/bg/menu-1-msk-bg.png" />
                    <img
                      src={`/assets/img/product/date-${(i % 8) + 1}.png`}
                      alt={item.name}
                      onError={(e) => { (e.target as any).src = "/assets/img/product/date-1.png"; }}
                    />
                    {item.badge && (
                      <span style={{
                        position: "absolute", top: 12, right: 12,
                        background: "#ead369", color: "#1a1a1a",
                        fontSize: ".65rem", fontWeight: 700,
                        padding: "3px 10px", borderRadius: 3,
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="product-content">
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <i key={s} className="fa-solid fa-star" style={{ color: "#ead369" }} />
                      ))}
                    </div>
                    <p style={{ fontSize: ".75rem", color: "#9c704e", marginBottom: 4, fontWeight: 600 }}>
                      {item.origin}
                    </p>
                    <h3 className="product-title">
                      <NavLink href={`/${locale}/products/${i}`}>{item.name}</NavLink>
                    </h3>
                    <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", marginTop: 8 }}>
                      <span className="price" style={{ color: "#000000", fontWeight: 800 }}>{item.price}</span>
                      <span style={{ fontSize: ".72rem", color: "#666" }}>{item.weight}</span>
                    </div>
                    <div style={{ marginTop: 12, textAlign: "center" }}>
                      <NavLink href={`/${locale}/products/${i}`} className="th-btn btn-mask" style={{ fontSize: ".75rem", padding: "8px 20px" }}>
                        {t("products.viewDetails")}
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer locale={locale} />
    </>
  );
}
