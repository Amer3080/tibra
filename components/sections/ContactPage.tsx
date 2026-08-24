"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { type Locale } from "@/lib/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";

interface ContactForm {
  name: string;
  email: string;
  service: string;
  message: string;
}

const EMPTY: ContactForm = { name: "", email: "", service: "", message: "" };

export default function ContactPage({ locale }: { locale: Locale }) {
  const t = useTranslations();

  const [form, setForm] = useState<ContactForm>(EMPTY);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const validate = (): boolean => {
    const e: Partial<ContactForm> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email address";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof ContactForm])
      setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");

    try {
      /* ── EmailJS integration ──
         Replace with your actual credentials:
         NEXT_PUBLIC_EMAILJS_SERVICE_ID
         NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID
         NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      ── */
      const emailjs = (window as any).emailjs;
      if (emailjs) {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
          process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID ||
            "YOUR_CONTACT_TEMPLATE_ID",
          {
            from_name: form.name,
            from_email: form.email,
            service: form.service,
            message: form.message,
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY",
        );
      } else {
        await new Promise((r) => setTimeout(r, 800));
      }
      setStatus("success");
      setForm(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  const ic = (f: keyof ContactForm) =>
    `form-control${errors[f] ? " is-invalid" : ""}`;

  const infoItems = [
    {
      icon: "contact-map.svg",
      label: t("contact.address"),
      lines: [t("contact.addressLine")],
    },
    {
      icon: "team_call.svg",
      label: t("contact.phone"),
      lines: [t("contact.phoneLine1"), t("contact.phoneLine2")],
    },
    {
      icon: "contact-map.svg",
      label: t("contact.hours"),
      lines: [t("contact.hoursLine1"), t("contact.hoursLine2")],
    },
  ];

  return (
    <>
      <Header locale={locale} />
      <Breadcrumb
        title={t("contact.breadcrumb")}
        homeLabel={t("contact.home")}
        homeHref={`/${locale}`}
        current={t("contact.breadcrumb")}
      />

      {/* Contact area */}
      <div className="space contact-area-3">
        <div className="container">
          <div className="row gy-40 gx-80 align-items-center">
            {/* Info */}
            <div className="col-xl-6">
              <div className="contact-info-wrap">
                <div className="mb-30">
                  <h2 className="sec-title text-anime-style-2 mb-2">
                    {t("contact.subtitle")}{" "}
                    <span className="text-theme">{t("contact.title")}</span>
                  </h2>
                  <p className="box-text">{t("contact.description")}</p>
                </div>
                <div className="contact-feature-wrap">
                  {infoItems.map((item, i) => (
                    <div key={i} className="contact-feature2">
                      <div className="box-icon">
                        <img src={`/assets/img/icon/${item.icon}`} alt="" />
                      </div>
                      <div className="media-body">
                        <p className="contact-feature_label">{item.label}</p>
                        {item.lines.map((line, j) => (
                          <span
                            key={j}
                            className="contact-feature_link d-block">
                            {line}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social */}
                <div className="th-social mt-30">
                  {[
                    { icon: "fa-facebook-f", href: "https://facebook.com" },
                    { icon: "fa-instagram", href: "https://instagram.com" },
                    { icon: "fa-whatsapp", href: "https://wa.me" },
                    { icon: "fa-linkedin-in", href: "https://linkedin.com" },
                  ].map(({ icon, href }) => (
                    <a
                      key={icon}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer">
                      <i className={`fab ${icon}`} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="col-xl-6">
              <div className="contact-form-v2 contact-page-form">
                <h2 className="title mt-n3 fw-semibold mb-30">
                  {t("contact.title")}!
                </h2>

                {status === "success" && (
                  <div
                    style={{
                      background: "#d4edda",
                      color: "#155724",
                      borderRadius: 8,
                      padding: "14px 20px",
                      marginBottom: 20,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}>
                    <i className="far fa-check-circle" /> {t("contact.success")}
                  </div>
                )}
                {status === "error" && (
                  <div
                    style={{
                      background: "#f8d7da",
                      color: "#721c24",
                      borderRadius: 8,
                      padding: "14px 20px",
                      marginBottom: 20,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}>
                    <i className="far fa-exclamation-circle" />{" "}
                    {t("contact.error")}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="row">
                    {/* Name */}
                    <div className="form-group col-md-6">
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className={ic("name")}
                        placeholder={t("contact.name")}
                      />
                      <i className="fal fa-user" />
                      {errors.name && (
                        <div
                          className="invalid-feedback"
                          style={{ display: "block" }}>
                          {errors.name}
                        </div>
                      )}
                    </div>
                    {/* Email */}
                    <div className="form-group col-md-6">
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className={ic("email")}
                        placeholder={t("contact.email")}
                      />
                      <i className="fal fa-envelope" />
                      {errors.email && (
                        <div
                          className="invalid-feedback"
                          style={{ display: "block" }}>
                          {errors.email}
                        </div>
                      )}
                    </div>
                    {/* Service */}
                    <div className="form-group col-md-12 style-border">
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="form-select">
                        <option value="">{t("contact.service")}</option>
                        <option value="Order Inquiry">Order Inquiry</option>
                        <option value="B2B / Wholesale">B2B / Wholesale</option>
                        <option value="Gift Packaging">Gift Packaging</option>
                        <option value="Shipping Info">Shipping Info</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>
                    {/* Message */}
                    <div className="col-12 form-group">
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        className={ic("message")}
                        placeholder={t("contact.message")}
                      />
                      <i className="fal fa-pencil" />
                      {errors.message && (
                        <div
                          className="invalid-feedback"
                          style={{ display: "block" }}>
                          {errors.message}
                        </div>
                      )}
                    </div>
                    {/* Submit */}
                    <div className="form-btn col-12">
                      <button
                        className="th-btn style2 style-radius"
                        type="submit"
                        disabled={status === "sending"}>
                        {status === "sending" ?
                          <>
                            <i
                              className="far fa-spinner fa-spin"
                              style={{ marginRight: 8 }}
                            />
                            {t("contact.sending")}
                          </>
                        : t("contact.send")}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <section
        className="restaurant-location-sec-1 overflow-hidden"
        id="restaurant-location-sec">
        <div className="container">
          <div className="row gy-4 justify-content-center">
            <div className="col-xl-6">
              <div className="title-area location-content">
                <span className="sub-title style-2 text-anime-style-1">
                  {t("contact.locationSub")}
                </span>
                <h2 className="sec-title text-anime-style-2">
                  {t("contact.location")}
                </h2>
                <p className="box-text pe-xxl-5 ps-xxl-5 text-anime-style-3">
                  {t("contact.description")}
                </p>
                <div className="line" />
                <div className="opening wow fadeinup" data-wow-delay=".3s">
                  <p>{t("contact.hoursLine1")}</p>
                  <p>{t("contact.hoursLine2")}</p>
                </div>
                <div className="th-social wow fadeinup" data-wow-delay=".5s">
                  {[
                    { icon: "fa-facebook-f", href: "https://facebook.com" },
                    { icon: "fa-instagram", href: "https://instagram.com" },
                    { icon: "fa-whatsapp", href: "https://wa.me/966537351609" },
                    { icon: "fa-linkedin-in", href: "https://linkedin.com" },
                  ].map(({ icon, href }) => (
                    <a
                      key={icon}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer">
                      <i className={`fab ${icon}`} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="map-location">
                {" "}
                <iframe
                  src="https://www.google.com/maps?q=26.297895677019007,43.87566777541837&z=13&output=embed"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer locale={locale} />
    </>
  );
}
