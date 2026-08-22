"use client";
import NavLink from "@/components/ui/NavLink";
import { usePathname } from "next/navigation";
import { localeConfig, locales, type Locale } from "@/lib/i18n";

export default function LanguageSwitcher({
  currentLocale,
}: {
  currentLocale: Locale;
}) {
  const pathname = usePathname();

  const getLocalePath = (locale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/") || "/";
  };

  const current = localeConfig[currentLocale];

  return (
    <div className="lang-switcher" >
      <span style={{ fontSize: 16 }}>{current.flag}</span>
      <span
        style={{ fontSize: 12, fontWeight: 600, color: "#fff", marginLeft: 4 }}>
        {current.nativeName}
      </span>
      <i
        className="far fa-chevron-down"
        style={{ fontSize: 9, color: "#aaa", marginLeft: 3 }}
      />

      <div className="lang-switcher__dropdown">
        {locales.map((locale) => {
          const cfg = localeConfig[locale];
          return (
            <NavLink
              key={locale}
              href={getLocalePath(locale)}
              className={`lang-switcher__item ${locale === currentLocale ? "active" : ""}`}>
              <span style={{ fontSize: 14 }}>{cfg.flag}</span>
              <span>{cfg.nativeName}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
