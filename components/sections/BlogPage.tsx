"use client";

import { useTranslations } from "next-intl";
import { type Locale } from "@/lib/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import NavLink from "@/components/ui/NavLink";

export default function BlogPage({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const l = (p: string) => `/${locale}/${p}`;
  const posts = t.raw("blog.posts") as any[];

  return (
    <>
      <Header locale={locale} />
      <Breadcrumb
        title={t("blog.breadcrumb")}
        homeLabel={t("blog.home")}
        homeHref={`/${locale}`}
        current={t("blog.breadcrumb")}
      />
      <section className="space overflow-hidden">
        <div className="container">
          <div className="title-area text-center mb-60">
            <span className="sub-title text-anime-style-1">{t("blog.subtitle")}</span>
            <h2 className="sec-title text-anime-style-2">
              {t("blog.title")}
              <span className="text-theme">{t("blog.titleHighlight")}</span>
            </h2>
            <img className="img-anime-style-1" src="/assets/img/icon/title-shape.png" alt="shape" />
          </div>
          <div className="row gy-30">
            {posts.map((post: any, i: number) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div className="blog-card wow fadeinup" data-wow-delay={`.${(i % 3) * 2 + 2}s`}>
                  <div className="blog-img">
                    <NavLink href={`/${locale}/blog/${i}`}>
                      <img
                        src={`/assets/img/blog/blog_1_${(i % 3) + 1}.jpg`}
                        alt={post.title}
                        onError={(e) => { (e.target as any).src = "/assets/img/blog/blog_1_1.jpg"; }}
                      />
                    </NavLink>
                    {post.tag && (
                      <span style={{
                        position: "absolute", top: 12, left: 12,
                        background: "#ead369", color: "#1a1a1a",
                        fontSize: ".65rem", fontWeight: 700,
                        padding: "3px 10px", borderRadius: 3, letterSpacing: ".08em",
                      }}>
                        {post.tag}
                      </span>
                    )}
                  </div>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <NavLink className="author" href={l("blog")}>
                        <i className="fal fa-user" />
                        {t("blog.by")} {post.author}
                      </NavLink>
                      <NavLink href={l("blog")}>
                        <i className="fal fa-calendar" />
                        {post.date}
                      </NavLink>
                    </div>
                    <h3 className="box-title">
                      <NavLink href={`/${locale}/blog/${i}`}>{post.title}</NavLink>
                    </h3>
                    <p className="box-text" style={{ fontSize: ".82rem", marginBottom: 16 }}>
                      {post.excerpt}
                    </p>
                    <NavLink href={`/${locale}/blog/${i}`} className="th-btn btn-mask">
                      {t("blog.readMore")}
                    </NavLink>
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
