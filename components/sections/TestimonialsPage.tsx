"use client";

import { useTranslations } from "next-intl";
import { type Locale } from "@/lib/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";

const testis = [
  {
    img: "testi-1-1.png",
    name: "Victoria Wotton",
    co: "Fementum Odio Co.",
    text: '"lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."',
  },
  {
    img: "testi-1-2.png",
    name: "Emma Mia",
    co: "Fementum Odio Co.",
    text: '"lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."',
  },
  {
    img: "testi-1-1.png",
    name: "Robert Johnson",
    co: "FoodLovers Inc.",
    text: '"lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."',
  },
  {
    img: "testi-1-2.png",
    name: "Sarah Williams",
    co: "Gourmet Club",
    text: '"lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."',
  },
];

export default function TestimonialsPage({ locale }: { locale: Locale }) {
  const t = useTranslations();
  return (
    <>
      <Header locale={locale} />
      <Breadcrumb
        title={t("testimonials.breadcrumb")}
        homeLabel={t("testimonials.home")}
        homeHref={`/${locale}`}
        current={t("testimonials.breadcrumb")}
      />
      <section className="testi-area-1 space" id="testi-sec">
        <div className="container">
          <div className="title-area text-center mb-60">
            <span className="sub-title text-anime-style-1">Testimonials</span>
            <h2 className="sec-title text-anime-style-2">
              Our Customers <span className="text-theme">Feedback</span>
            </h2>
            <img
              className="img-anime-style-1"
              src="/assets/img/icon/title-shape.png"
              alt="img"
            />
          </div>
          <div className="row gy-40 gx-30">
            {testis.map((item, i) => (
              <div key={i} className="col-xl-6">
                <div
                  className={`testi-1-item wow ${i % 2 === 0 ? "fadeinleft" : "fadeinright"}`}
                  data-wow-delay=".3s">
                  <div className="client-thumb">
                    <img
                      src={`/assets/img/testimonial/${item.img}`}
                      alt="img"
                    />
                  </div>
                  <div className="content">
                    <img
                      className="testi-1-quote"
                      src="/assets/img/icon/testi-1-quote.png"
                      alt="icon"
                    />
                    <p className="box-text">{item.text}</p>
                  </div>
                  <div className="bottom">
                    <h4 className="box-title">{item.name}</h4>
                    <p>{item.co}</p>
                    <div className="th-social">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <i key={s} className="fa-solid fa-star" />
                      ))}
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
