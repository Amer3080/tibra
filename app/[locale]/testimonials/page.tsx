import { type Locale } from "@/lib/i18n";
import TestimonialsPage from "@/components/sections/TestimonialsPage";
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <TestimonialsPage locale={locale as Locale} />;
}
