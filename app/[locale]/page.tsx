import { type Locale } from "@/lib/i18n";
import HomePage from "@/components/sections/HomePage";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <HomePage locale={locale as Locale} />;
}
