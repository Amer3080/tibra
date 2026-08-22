"use client";

import { useTranslations } from "next-intl";
import NavLink from "@/components/ui/NavLink";
import { type Locale } from "@/lib/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";

const chefs = [
  { img:"team_1_1.png", name:"Alina Morish",    role:"Executive Chef",   delay:".2s", anim:"fadeinleft"  },
  { img:"team_1_2.png", name:"Michel Clark",    role:"Pastry Chef",      delay:".4s", anim:"fadeinleft"  },
  { img:"team_1_3.png", name:"Esa Elizabed",    role:"Sous Chef",        delay:".6s", anim:"fadeinright" },
  { img:"team_1_4.png", name:"William Latham",  role:"Grill Master",     delay:".8s", anim:"fadeinright" },
  { img:"team_1_5.png", name:"Florida Tusy",    role:"Sushi Chef",       delay:".2s", anim:"fadeinleft"  },
  { img:"team_1_6.png", name:"Kevin Malone",    role:"Beverage Manager", delay:".4s", anim:"fadeinleft"  },
  { img:"team_1_1.png", name:"Sarah Reynolds",  role:"Head Baker",       delay:".6s", anim:"fadeinright" },
  { img:"team_1_2.png", name:"David Torres",    role:"Line Cook",        delay:".8s", anim:"fadeinright" },
];

export default function TeamPage({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const l = (p: string) => `/${locale}/${p}`;
  return (
    <>
      <Header locale={locale} />
      <Breadcrumb title={t("team.breadcrumb")} homeLabel={t("team.home")} homeHref={`/${locale}`} current={t("team.breadcrumb")} />
      <section className="team-area-1 space">
        <div className="container z-index-common">
          <div className="title-area text-center mb-60">
            <span className="sub-title text-anime-style-1">Our Chefs</span>
            <h2 className="sec-title text-anime-style-2">Meet Our Expert <span className="text-theme">Chef</span></h2>
            <img className="img-anime-style-1" src="/assets/img/icon/title-shape.png" alt="img" />
          </div>
          <div className="row gy-40">
            {chefs.map((chef, i) => (
              <div key={i} className="col-xl-3 col-lg-6 col-md-6">
                <div className={`th-team team-card wow ${chef.anim}`} data-wow-delay={chef.delay}>
                  <div className="img-wrap">
                    <div className="team-img">
                      <img src={`/assets/img/team/${chef.img}`} alt="Team" />
                      <img className="team-1-bg-shape" src="/assets/img/bg/team-1-bg-shape.png" alt="" />
                    </div>
                    <div className="team-social-hover">
                      <div className="th-social">
                        <a target="_blank" href="https://twitter.com/"><i className="fab fa-twitter" /></a>
                        <a target="_blank" href="https://facebook.com/"><i className="fab fa-facebook-f" /></a>
                        <a target="_blank" href="https://instagram.com/"><i className="fab fa-instagram" /></a>
                        <a target="_blank" href="https://youtube.com/"><i className="fab fa-youtube" /></a>
                        <a target="_blank" href="https://whatsapp.com/"><i className="fab fa-whatsapp" /></a>
                      </div>
                    </div>
                  </div>
                  <div className="team-card-content">
                    <h3 className="box-title"><NavLink href={l("team-details")}>{chef.name}</NavLink></h3>
                    <span className="team-desig">{chef.role}</span>
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
