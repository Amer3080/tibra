import { type Locale } from "@/lib/i18n";
import BlogPage from "@/components/sections/BlogPage";
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <BlogPage locale={locale as Locale} />;
}
