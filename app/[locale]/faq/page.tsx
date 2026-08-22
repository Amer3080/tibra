import { type Locale } from "@/lib/i18n";
import FaqPage from "@/components/sections/FaqPage";
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <FaqPage locale={locale as Locale} />;
}
