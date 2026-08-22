"use client";

import { useTranslations } from "next-intl";
import NavLink from "@/components/ui/NavLink";
import { type Locale } from "@/lib/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function TeamDetailsPage({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const l = (p: string) => `/${locale}/${p}`;
  return (
    <>
      <Header locale={locale} />
      <Breadcrumb
        title={t("teamDetails.breadcrumb")}
        homeLabel={t("teamDetails.home")}
        homeHref={`/${locale}`}
        current={t("teamDetails.breadcrumb")}
      />
      <section className="space">
        <div className="container">
          <div className="row gy-40 gx-60 align-items-center">
            <div className="col-lg-5">
              <div className="team-details-img">
                <img src="/assets/img/team/team_1_1.png" alt="Chef" />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="team-details-content">
                <span className="sub-title text-anime-style-1">Head Team</span>
                <h2 className="sec-title text-anime-style-2">Ahmed Hassan</h2>
                <p className="box-text">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Repudiandae quos, nostrum, in, cum dolorum distinctio quas
                  illo minima placeat repellendus dignissimos aut ipsam
                  doloribus debitis similique a sunt ratione saepe.
                </p>
                <p className="box-text mt-20">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Atque, aut eaque blanditiis ullam sunt officia in nulla
                  quaerat delectus at ipsa accusantium consectetur ipsam
                  voluptates!
                </p>
                <div className="team-social mt-30">
                  <div className="th-social">
                    <a href="https://twitter.com/">
                      <i className="fab fa-twitter" />
                    </a>
                    <a href="https://facebook.com/">
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a href="https://instagram.com/">
                      <i className="fab fa-instagram" />
                    </a>
                    <a href="https://linkedin.com/">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </div>
                </div>
                <div className="row gy-20 mt-30">
                  {[
                    { label: "Experience", val: "15+ Years" },
                    { label: "Specialty", val: "lorem ipsum" },
                    { label: "Location", val: "New York, USA" },
                  ].map((item, i) => (
                    <div key={i} className="col-sm-6">
                      <div className="team-info-card">
                        <strong>{item.label}:</strong> <span>{item.val}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer locale={locale} />
    </>
  );
}
