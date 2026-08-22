import { type Locale } from "@/lib/i18n";
import ShopPage from "@/components/sections/ShopPage";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <ShopPage locale={locale as Locale} />;
}
