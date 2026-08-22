"use client";

import { useTranslations } from "next-intl";
import NavLink from "@/components/ui/NavLink";
import { type Locale } from "@/lib/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ErrorPage({ locale }: { locale: Locale }) {
  const t = useTranslations();
  return (
    <>
      <Header locale={locale} />
      <section className="space">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <div className="error-content">
                <img src="/assets/img/bg/error-img.png" alt="404" className="mb-40" onError={(e)=>{(e.target as HTMLImageElement).style.display="none"}} />
                <h1 className="error-title" style={{fontSize:"8rem",fontWeight:700,color:"var(--theme-color)"}}>404</h1>
                <h2 className="sec-title mt-20">Oops! Page Not Found</h2>
                <p className="box-text mt-20 mb-40">The page you are looking for might have been removed, had its name changed or is temporarily unavailable. Please check the URL or return to the homepage.</p>
                <NavLink href={`/${locale}`} className="th-btn btn-mask">BACK TO HOME</NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer locale={locale} />
    </>
  );
}