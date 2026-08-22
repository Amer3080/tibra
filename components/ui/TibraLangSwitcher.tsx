"use client";

import { usePathname } from "next/navigation";
import { localeConfig, locales, type Locale } from "@/lib/i18n";
import NavLink from "@/components/ui/NavLink";

interface Props {
  currentLocale: Locale;
  mobile?: boolean;
}

export default function TibraLangSwitcher({ currentLocale, mobile = false }: Props) {
  const pathname = usePathname();

  const getLocalePath = (locale: Locale) => {
    const segs = pathname.split("/");
    segs[1] = locale;
    return segs.join("/") || "/";
  };

  const current = localeConfig[currentLocale];

  /* ── Mobile: compact flag grid ── */
  if (mobile) {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
        {locales.map((locale) => {
          const cfg = localeConfig[locale];
          const isActive = locale === currentLocale;
          return (
            <NavLink
              key={locale}
              href={getLocalePath(locale)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "5px 10px",
                fontSize: 12, fontWeight: isActive ? 700 : 400,
                color: isActive ? "#0d0d0d" : "#d6d6d6",
                background: isActive ? "#ead369" : "rgba(234,211,105,0.08)",
                border: `1px solid ${isActive ? "#ead369" : "rgba(234,211,105,0.25)"}`,
                borderRadius: 4, textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              <span style={{ fontSize: 14 }}>{cfg.flag}</span>
              <span>{cfg.nativeName}</span>
            </NavLink>
          );
        })}
      </div>
    );
  }

  /* ── Desktop: button + hover dropdown ── */
  return (
    <>
      {/* Inline styles for the lang dropdown — hover-safe */}
      <style>{`
        .tibra-lang-wrap { position: relative; display: inline-flex; }

        /* The dropdown sits in a padded zone so the pointer
           never leaves the hover area when moving from button → list */
        .tibra-lang-wrap::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 0; right: 0;
          height: 12px; /* bridge between button and dropdown */
        }

        .tibra-lang-drop {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          min-width: 175px;
          background: rgba(20,30,28,0.98);
          border: 1px solid rgba(234,211,105,0.18);
          border-radius: 6px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.5);
          z-index: 9999;
          overflow: hidden;
          /* hidden by default */
          opacity: 0;
          pointer-events: none;
          transform: translateY(6px);
          transition: opacity 0.22s ease, transform 0.22s ease;
        }

        /* Show on hover — pointer must stay within .tibra-lang-wrap */
        .tibra-lang-wrap:hover .tibra-lang-drop,
        .tibra-lang-wrap:focus-within .tibra-lang-drop {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }

        .tibra-lang-item-d {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 16px;
          color: #d6d6d6;
          text-decoration: none;
          font-size: 0.8rem; font-weight: 500;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: background 0.15s, color 0.15s;
          cursor: pointer;
        }
        .tibra-lang-item-d:last-child { border-bottom: none; }
        .tibra-lang-item-d:hover { background: rgba(234,211,105,0.12); color: #ead369; }
        .tibra-lang-item-d.active { color: #ead369; background: rgba(234,211,105,0.07); }
      `}</style>

      <div className="tibra-lang-wrap" tabIndex={0}>
        {/* Trigger button — styled like th-btn */}
        <button className="tibra-lang-btn" type="button" aria-haspopup="true">
          <span style={{ fontSize: 16 }}>{current.flag}</span>
          <span style={{ fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.06em" }}>
            {current.nativeName}
          </span>
          <i className="far fa-chevron-down" style={{ fontSize: 9, opacity: 0.7 }} />
        </button>

        {/* Dropdown */}
        <div className="tibra-lang-drop" role="listbox">
          {locales.map((locale) => {
            const cfg = localeConfig[locale];
            const isActive = locale === currentLocale;
            return (
              <NavLink
                key={locale}
                href={getLocalePath(locale)}
                className={`tibra-lang-item-d ${isActive ? "active" : ""}`}
              >
                <span style={{ fontSize: 17 }}>{cfg.flag}</span>
                <span>{cfg.nativeName}</span>
                {isActive && (
                  <i className="far fa-check"
                    style={{ marginInlineStart: "auto", color: "#ead369", fontSize: 10 }} />
                )}
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
}
