import { type Locale } from "@/lib/i18n";
import ProductDetailsPage from "@/components/sections/ProductDetailsPage";

// Only generate the [id] segment — [locale] is handled by the parent layout
export async function generateStaticParams() {
  return Array.from({ length: 9 }, (_, i) => ({ id: String(i) }));
}

export const dynamicParams = false; // 404 for any id outside 0-8

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  return <ProductDetailsPage locale={locale as Locale} productId={Number(id)} />;
}
