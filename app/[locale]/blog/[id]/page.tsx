import { type Locale } from "@/lib/i18n";
import BlogDetailsPage from "@/components/sections/BlogDetailsPage";

// Only generate the [id] segment — [locale] is handled by the parent layout
export async function generateStaticParams() {
  return Array.from({ length: 6 }, (_, i) => ({ id: String(i) }));
}

export const dynamicParams = false; // 404 for any id outside 0-5

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  return <BlogDetailsPage locale={locale as Locale} postId={Number(id)} />;
}
