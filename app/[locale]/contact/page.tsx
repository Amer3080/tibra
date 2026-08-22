import { type Locale } from "@/lib/i18n";
import ContactPage from "@/components/sections/ContactPage";
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <ContactPage locale={locale as Locale} />;
}
