"use client";

import { useTranslations } from "next-intl";
import NavLink from "@/components/ui/NavLink";
import { type Locale } from "@/lib/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const l = (path: string) => `/${locale}/${path}`;

  /* Promise pillars — replaces "Working Hours" */
  const promises = [
    { icon: "fa-seedling", text: t("footer.promise1") },
    { icon: "fa-hand-holding-heart", text: t("footer.promise2") },
    { icon: "fa-earth-americas", text: t("footer.promise3") },
    { icon: "fa-award", text: t("footer.promise4") },
  ];

  const socials = [
    {
      icon: "fa-instagram",
      href: "https://instagram.com/tibrafoods",
      label: "Instagram",
    },
    {
      icon: "fa-facebook-f",
      href: "https://facebook.com/tibrafoods",
      label: "Facebook",
    },
    {
      icon: "fa-whatsapp",
      href: "https://wa.me/201000000000",
      label: "WhatsApp",
    },
    {
      icon: "fa-twitter",
      href: "https://twitter.com/tibrafoods",
      label: "Twitter",
    },
  ];

  return (
    <>
      <footer
        className="footer-wrapper footer-layout1 space-top"
        style={{
          background: "#0d0d0d",
          borderTop: "1px solid rgba(234,211,105,0.12)",
        }}>
        <div className="container">
          {/* ── Logo ── */}
          <div
            className="footer-logo"
            style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              className="footer-border left"
              style={{ borderColor: "rgba(234,211,105,0.2)" }}
            />
            <NavLink href={`/${locale}`}>
              <img
                src="/assets/img/tibra-logo.png"
                alt="Tibra Foods"
                style={{ height: 70, width: "auto" }}
              />
            </NavLink>
            <div
              className="footer-border right"
              style={{ borderColor: "rgba(234,211,105,0.2)" }}
            />
          </div>

          <div className="widget-area">
            <div className="row justify-content-center gy-40">
              {/* ── Quick Links ── */}
              <div className="col-xl-4 col-lg-4 col-sm-6">
                <div className="widget widget_nav_menu footer-widget">
                  <h3 className="widget_title" style={{ color: "#ead369" }}>
                    {t("footer.usefulLinks")}
                  </h3>
                  <div className="menu-all-pages-container">
                    <ul className="menu">
                      {[
                        { href: `/${locale}`, label: t("nav.home") },
                        { href: l("product"), label: t("nav.products") },
                        { href: l("b2b"), label: t("nav.b2b") },
                        { href: l("about"), label: t("nav.history") },
                        { href: l("gallery"), label: t("nav.gallery") },
                        { href: l("blog"), label: t("nav.blog") },
                        { href: l("contact"), label: t("nav.contact") },
                      ].map(({ href, label }) => (
                        <li key={href}>
                          <NavLink href={href}>{label}</NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* ── Our Promise (replaces Working Hours) ── */}
              <div className="col-xl-4 col-lg-4 col-sm-6">
                <div className="widget footer-widget">
                  <h3 className="widget_title" style={{ color: "#ead369" }}>
                    {t("footer.promiseTitle")}
                  </h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {promises.map(({ icon, text }) => (
                      <li
                        key={icon}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          marginBottom: 14,
                        }}>
                        <span
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: "50%",
                            background: "rgba(234,211,105,.08)",
                            border: "1px solid rgba(234,211,105,.25)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}>
                          <i
                            className={`far ${icon}`}
                            style={{ color: "#ead369", fontSize: ".82rem" }}
                          />
                        </span>
                        <span
                          style={{
                            color: "#b0b0b0",
                            fontSize: ".82rem",
                            lineHeight: 1.45,
                          }}>
                          {text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Social icons */}
                  <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
                    {socials.map(({ icon, href, label }) => (
                      <a
                        key={icon}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          background: "rgba(255,255,255,.06)",
                          border: "1px solid rgba(234,211,105,.2)",
                          color: "#b0b0b0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textDecoration: "none",
                          fontSize: ".85rem",
                          transition: "all .2s",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = "#ead369";
                          el.style.color = "#1a1a1a";
                          el.style.borderColor = "#ead369";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = "rgba(255,255,255,.06)";
                          el.style.color = "#b0b0b0";
                          el.style.borderColor = "rgba(234,211,105,.2)";
                        }}>
                        <i className={`fab ${icon}`} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Favourite Dates ── */}
              <div className="col-xl-4 col-lg-4 col-sm-6">
                <div className="widget widget_nav_menu footer-widget favorite-menu">
                  <h3 className="widget_title" style={{ color: "#ead369" }}>
                    {t("footer.favoriteMenus")}
                  </h3>
                  <div className="menu-all-pages-container">
                    <ul className="menu">
                      {[
                        { name: "Ajwa Dates", id: 0 },
                        { name: "Medjool Dates", id: 1 },
                        { name: "Safawi Dates", id: 2 },
                        { name: "Barni Dates", id: 3 },
                        { name: "Mabroom Dates", id: 4 },
                        { name: "Sagai Dates", id: 5 },
                        { name: "Rutab Dates", id: 7 },
                      ].map(({ name, id }) => (
                        <li key={name}>
                          <NavLink href={`/${locale}/products/${id}`}>
                            {name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Copyright ── */}
        <div
          className="copyright-wrap"
          style={{
            borderTop: "1px solid rgba(234,211,105,0.1)",
            marginTop: 48,
          }}>
          <div className="container">
            <div className="row gy-3 align-items-center">
              <div className="col-lg-6">
                <p
                  className="copyright-text"
                  style={{ color: "#666", fontSize: ".82rem" }}>
                  <i className="fal fa-copyright" style={{ marginRight: 4 }} />
                  {t("footer.copyright")}
                </p>
              </div>
              <div className="col-lg-6 text-center text-lg-end">
                <div className="footer-links">
                  <ul>
                    <li>
                      <NavLink href={l("faq")}>
                        {t("footer.links.privacy")}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href={l("faq")}>{t("footer.terms")}</NavLink>
                    </li>
                    <li>
                      <NavLink href={l("contact")}>
                        {t("footer.support")}
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ══ WhatsApp floating button — same size as scroll-top (50×50) ══ */}
      <a
        href="https://wa.me/966537351609"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="tibra-whatsapp-btn"
        style={{
          position: "fixed",
          zIndex: 9,
          lineHeight: "50px",
          borderRadius: "50%",
          background: "#25D366",
          color: "#fff",
          fontSize: "1.4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,211,102,.45)",
          textDecoration: "none",
          transition: "transform .25s ease, box-shadow .25s ease",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "scale(1.1)";
          el.style.boxShadow = "0 8px 28px rgba(37,211,102,.6)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "scale(1)";
          el.style.boxShadow = "0 4px 20px rgba(37,211,102,.45)";
        }}>
        <i className="fab fa-whatsapp" />
      </a>

      {/* ══ Scroll To Top ══ */}
      <div className="scroll-top" style={{ borderColor: "#ead369" }}>
        <svg className="progress-circle svg-content" viewBox="-1 -1 102 102">
          <path
            d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
            style={{
              transition: "stroke-dashoffset 10ms linear 0s",
              strokeDasharray: "307.919, 307.919",
              strokeDashoffset: 307.919,
              stroke: "#ead369",
            }}
          />
        </svg>
      </div>
    </>
  );
}
