import { type Locale } from "@/lib/i18n";
import ErrorPage from "@/components/sections/ErrorPage";
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <ErrorPage locale={locale as Locale} />;
}
