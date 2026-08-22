import { type Locale } from "@/lib/i18n";
import AboutPage from "@/components/sections/AboutPage";
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <AboutPage locale={locale as Locale} />;
}
