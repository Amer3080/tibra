import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "ar", "ru", "fr", "de", "es", "it", "pt", "nl", "pl", "zh", "hi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeConfig: Record<Locale, { label: string; dir: "ltr" | "rtl"; flag: string; nativeName: string }> = {
  en: { label: "English",    dir: "ltr", flag: "🇬🇧", nativeName: "English"    },
  ar: { label: "Arabic",     dir: "rtl", flag: "🇸🇦", nativeName: "العربية"    },
  ru: { label: "Russian",    dir: "ltr", flag: "🇷🇺", nativeName: "Русский"    },
  fr: { label: "French",     dir: "ltr", flag: "🇫🇷", nativeName: "Français"   },
  de: { label: "German",     dir: "ltr", flag: "🇩🇪", nativeName: "Deutsch"    },
  es: { label: "Spanish",    dir: "ltr", flag: "🇪🇸", nativeName: "Español"    },
  it: { label: "Italian",    dir: "ltr", flag: "🇮🇹", nativeName: "Italiano"   },
  pt: { label: "Portuguese", dir: "ltr", flag: "🇵🇹", nativeName: "Português"  },
  nl: { label: "Dutch",      dir: "ltr", flag: "🇳🇱", nativeName: "Nederlands" },
  pl: { label: "Polish",     dir: "ltr", flag: "🇵🇱", nativeName: "Polski"     },
  zh: { label: "Chinese",    dir: "ltr", flag: "🇨🇳", nativeName: "中文"       },
  hi: { label: "Hindi",      dir: "ltr", flag: "🇮🇳", nativeName: "हिन्दी"    },
};

export default getRequestConfig(async ({ requestLocale }) => {
  // Use the new requestLocale API (fixes deprecation warning)
  const locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) notFound();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
