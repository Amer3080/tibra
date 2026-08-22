import { type Locale } from "@/lib/i18n";
import TeamDetailsPage from "@/components/sections/TeamDetailsPage";
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <TeamDetailsPage locale={locale as Locale} />;
}
