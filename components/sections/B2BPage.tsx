"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { type Locale } from "@/lib/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";

interface QuoteForm {
  name: string; email: string; phone: string; country: string;
  dateType: string; quantity: string; packaging: string;
  delivery: string; message: string;
}
const EMPTY: QuoteForm = {
  name:"", email:"", phone:"", country:"",
  dateType:"", quantity:"", packaging:"", delivery:"", message:"",
};

const CERT_ICONS = ["fa-award","fa-star-and-crescent","fa-shield-halved","fa-leaf"];

export default function B2BPage({ locale }: { locale: Locale }) {
  const t       = useTranslations();
  const products = t.raw("products.items") as any[];
  const features = t.raw("b2b.features")  as any[];
  const certs    = t.raw("b2b.certs")     as any[];

  const [form,   setForm]   = useState<QuoteForm>(EMPTY);
  const [errors, setErrors] = useState<Partial<QuoteForm>>({});
  const [status, setStatus] = useState<"idle"|"sending"|"success"|"error">("idle");

  const validate = () => {
    const e: Partial<QuoteForm> = {};
    if (!form.name.trim())    e.name    = "Required";
    if (!form.email.trim())   e.email   = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.phone.trim())   e.phone   = "Required";
    if (!form.country.trim()) e.country = "Required";
    if (!form.dateType)       e.dateType = "Please select a variety";
    if (!form.quantity)       e.quantity = "Please select a quantity";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name as keyof QuoteForm]) setErrors(p => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      const emailjs = (window as any).emailjs;
      if (emailjs) {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID        || "YOUR_SERVICE_ID",
          process.env.NEXT_PUBLIC_EMAILJS_ORDER_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
          {
            from_name: form.name, from_email: form.email,
            phone: form.phone,    country: form.country,
            date_type: form.dateType, quantity: form.quantity,
            packaging: form.packaging, delivery: form.delivery,
            message: form.message,
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY"
        );
      } else {
        await new Promise(r => setTimeout(r, 900));
      }
      setStatus("success"); setForm(EMPTY);
    } catch { setStatus("error"); }
  };

  const ic = (f: keyof QuoteForm) => `form-control${errors[f] ? " is-invalid" : ""}`;

  return (
    <>
      <Header locale={locale} />
      <Breadcrumb
        title={t("b2b.breadcrumb")}
        homeLabel={t("b2b.home")}
        homeHref={`/${locale}`}
        current={t("b2b.breadcrumb")}
      />

      {/* ══ Section Header ══ */}
      <section style={{ background:"#f8f5f0", paddingTop:64, paddingBottom:0 }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <span className="sub-title text-anime-style-1">{t("b2b.subtitle")}</span>
              <h2 className="sec-title text-anime-style-2" style={{ marginTop:8 }}>
                {t("b2b.title")}{" "}
                <span className="text-theme">{t("b2b.titleHighlight")}</span>
              </h2>
              <p className="box-text" style={{ marginTop:14, maxWidth:600, margin:"14px auto 0" }}>
                {t("b2b.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ Features + Quote Form ══ */}
      <section style={{ background:"#f8f5f0", padding:"48px 0 72px" }}>
        <div className="container">
          <div className="row gy-40 align-items-start">

            {/* Left — feature cards */}
            <div className="col-lg-5">
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                {features.map((f:any, i:number) => (
                  <div key={i} className="wow fadeinleft" data-wow-delay={`.${i*2+2}s`}
                    style={{
                      display:"flex", gap:16, alignItems:"flex-start",
                      background:"#fff", borderRadius:12, padding:"18px 20px",
                      boxShadow:"0 4px 20px rgba(0,0,0,.06)",
                      borderLeft:"4px solid #ead369",
                    }}>
                    <div style={{
                      width:44, height:44, borderRadius:10, background:"#214137",
                      display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                    }}>
                      <i className={`far ${f.icon}`} style={{ color:"#ead369", fontSize:"1.1rem" }} />
                    </div>
                    <div>
                      <h5 style={{ fontSize:".95rem", fontWeight:700, color:"#1a1a1a", marginBottom:4 }}>{f.title}</h5>
                      <p style={{ fontSize:".82rem", color:"#666", margin:0 }}>{f.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a href={t("b2b.whatsapp")} target="_blank" rel="noopener noreferrer"
                style={{
                  display:"flex", alignItems:"center", gap:12,
                  background:"#25D366", color:"#fff", textDecoration:"none",
                  borderRadius:12, padding:"14px 20px", marginTop:24,
                  fontWeight:700, fontSize:".9rem",
                  boxShadow:"0 4px 16px rgba(37,211,102,.35)",
                  transition:"transform .2s, box-shadow .2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(37,211,102,.5)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(37,211,102,.35)";
                }}>
                <i className="fab fa-whatsapp" style={{ fontSize:"1.4rem" }} />
                <div>
                  <div style={{ fontSize:".72rem", opacity:.85, fontWeight:400 }}>Prefer to chat?</div>
                  Message us on WhatsApp
                </div>
                <i className="far fa-arrow-right" style={{ marginLeft:"auto", opacity:.7 }} />
              </a>
            </div>

            {/* Right — Price Quote Form */}
            <div className="col-lg-7">
              <div style={{
                background:"#fff", borderRadius:20, padding:"36px 32px",
                boxShadow:"0 16px 60px rgba(0,0,0,.1)",
              }}>
                {/* Form header */}
                <div style={{
                  background:"linear-gradient(135deg,#214137 0%,#136865 100%)",
                  borderRadius:12, padding:"20px 24px", marginBottom:28,
                  display:"flex", alignItems:"center", gap:14,
                }}>
                  <div style={{
                    width:44, height:44, borderRadius:"50%",
                    background:"rgba(234,211,105,.2)",
                    border:"2px solid rgba(234,211,105,.5)",
                    display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                  }}>
                    <i className="far fa-file-invoice-dollar" style={{ color:"#ead369", fontSize:"1.1rem" }} />
                  </div>
                  <div>
                    <h4 style={{ color:"#fff", fontWeight:800, fontSize:"1.1rem", margin:0 }}>
                      {t("b2b.formTitle")}
                    </h4>
                    <p style={{ color:"rgba(255,255,255,.7)", fontSize:".78rem", margin:"4px 0 0" }}>
                      {t("b2b.formSubtitle")}
                    </p>
                  </div>
                  <span style={{
                    marginLeft:"auto", background:"#ead369", color:"#1a1a1a",
                    fontSize:".62rem", fontWeight:800, padding:"4px 10px",
                    borderRadius:20, letterSpacing:".06em", flexShrink:0,
                  }}>
                    FREE
                  </span>
                </div>

                {/* Alerts */}
                {status === "success" && (
                  <div style={{
                    background:"#d4edda", color:"#155724", borderRadius:10,
                    padding:"14px 18px", marginBottom:20,
                    display:"flex", gap:10, alignItems:"center",
                  }}>
                    <i className="far fa-check-circle" style={{ fontSize:"1.1rem" }} />
                    {t("b2b.success")}
                  </div>
                )}
                {status === "error" && (
                  <div style={{
                    background:"#f8d7da", color:"#721c24", borderRadius:10,
                    padding:"14px 18px", marginBottom:20,
                    display:"flex", gap:10, alignItems:"center",
                  }}>
                    <i className="far fa-exclamation-circle" />
                    {t("b2b.error")}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="row g-3">
                    <div className="col-md-6 form-group">
                      <input type="text" name="name" value={form.name} onChange={handleChange}
                        className={ic("name")} placeholder={t("b2b.name")} />
                      <i className="fal fa-building" />
                      {errors.name && <Err msg={errors.name} />}
                    </div>
                    <div className="col-md-6 form-group">
                      <input type="email" name="email" value={form.email} onChange={handleChange}
                        className={ic("email")} placeholder={t("b2b.email")} />
                      <i className="fal fa-envelope" />
                      {errors.email && <Err msg={errors.email} />}
                    </div>
                    <div className="col-md-6 form-group">
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                        className={ic("phone")} placeholder={t("b2b.phone")} />
                      <i className="fal fa-phone" />
                      {errors.phone && <Err msg={errors.phone} />}
                    </div>
                    <div className="col-md-6 form-group">
                      <input type="text" name="country" value={form.country} onChange={handleChange}
                        className={ic("country")} placeholder={t("b2b.country")} />
                      <i className="fal fa-globe" />
                      {errors.country && <Err msg={errors.country} />}
                    </div>
                    <div className="col-md-6 form-group style-border">
                      <select name="dateType" value={form.dateType} onChange={handleChange}
                        className={`form-select${errors.dateType ? " is-invalid" : ""}`}>
                        <option value="">{t("b2b.dateType")}</option>
                        {products.map((p:any) => (
                          <option key={p.name} value={p.name}>{p.name}</option>
                        ))}
                        <option value="Mixed Varieties">Mixed Varieties</option>
                      </select>
                      {errors.dateType && <Err msg={errors.dateType} />}
                    </div>
                    <div className="col-md-6 form-group style-border">
                      <select name="quantity" value={form.quantity} onChange={handleChange}
                        className={`form-select${errors.quantity ? " is-invalid" : ""}`}>
                        <option value="">{t("b2b.quantity")}</option>
                        <option value="20-50kg">{t("b2b.qty20")}</option>
                        <option value="50-100kg">{t("b2b.qty50")}</option>
                        <option value="100-200kg">{t("b2b.qty200")}</option>
                        <option value="200-500kg">{t("b2b.qty500")}</option>
                        <option value="500kg+">{t("b2b.qtyBulk")}</option>
                      </select>
                      {errors.quantity && <Err msg={errors.quantity} />}
                    </div>
                    <div className="col-md-6 form-group style-border">
                      <select name="packaging" value={form.packaging} onChange={handleChange}
                        className="form-select">
                        <option value="">{t("b2b.packaging")}</option>
                        <option value="standard">{t("b2b.packStd")}</option>
                        <option value="custom">{t("b2b.packCustom")}</option>
                        <option value="bulk">{t("b2b.packBulk")}</option>
                      </select>
                    </div>
                    <div className="col-md-6 form-group">
                      <input type="text" name="delivery" value={form.delivery} onChange={handleChange}
                        className="form-control" placeholder={t("b2b.delivery")} />
                      <i className="fal fa-map-marker-alt" />
                    </div>
                    <div className="col-12 form-group">
                      <textarea name="message" value={form.message} onChange={handleChange}
                        className="form-control" rows={3} placeholder={t("b2b.message")} />
                      <i className="fal fa-pencil" />
                    </div>
                    <div className="col-12">
                      <button type="submit" disabled={status==="sending"}
                        style={{
                          width:"100%", padding:"14px 24px",
                          background: status==="sending"
                            ? "#888"
                            : "linear-gradient(135deg,#214137 0%,#136865 100%)",
                          border:"none", borderRadius:10,
                          color:"#ead369", fontWeight:800, fontSize:".95rem",
                          cursor: status==="sending" ? "not-allowed" : "pointer",
                          letterSpacing:".04em",
                          display:"flex", alignItems:"center", justifyContent:"center", gap:10,
                        }}>
                        {status==="sending"
                          ? <><i className="far fa-spinner fa-spin"/>{t("b2b.sending")}</>
                          : <><i className="far fa-paper-plane"/>{t("b2b.send")}</>}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ Certifications ══ */}
      <section className="space overflow-hidden" style={{ background:"#214137" }}>
        <div className="container">
          <div className="row justify-content-center mb-50">
            <div className="col-lg-7 text-center">
              <span className="sub-title text-anime-style-1" style={{ color:"#ead369" }}>
                {t("b2b.certsSubtitle")}
              </span>
              <h2 className="sec-title text-anime-style-2 text-white" style={{ marginTop:8 }}>
                {t("b2b.certsTitle")}
              </h2>
              <p style={{ color:"rgba(255,255,255,.75)", marginTop:12, fontSize:".9rem" }}>
                {t("b2b.certsDesc")}
              </p>
            </div>
          </div>
          <div className="row gy-30 justify-content-center">
            {certs.map((cert:any, i:number) => (
              <div key={i} className="col-lg-3 col-md-6">
                <div className="wow fadeinup" data-wow-delay={`.${i*2+2}s`}
                  style={{
                    background:"rgba(255,255,255,.06)",
                    border:"1px solid rgba(234,211,105,.2)",
                    borderRadius:16, padding:"32px 24px", textAlign:"center",
                    transition:"transform .3s, box-shadow .3s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 50px rgba(0,0,0,.3)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}>
                  <div style={{
                    width:72, height:72, borderRadius:"50%",
                    background:"rgba(234,211,105,.12)",
                    border:"2px solid rgba(234,211,105,.35)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    margin:"0 auto 18px",
                  }}>
                    <i className={`far ${CERT_ICONS[i%CERT_ICONS.length]}`}
                      style={{ fontSize:"1.8rem", color:"#ead369" }} />
                  </div>
                  <div style={{
                    display:"inline-block", background:"#ead369", color:"#1a1a1a",
                    fontWeight:800, fontSize:".78rem", padding:"4px 14px",
                    borderRadius:20, letterSpacing:".06em", marginBottom:10,
                  }}>
                    {cert.name}
                  </div>
                  <p style={{ color:"rgba(255,255,255,.7)", fontSize:".82rem", margin:"0 0 8px", lineHeight:1.5 }}>
                    {cert.body}
                  </p>
                  <p style={{ color:"rgba(234,211,105,.55)", fontSize:".7rem", fontWeight:700, margin:0 }}>
                    Certified {cert.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer locale={locale} />
    </>
  );
}

function Err({ msg }: { msg: string }) {
  return <div className="invalid-feedback" style={{ display:"block", fontSize:".74rem" }}>{msg}</div>;
}
