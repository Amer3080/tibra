import { type Locale } from "@/lib/i18n";
import TeamPage from "@/components/sections/TeamPage";
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <TeamPage locale={locale as Locale} />;
}
