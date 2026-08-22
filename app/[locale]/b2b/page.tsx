import { type Locale } from "@/lib/i18n";
import B2BPage from "@/components/sections/B2BPage";
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <B2BPage locale={locale as Locale} />;
}
