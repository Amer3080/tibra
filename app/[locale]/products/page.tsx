import { redirect } from "next/navigation";

// /en/products → redirect to /en/product (the products listing page)
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/product`);
}
