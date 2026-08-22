import { type Locale } from "@/lib/i18n";
import GalleryPage from "@/components/sections/GalleryPage";
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <GalleryPage locale={locale as Locale} />;
}
