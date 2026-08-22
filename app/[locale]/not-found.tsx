import { type Locale } from "@/lib/i18n";
import ErrorPage from "@/components/sections/ErrorPage";

export default function LocaleNotFound() {
  // Default to 'en' for the locale since we can't get it in not-found
  return <ErrorPage locale={"en" as Locale} />;
}
