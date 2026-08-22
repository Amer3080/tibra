"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { type Locale } from "@/lib/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";

function FaqItem({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="accordion-card"
      style={{
        marginBottom: 12,
        borderRadius: 10,
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: isOpen ? "0 4px 20px rgba(0,0,0,0.06)" : "none",
        transition: "box-shadow .25s ease",
      }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          textAlign: "left",
          background: isOpen ? "#214137" : "#fff",
          border: "none",
          padding: "18px 20px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          transition: "background .25s ease",
        }}>
        <span style={{
          fontSize: ".92rem",
          fontWeight: 600,
          color: isOpen ? "#ead369" : "#1a1a1a",
          lineHeight: 1.4,
          textAlign: "left",
          transition: "color .25s ease",
        }}>
          {question}
        </span>
        <span style={{
          width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
          background: isOpen ? "rgba(234,211,105,.2)" : "rgba(33,65,55,.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background .25s, transform .25s",
          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
        }}>
          <i className="far fa-plus" style={{ fontSize: ".7rem", color: isOpen ? "#ead369" : "#214137" }} />
        </span>
      </button>

      {/* Answer — using max-height animation */}
      <div
        style={{
          maxHeight: isOpen ? 400 : 0,
          overflow: "hidden",
          transition: "max-height .35s cubic-bezier(.4,0,.2,1)",
        }}>
        <div style={{ padding: "16px 20px 20px", background: "#fff", borderTop: "1px solid rgba(33,65,55,.08)" }}>
          <p className="faq-text" style={{ margin: 0, fontSize: ".88rem", lineHeight: 1.7, color: "#444" }}>
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FaqPage({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const faqs = t.raw("faq.items") as { q: string; a: string }[];
  const [openIndex, setOpenIndex] = useState<number>(0);

  const half = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, half);
  const rightFaqs = faqs.slice(half);

  return (
    <>
      <Header locale={locale} />
      <Breadcrumb
        title={t("faq.breadcrumb")}
        homeLabel={t("faq.home")}
        homeHref={`/${locale}`}
        current={t("faq.breadcrumb")}
      />
      <div className="space">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="title-area text-center pe-xl-4 ps-xl-4">
                <span className="sub-title text-anime-style-1">{t("faq.subtitle")}</span>
                <h2 className="sec-title text-anime-style-2">{t("faq.title")}</h2>
                <img className="img-anime-style-1" src="/assets/img/icon/title-shape.png" alt="shape" />
              </div>
            </div>
          </div>

          <div className="row gy-30 mt-40">
            {/* Left column */}
            <div className="col-lg-6">
              {leftFaqs.map((faq, i) => (
                <FaqItem
                  key={i}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
              ))}
            </div>
            {/* Right column */}
            <div className="col-lg-6">
              {rightFaqs.map((faq, i) => {
                const globalIdx = i + half;
                return (
                  <FaqItem
                    key={globalIdx}
                    question={faq.q}
                    answer={faq.a}
                    isOpen={openIndex === globalIdx}
                    onToggle={() => setOpenIndex(openIndex === globalIdx ? -1 : globalIdx)}
                  />
                );
              })}
            </div>
          </div>

          {/* Still have questions CTA */}
          <div className="row mt-60 justify-content-center">
            <div className="col-lg-8 text-center">
              <div style={{
                background: "#214137", borderRadius: 16, padding: "40px 32px",
                boxShadow: "0 12px 40px rgba(33,65,55,.2)",
              }}>
                <h3 style={{ color: "#ead369", marginBottom: 12 }}>Still have questions?</h3>
                <p style={{ color: "rgba(255,255,255,.8)", marginBottom: 24, fontSize: ".9rem" }}>
                  Can't find the answer you're looking for? Get in touch with our team directly.
                </p>
                <a href={`/${locale}/contact`} className="th-btn style2 style-radius">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer locale={locale} />
    </>
  );
}
