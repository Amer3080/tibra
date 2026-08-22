"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { type Locale, localeConfig, locales } from "@/lib/i18n";
import NavLink from "@/components/ui/NavLink";
import { usePathname } from "next/navigation";
import { useTheme, type ArabicFont } from "@/components/ui/ThemeProvider";

export default function Header({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const l = (path: string) => `/${locale}/${path}`;
  const pathname = usePathname();
  const { dark, toggleDark, arabicFont, setArabicFont } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const getLocalePath = (loc: Locale) => {
    const segs = pathname.split("/");
    segs[1] = loc;
    return segs.join("/") || "/";
  };

  const current = localeConfig[locale];
  const isAr = locale === "ar";

  // Nav order: Home - Products - B2B - (About dropdown) - Blog - Contact
  const navLinks = [
    { href: `/${locale}`, label: t("nav.home") },
    { href: l("product"), label: t("nav.products") },
    { href: l("b2b"), label: t("nav.b2b") },
  ];
  const navLinksRight = [
    { href: l("blog"), label: t("nav.blog") },
    { href: l("contact"), label: t("nav.contact") },
  ];

  // About dropdown: History - Gallery - Testimonials - FAQs
  const aboutLinks = [
    { href: l("about"), label: t("nav.history"), icon: "fa-clock-rotate-left" },
    { href: l("gallery"), label: t("nav.gallery"), icon: "fa-images" },
    { href: l("testimonials"), label: t("nav.testimonials"), icon: "fa-star" },
    { href: l("faq"), label: t("nav.faq"), icon: "fa-circle-question" },
  ];

  return (
    <>
      <style>{`
        .tb-header {
          position:fixed; top:0; left:0; right:0; z-index:1000;
          background:#214137; transition:box-shadow .35s ease;
        }
        .tb-header.tb-scrolled { box-shadow:0 4px 30px rgba(0,0,0,.4); }
        .tb-inner {
          max-width:1320px; margin:0 auto; padding:0 24px;
          height:72px; display:flex; align-items:center;
          justify-content:space-between; gap:16px;
        }
        .tb-logo img { height:48px; width:auto; display:block; }
        .tb-nav {
          display:flex; align-items:center; gap:2px;
          list-style:none; margin:0; padding:0;
        }
        .tb-nav li { position:relative; }
        .tb-nav-link {
          display:flex; align-items:center; gap:5px;
          padding:8px 12px; border-radius:6px;
          color:rgba(255,255,255,.85) !important;
          font-size:.8rem; font-weight:600; letter-spacing:.08em;
          text-transform:uppercase; text-decoration:none !important;
          white-space:nowrap;
          transition:color .25s ease,background .25s ease,transform .25s ease;
        }
        .tb-nav-link:hover { color:#ead369 !important; background:rgba(234,211,105,.08); transform:translateY(-1px); }
        .tb-nav-link .tb-chevron { font-size:9px; opacity:.6; transition:transform .25s; }
        .tb-nav li:hover .tb-chevron { transform:rotate(180deg); }
        .tb-dropdown {
          position:absolute; top:calc(100% + 8px); left:0;
          min-width:210px; background:#1a2e28;
          border:1px solid rgba(234,211,105,.18); border-radius:8px;
          box-shadow:0 16px 48px rgba(0,0,0,.5);
          list-style:none; margin:0; padding:6px; z-index:9999;
          opacity:0; pointer-events:none; transform:translateY(8px);
          transition:opacity .25s ease,transform .25s ease;
        }
        .tb-nav li::after { content:''; position:absolute; top:100%; left:0; right:0; height:10px; }
        .tb-nav li:hover .tb-dropdown { opacity:1; pointer-events:auto; transform:translateY(0); }
        .tb-dropdown-link {
          display:flex; align-items:center; gap:10px;
          padding:10px 14px; border-radius:6px;
          color:rgba(255,255,255,.75) !important; font-size:.8rem;
          font-weight:500; text-decoration:none !important;
          transition:color .2s,background .2s,padding-left .2s;
        }
        .tb-dropdown-link:hover { color:#ead369 !important; background:rgba(234,211,105,.08); padding-left:18px; }
        [dir="rtl"] .tb-dropdown-link:hover { padding-left:14px; padding-right:18px; }
        .tb-dropdown-link i { color:#ead369; font-size:.85rem; width:16px; text-align:center; }
        /* RTL dropdown position */
        [dir="rtl"] .tb-dropdown { left:auto; right:0; }

        /* ── Right controls ── */
        .tb-controls { display:flex; align-items:center; gap:8px; }

        /* Dark mode toggle */
        .tb-dark-btn {
          display:inline-flex; align-items:center; justify-content:center;
          width:36px; height:36px; border-radius:50%;
          background:rgba(255,255,255,.1); border:none;
          color:#fff; font-size:.9rem; cursor:pointer;
          transition:all .25s ease; flex-shrink:0;
        }
        .tb-dark-btn:hover { background:rgba(234,211,105,.25); color:#ead369; }

        /* Language selector */
        .tb-lang-wrap { position:relative; }
        .tb-lang-btn {
          display:inline-flex; align-items:center; gap:6px;
          padding:6px 12px; border:1.5px solid rgba(255,255,255,.5);
          border-radius:6px; background:transparent; color:#fff !important;
          font-size:.78rem; font-weight:700; letter-spacing:.06em;
          cursor:pointer; transition:all .25s ease; white-space:nowrap;
        }
        .tb-lang-btn:hover { background:#ead369; color:#1a1a1a !important; border-color:#ead369; }
        .tb-lang-chevron { font-size:9px; opacity:.65; transition:transform .25s; }
        .tb-lang-wrap.tb-open .tb-lang-chevron { transform:rotate(180deg); }
        .tb-flag { font-size:17px; line-height:1; }
        .tb-lang-drop {
          position:absolute; top:calc(100% + 10px); left:0;
          min-width:180px; max-height:340px; overflow-y:auto;
          background:#1a2e28; border:1px solid rgba(234,211,105,.18);
          border-radius:8px; box-shadow:0 16px 48px rgba(0,0,0,.5);
          z-index:9999; opacity:0; pointer-events:none;
          transform:translateY(8px); transition:opacity .25s,transform .25s;
        }
        [dir="rtl"] .tb-lang-drop { left:auto; right:0; }
        .tb-lang-wrap::after { content:''; position:absolute; top:100%; left:0; right:0; height:12px; }
        .tb-lang-wrap:hover .tb-lang-drop,
        .tb-lang-wrap.tb-open .tb-lang-drop { opacity:1; pointer-events:auto; transform:translateY(0); }
        .tb-lang-item {
          display:flex; align-items:center; gap:10px; padding:10px 16px;
          color:rgba(255,255,255,.75) !important; font-size:.8rem; font-weight:500;
          text-decoration:none !important; border-bottom:1px solid rgba(255,255,255,.05);
          transition:background .2s,color .2s; cursor:pointer;
        }
        .tb-lang-item:last-child { border-bottom:none; }
        .tb-lang-item:hover,.tb-lang-item.tb-active { background:rgba(234,211,105,.09); color:#ead369 !important; }
        .tb-lang-item.tb-active { font-weight:700; }
        .tb-lang-item .tb-check { margin-left:auto; color:#ead369; font-size:10px; }
        [dir="rtl"] .tb-lang-item .tb-check { margin-left:0; margin-right:auto; }

        /* Arabic font switcher (visible only when lang=ar) */
        .tb-ar-font-wrap { position:relative; }
        .tb-ar-font-btn {
          display:inline-flex; align-items:center; gap:5px;
          padding:5px 10px; border:1px solid rgba(234,211,105,.4);
          border-radius:5px; background:transparent; color:rgba(255,255,255,.75) !important;
          font-size:.72rem; font-weight:600; cursor:pointer;
          transition:all .2s; white-space:nowrap;
        }
        .tb-ar-font-btn:hover { background:rgba(234,211,105,.12); color:#ead369 !important; }
        .tb-ar-font-drop {
          position:absolute; top:calc(100% + 8px); right:0;
          min-width:160px; background:#1a2e28;
          border:1px solid rgba(234,211,105,.18); border-radius:8px;
          box-shadow:0 12px 40px rgba(0,0,0,.5);
          z-index:9999; opacity:0; pointer-events:none;
          transform:translateY(6px); transition:opacity .2s,transform .2s;
        }
        .tb-ar-font-wrap:hover .tb-ar-font-drop { opacity:1; pointer-events:auto; transform:translateY(0); }
        .tb-ar-font-item {
          display:block; padding:9px 14px;
          color:rgba(255,255,255,.75) !important; font-size:.8rem;
          text-decoration:none !important; cursor:pointer;
          transition:background .2s,color .2s;
          border-bottom:1px solid rgba(255,255,255,.05);
        }
        .tb-ar-font-item:last-child { border-bottom:none; }
        .tb-ar-font-item:hover,.tb-ar-font-item.active { background:rgba(234,211,105,.09); color:#ead369 !important; }

        /* Hamburger */
        .tb-burger {
          display:none; flex-direction:column; justify-content:center;
          align-items:flex-end; gap:5px; width:42px; height:42px;
          background:transparent; border:none; cursor:pointer;
          padding:6px; border-radius:8px; transition:background .2s; flex-shrink:0;
        }
        .tb-burger:hover { background:rgba(234,211,105,.1); }
        .tb-bar {
          display:block; height:2px; background:#fff; border-radius:2px;
          transform-origin:center;
          transition:width .35s cubic-bezier(.4,0,.2,1),transform .35s cubic-bezier(.4,0,.2,1),opacity .25s ease;
        }
        .tb-bar-1{width:26px;} .tb-bar-2{width:18px;} .tb-bar-3{width:10px;}
        .tb-burger:hover .tb-bar { background:#ead369; width:26px; }
        .tb-burger[aria-expanded="true"] .tb-bar-1 { width:26px; transform:translateY(7px) rotate(45deg); background:#ead369; }
        .tb-burger[aria-expanded="true"] .tb-bar-2 { opacity:0; transform:scaleX(0); width:26px; }
        .tb-burger[aria-expanded="true"] .tb-bar-3 { width:26px; transform:translateY(-7px) rotate(-45deg); background:#ead369; }

        /* Mobile drawer */
        .tb-drawer {
          position:fixed; top:72px; left:0; right:0; bottom:0;
          background:#1a2e28; z-index:999; overflow-y:auto;
          padding:24px 20px 40px;
          transform:translateX(-100%); transition:transform .35s cubic-bezier(.4,0,.2,1);
        }
        [dir="rtl"] .tb-drawer { transform:translateX(100%); }
        .tb-drawer.tb-open { transform:translateX(0) !important; }
        .tb-mob-links { list-style:none; margin:0; padding:0; }
        .tb-mob-link {
          display:block; padding:14px 0;
          color:rgba(255,255,255,.85) !important; font-size:.9rem;
          font-weight:600; letter-spacing:.06em; text-transform:uppercase;
          text-decoration:none !important; border-bottom:1px solid rgba(255,255,255,.08);
          transition:color .2s,padding-left .2s;
        }
        .tb-mob-link:hover { color:#ead369 !important; padding-left:6px; }
        [dir="rtl"] .tb-mob-link:hover { padding-left:0; padding-right:6px; }
        .tb-mob-acc-btn {
          width:100%; background:transparent; border:none;
          display:flex; align-items:center; justify-content:space-between;
          padding:14px 0; color:rgba(255,255,255,.85) !important;
          font-size:.9rem; font-weight:600; letter-spacing:.06em;
          text-transform:uppercase; cursor:pointer;
          border-bottom:1px solid rgba(255,255,255,.08); transition:color .2s;
        }
        .tb-mob-acc-btn:hover { color:#ead369 !important; }
        .tb-mob-acc-btn .tb-acc-icon { font-size:11px; opacity:.6; transition:transform .25s; }
        .tb-mob-acc-btn[aria-expanded="true"] .tb-acc-icon { transform:rotate(180deg); }
        .tb-mob-acc-body { overflow:hidden; max-height:0; transition:max-height .3s ease; }
        .tb-mob-acc-body.tb-acc-open { max-height:260px; }
        .tb-mob-sub-link {
          display:flex; align-items:center; gap:10px; padding:10px 16px;
          color:rgba(255,255,255,.65) !important; font-size:.82rem;
          font-weight:500; text-decoration:none !important; transition:color .2s;
        }
        .tb-mob-sub-link:hover { color:#ead369 !important; }
        .tb-mob-sub-link i { color:#ead369; width:16px; text-align:center; }
        .tb-mob-lang-title {
          font-size:.7rem; font-weight:700; letter-spacing:.15em;
          color:rgba(255,255,255,.4); text-transform:uppercase; margin:28px 0 12px;
        }
        .tb-mob-lang-grid { display:flex; flex-wrap:wrap; gap:8px; }
        .tb-mob-lang-item {
          display:inline-flex; align-items:center; gap:6px;
          padding:7px 12px; border-radius:6px;
          border:1px solid rgba(234,211,105,.25);
          color:rgba(255,255,255,.7) !important; font-size:.78rem;
          font-weight:500; text-decoration:none !important;
          background:transparent; transition:all .2s; cursor:pointer;
        }
        .tb-mob-lang-item:hover,.tb-mob-lang-item.tb-active {
          background:rgba(234,211,105,.12); color:#ead369 !important;
          border-color:rgba(234,211,105,.5);
        }
        .tb-mob-lang-item.tb-active { font-weight:700; }
        .tb-spacer { height:72px; }
        @media (max-width:991px) {
          .tb-nav,.tb-lang-wrap,.tb-dark-btn-desktop,.tb-ar-font-wrap { display:none !important; }
          .tb-burger { display:flex !important; }
        }
        @media (min-width:992px) {
          .tb-burger { display:none !important; }
          .tb-drawer { display:none !important; }
        }
      `}</style>

      <header className={`tb-header${scrolled ? " tb-scrolled" : ""}`}>
        <div className="tb-inner">
          {/* Logo */}
          <NavLink href={`/${locale}`} className="tb-logo">
            <img src="/assets/img/tibra-logo.png" alt="Tibra Foods" />
          </NavLink>

          {/* Desktop nav */}
          <nav aria-label="Main navigation">
            <ul className="tb-nav">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <NavLink href={link.href} className="tb-nav-link">
                    {link.label}
                  </NavLink>
                </li>
              ))}

              {/* About dropdown */}
              <li>
                <a
                  href="#"
                  className="tb-nav-link"
                  onClick={(e) => e.preventDefault()}>
                  {t("nav.about")}
                  <i className="far fa-chevron-down tb-chevron" />
                </a>
                <ul className="tb-dropdown">
                  {aboutLinks.map((link) => (
                    <li key={link.href}>
                      <NavLink href={link.href} className="tb-dropdown-link">
                        <i className={`far ${link.icon}`} />
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>

              {navLinksRight.map((link) => (
                <li key={link.href}>
                  <NavLink href={link.href} className="tb-nav-link">
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right controls */}
          <div className="tb-controls">
            {/* Arabic font switcher */}
            {/* {isAr && (
              <div className="tb-ar-font-wrap">
                <button className="tb-ar-font-btn" type="button">
                  <i className="far fa-font" />
                  {arabicFont === "el-messiri" ?
                    "El Messiri"
                  : arabicFont === "marhey" ?
                    "Marhey"
                  : "Amiri"}
                  <i
                    className="far fa-chevron-down"
                    style={{ fontSize: 8, opacity: 0.6 }}
                  />
                </button>
                <div className="tb-ar-font-drop">
                  {(["el-messiri", "marhey", "amiri"] as ArabicFont[]).map(
                    (f) => (
                      <button
                        key={f}
                        className={`tb-ar-font-item${arabicFont === f ? " active" : ""}`}
                        onClick={() => setArabicFont(f)}
                        style={{
                          fontFamily:
                            f === "el-messiri" ? "'El Messiri'"
                            : f === "marhey" ? "'Marhey'"
                            : "'Amiri'",
                        }}>
                        {f === "el-messiri" ?
                          "El Messiri — الخط الأول"
                        : f === "marhey" ?
                          "Marhey — ماري"
                        : "Amiri — الأميري"}
                      </button>
                    ),
                  )}
                </div>
              </div>
            )} */}

            {/* Language selector */}
            <div
              className={`tb-lang-wrap${langOpen ? " tb-open" : ""}`}
              onMouseEnter={() => setLangOpen(true)}
              onMouseLeave={() => setLangOpen(false)}>
              <button
                className="tb-lang-btn"
                type="button"
                aria-haspopup="listbox">
                <span className="tb-flag">{current.flag}</span>
                <span>{current.nativeName}</span>
                <i className="far fa-chevron-down tb-lang-chevron" />
              </button>
              <div className="tb-lang-drop" role="listbox">
                {locales.map((loc) => {
                  const cfg = localeConfig[loc];
                  const isActive = loc === locale;
                  return (
                    <NavLink
                      key={loc}
                      href={getLocalePath(loc)}
                      className={`tb-lang-item${isActive ? " tb-active" : ""}`}>
                      <span className="tb-flag">{cfg.flag}</span>
                      <span>{cfg.nativeName}</span>
                      {isActive && <i className="far fa-check tb-check" />}
                    </NavLink>
                  );
                })}
              </div>
            </div>
            {/* Dark mode toggle */}
            <button
              className="tb-dark-btn tb-dark-btn-desktop"
              style={{ marginLeft: isAr ? 0 : 8, marginRight: isAr ? 8 : 0 }}
              type="button"
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              onClick={toggleDark}>
              <i className={`far ${dark ? "fa-sun" : "fa-moon"}`} />
            </button>
            {/* Hamburger */}
            <button
              className="tb-burger"
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}>
              <span className="tb-bar tb-bar-1" />
              <span className="tb-bar tb-bar-2" />
              <span className="tb-bar tb-bar-3" />
            </button>
          </div>
        </div>
      </header>

      <div className="tb-spacer" />

      {/* Mobile drawer */}
      <div
        className={`tb-drawer${mobileOpen ? " tb-open" : ""}`}
        aria-hidden={!mobileOpen}>
        <ul className="tb-mob-links">
          {[...navLinks, ...navLinksRight].map((link) => (
            <li key={link.href}>
              <NavLink href={link.href} className="tb-mob-link">
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <MobAccordion label={t("nav.about")} links={aboutLinks} />
          </li>
        </ul>

        {/* Mobile dark mode */}
        <div
          style={{
            marginTop: 24,
            borderTop: "1px solid rgba(255,255,255,.08)",
            paddingTop: 20,
          }}>
          <button
            onClick={toggleDark}
            style={{
              background: "rgba(255,255,255,.08)",
              border: "none",
              borderRadius: 8,
              color: "#fff",
              padding: "10px 16px",
              cursor: "pointer",
              fontSize: ".82rem",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}>
            <i className={`far ${dark ? "fa-sun" : "fa-moon"}`} />
            {dark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <p className="tb-mob-lang-title">{t("nav.language") ?? "Language"}</p>
        <div className="tb-mob-lang-grid">
          {locales.map((loc) => {
            const cfg = localeConfig[loc];
            const isActive = loc === locale;
            return (
              <NavLink
                key={loc}
                href={getLocalePath(loc)}
                className={`tb-mob-lang-item${isActive ? " tb-active" : ""}`}>
                <span style={{ fontSize: 15 }}>{cfg.flag}</span>
                <span>{cfg.nativeName}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
}

function MobAccordion({
  label,
  links,
}: {
  label: string;
  links: { href: string; label: string; icon: string }[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="tb-mob-acc-btn"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}>
        {label}
        <i className="far fa-chevron-down tb-acc-icon" />
      </button>
      <div className={`tb-mob-acc-body${open ? " tb-acc-open" : ""}`}>
        {links.map((link) => (
          <NavLink key={link.href} href={link.href} className="tb-mob-sub-link">
            <i className={`far ${link.icon}`} />
            {link.label}
          </NavLink>
        ))}
      </div>
    </>
  );
}
