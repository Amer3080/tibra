"use client";

import { useTranslations } from "next-intl";
import NavLink from "@/components/ui/NavLink";
import { type Locale } from "@/lib/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function AboutPage({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const l = (p: string) => `/${locale}/${p}`;
  const features = t.raw("about.features") as any[];
  const process = t.raw("about.process") as any[];
  const history = t.raw("about.history") as any[];

  return (
    <>
      <Header locale={locale} />

      <Breadcrumb
        title={t("about.breadcrumb")}
        homeLabel={t("about.home")}
        homeHref={`/${locale}`}
        current={t("about.breadcrumb")}
      />

      {/* Features */}
      <section className="space-top overflow-hidden">
        <div className="container">
          <div className="row gy-30 gx-30 justify-content-center">
            {features.map((f: any, i: number) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div
                  className="feature-card wow fadeinup"
                  data-wow-delay={`.${i * 2 + 2}s`}>
                  <div className="box-icon">
                    <div
                      className="feat-mask"
                      data-mask-src="/assets/img/bg/about-feat-bg.png"
                    />
                    <img
                      src={`/assets/img/icon/features-1-${i + 1}.svg`}
                      alt={f.title}
                    />
                  </div>
                  <div className="content">
                    <h3 className="box-title">{f.title}</h3>
                    <p className="box-text pe-xl-4">{f.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About story */}
      <div
        className="overflow-hidden space overflow-hidden space-extra-bottom"
        id="about-sec">
        <div className="container">
          <div className="row gy-40 gx-80 align-items-center">
            <div className="col-xl-7 ps-xl-5">
              <div className="img-box1 ms-xl-2">
                <div className="img1 gsap-fade-left">
                  <img
                    src="/assets/img/about/about_1_1.png"
                    alt="Tibra dates"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-5">
              <div className="title-area mb-1">
                <span className="sub-title text-anime-style-1">
                  {t("about.subtitle")}
                </span>
                <h2 className="sec-title text-anime-style-2">
                  {t("about.title")}{" "}
                  <span className="text-theme">
                    {t("about.titleHighlight")}
                  </span>
                </h2>
                <p className="box-text wow fadeinup" data-wow-delay=".3s">
                  {t("about.body1")}
                </p>
                <p className="box-text mt-20 wow fadeinup" data-wow-delay=".4s">
                  {t("about.body2")}
                </p>
                <div
                  className="about-1-owner wow fadeinup"
                  data-wow-delay=".5s">
                  <h4 className="box-title">{t("about.owner")}</h4>
                  <p>{t("about.ownerTitle")}</p>
                </div>
                <NavLink
                  href={l("shop")}
                  className="th-btn btn-mask wow fadeinup"
                  data-wow-delay=".7s">
                  {t("about.cta")}
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process */}
      <section className="process-sec-2 overflow-hidden">
        <div className="container">
          <div
            className="process-sec-2-container-wrap"
            data-mask-src="/assets/img/bg/process-sec-2-bg-mask.png">
            <div className="row gy-4 justify-content-center align-items-center">
              <div className="col-xl-5 col-lg-5">
                <div className="title-area mb-1 pe-xl-5 me-xl-5">
                  <span className="sub-title text-anime-style-1">
                    {t("about.subtitle")}
                  </span>
                  <h2 className="sec-title text-anime-style-2 text-white pe-xl-5">
                    {t("about.title")}
                  </h2>
                  <p className="box-text text-white text-anime-style-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Doloremque quos nam molestias fugit rerum modi laborum
                    inventore neque numquam pariatur.
                  </p>
                </div>
              </div>
              <div className="col-xl-7 col-lg-7">
                <div
                  className="process-sec-2-bg-inner-wrap"
                  data-mask-src="/assets/img/bg/process-sec-2-bg-inner.png">
                  <div className="row gy-40">
                    {process.map((p, i) => (
                      <div key={i} className="col-xl-4 col-md-6">
                        <div
                          className="process-box-2 wow fadeinright"
                          data-wow-delay={p.delay}>
                          <div className="box-img">
                            <img
                              src={`/assets/img/process/process-3-${i + 1}.png`}
                              alt={p.title}
                            />
                          </div>
                          <div className="content">
                            <p className="box-number">{p.num}</p>
                            <h3 className="box-title">{p.title}</h3>
                            <p className="box-text">{p.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* History timeline */}
      <div className="history-sec1 bg-theme3 overflow-hidden space">
        <div className="container">
          <div className="row gy-4 justify-content-center">
            <div className="col-lg-5">
              <div className="history-img">
                <img
                  src="/assets/img/history/history-main.jpg"
                  alt="Tibra history"
                />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="history-content-wrap ps-xl-5">
                <div className="title-area mb-40">
                  <span className="sub-title text-anime-style-1">
                    {t("about.subtitle")}
                  </span>
                  <h2 className="sec-title text-anime-style-2 text-white">
                    {t("about.title")}
                  </h2>
                  <img
                    className="img-anime-style-1"
                    src="/assets/img/icon/title-shape2.png"
                    alt="shape"
                  />
                </div>
                {history.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="history-box-1 wow fadeinup"
                    data-wow-delay={`.${i * 2 + 2}s`}>
                    <div className="content">
                      <h4 className="year">{item.year}</h4>
                      <h3 className="box-title">{item.title}</h3>
                      <p className="box-text">{item.text}</p>
                    </div>
                    <div className="thumb global-img">
                      <img
                        src={`/assets/img/history/history-sm-1-${i + 1}.jpg`}
                        alt={item.title}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer locale={locale} />
    </>
  );
}
