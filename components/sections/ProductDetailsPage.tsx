"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { type Locale } from "@/lib/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import NavLink from "@/components/ui/NavLink";

/* ── product images per index (4 images each) ── */
const PRODUCT_IMAGES: Record<number, string[]> = {
  0: ["AJWA.png", "date-1.png", "date-2.png", "date-3.png"],
  1: ["medjool.png", "date-2.png", "date-3.png", "date-4.png"],
  2: ["SAFAWI.png", "date-3.png", "date-4.png", "date-5.png"],
  3: ["BARNI.png", "date-4.png", "date-5.png", "date-6.png"],
  4: ["MABROOM.png", "date-5.png", "date-6.png", "date-7.png"],
  5: ["SAGAI.png", "date-6.png", "date-7.png", "date-8.png"],
  6: ["date-7.png", "date-8.png", "date-1.png", "date-2.png"],
  7: ["RUTAB.png", "date-8.png", "date-1.png", "date-2.png"],
  8: ["Maftel.png", "date-1.png", "date-2.png", "date-3.png"],
};

/* ── form field type ── */
interface OrderForm {
  name: string;
  email: string;
  phone: string;
  country: string;
  dateType: string;
  quantity: string;
  message: string;
}

const EMPTY_FORM: OrderForm = {
  name: "",
  email: "",
  phone: "",
  country: "",
  dateType: "",
  quantity: "",
  message: "",
};

/* ─────────────────────────────────────────── */
export default function ProductDetailsPage({
  locale,
  productId,
}: {
  locale: Locale;
  productId: number;
}) {
  const t = useTranslations();
  const l = (p: string) => `/${locale}/${p}`;
  const products = t.raw("products.items") as any[];
  const product = products[productId] ?? products[0];

  /* ── image gallery state ── */
  const images = PRODUCT_IMAGES[productId] ?? PRODUCT_IMAGES[0];
  const [activeImg, setActiveImg] = useState(0);

  /* ── tab state (fixes the first-load bug) ── */
  const [activeTab, setActiveTab] = useState<"order" | "description">("order");

  /* ── order form state ── */
  const [form, setForm] = useState<OrderForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<OrderForm>>({});
  const [submitState, setSubmitState] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const formRef = useRef<HTMLFormElement>(null);

  /* ── validation ── */
  const validate = (): boolean => {
    const e: Partial<OrderForm> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email address";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^\+?[\d\s\-()]{7,20}$/.test(form.phone))
      e.phone = "Invalid phone number";
    if (!form.country.trim()) e.country = "Country is required";
    if (!form.dateType) e.dateType = "Please select a date type";
    if (!form.quantity) e.quantity = "Please select a quantity";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof OrderForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitState("sending");

    try {
      /* ── EmailJS integration ──
         Replace these with your actual EmailJS credentials:
         - SERVICE_ID  → your EmailJS service ID
         - TEMPLATE_ID → your EmailJS template ID
         - PUBLIC_KEY  → your EmailJS public key
      ── */
      const emailjs = (window as any).emailjs;
      if (emailjs) {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
          process.env.NEXT_PUBLIC_EMAILJS_ORDER_TEMPLATE_ID ||
            "YOUR_TEMPLATE_ID",
          {
            from_name: form.name,
            from_email: form.email,
            phone: form.phone,
            country: form.country,
            date_type: form.dateType,
            quantity: form.quantity,
            packaging: "-",
            delivery: "-",
            message: form.message,
            product_name: product.name,
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY",
        );
        setSubmitState("success");
        setForm(EMPTY_FORM);
      } else {
        // EmailJS not loaded yet — simulate success for testing
        await new Promise((r) => setTimeout(r, 800));
        setSubmitState("success");
        setForm(EMPTY_FORM);
      }
    } catch {
      setSubmitState("error");
    }
  };

  const inputClass = (field: keyof OrderForm) =>
    `form-control${errors[field] ? " is-invalid" : ""}`;

  return (
    <>
      <Header locale={locale} />
      <Breadcrumb
        title={t("productDetails.breadcrumb")}
        homeLabel={t("productDetails.home")}
        homeHref={`/${locale}`}
        current={product.name}
      />

      <section className="space">
        <div className="container">
          <div className="row gy-40">
            {/* ── Image Gallery ── */}
            <div className="col-lg-6">
              <div className="product-img-tab">
                {/* Main large image */}
                <div
                  className="product-big-img"
                  style={{
                    borderRadius: 12,
                    overflow: "hidden",
                    background: "#f8f5f0",
                    marginBottom: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 380,
                  }}>
                  <img
                    src={`/assets/img/product/${images[activeImg]}`}
                    alt={product.name}
                    style={{
                      maxHeight: 380,
                      objectFit: "contain",
                      width: "100%",
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `/assets/img/product/date-${(productId % 8) + 1}.png`;
                    }}
                  />
                </div>

                {/* Thumbnail row */}
                <div style={{ display: "flex", gap: 10 }}>
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      style={{
                        flex: 1,
                        aspectRatio: "1/1",
                        borderRadius: 8,
                        overflow: "hidden",
                        border:
                          activeImg === i ?
                            "2.5px solid #ead369"
                          : "2px solid transparent",
                        background: "#f8f5f0",
                        cursor: "pointer",
                        padding: 0,
                        transition: "border-color .2s, transform .2s",
                        transform: activeImg === i ? "scale(1.05)" : "scale(1)",
                      }}>
                      <img
                        src={`/assets/img/product/${img}`}
                        alt={`${product.name} ${i + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            `/assets/img/product/date-${(i % 8) + 1}.png`;
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Product Info ── */}
            <div className="col-lg-6">
              <div className="product-details-content">
                {product.badge && (
                  <span
                    style={{
                      display: "inline-block",
                      background: "#ead369",
                      color: "#1a1a1a",
                      fontSize: ".65rem",
                      fontWeight: 700,
                      padding: "4px 12px",
                      borderRadius: 4,
                      letterSpacing: ".08em",
                      marginBottom: 12,
                    }}>
                    {product.badge}
                  </span>
                )}

                <h2
                  className="box-title"
                  style={{ fontSize: "2rem", marginBottom: 8 }}>
                  {product.name}
                </h2>

                <div className="product-rating" style={{ marginBottom: 12 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <i
                      key={s}
                      className="fa-solid fa-star"
                      style={{ color: "#ead369", fontSize: ".85rem" }}
                    />
                  ))}
                  <span
                    className="count"
                    style={{ marginLeft: 8, fontSize: ".8rem", color: "#888" }}>
                    {t("productDetails.rating")}
                  </span>
                </div>

                <p className="box-text" style={{ marginBottom: 20 }}>
                  {product.desc}
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px 24px",
                    marginBottom: 24,
                    padding: "16px 20px",
                    background: "#f8f5f0",
                    borderRadius: 10,
                  }}>
                  {[
                    {
                      label: t("productDetails.origin"),
                      value: product.origin,
                    },
                    {
                      label: t("productDetails.weight"),
                      value: product.weight,
                    },
                    { label: t("productDetails.price"), value: product.price },
                    {
                      label: t("productDetails.availability"),
                      value: t("productDetails.inStock"),
                    },
                  ].map((item) => (
                    <div key={item.label}>
                      <p
                        style={{
                          fontSize: ".72rem",
                          fontWeight: 700,
                          color: "#9c704e",
                          marginBottom: 2,
                          textTransform: "uppercase",
                          letterSpacing: ".06em",
                        }}>
                        {item.label}
                      </p>
                      <p
                        style={{
                          fontSize: ".9rem",
                          fontWeight: 600,
                          color: "#1a1a1a",
                          margin: 0,
                        }}>
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <NavLink
                  href={l("shop")}
                  className="th-btn btn-border style-radius">
                  Back to Products
                </NavLink>
              </div>
            </div>
          </div>

          {/* ── Tabs ── */}
          <div className="row mt-60">
            <div className="col-12">
              {/* Tab buttons */}
              <ul
                className="nav product-tab-style1"
                role="tablist"
                style={{ gap: 8 }}>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link th-btn btn-mask style4${activeTab === "order" ? " active" : ""}`}
                    onClick={() => setActiveTab("order")}
                    type="button"
                    role="tab"
                    style={{ border: "none" }}>
                    {t("productDetails.orderTab")}
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link th-btn btn-mask style4${activeTab === "description" ? " active" : ""}`}
                    onClick={() => setActiveTab("description")}
                    type="button"
                    role="tab"
                    style={{ border: "none" }}>
                    {t("productDetails.descriptionTab")}
                  </button>
                </li>
              </ul>

              {/* Tab content */}
              <div className="tab-content mt-30">
                {/* Order tab */}
                {activeTab === "order" && (
                  <div role="tabpanel">
                    <div className="row gy-30 justify-content-center">
                      <div className="contact-form-v2 contact-page-form col-md-10">
                        <h2 className="title mt-n3 fw-semibold mb-30 text-center">
                          {t("productDetails.orderTitle")}
                        </h2>

                        {submitState === "success" && (
                          <div
                            className="alert"
                            style={{
                              background: "#d4edda",
                              color: "#155724",
                              borderRadius: 8,
                              padding: "14px 20px",
                              marginBottom: 20,
                            }}>
                            <i
                              className="far fa-check-circle"
                              style={{ marginRight: 8 }}
                            />
                            {t("productDetails.success")}
                          </div>
                        )}
                        {submitState === "error" && (
                          <div
                            className="alert"
                            style={{
                              background: "#f8d7da",
                              color: "#721c24",
                              borderRadius: 8,
                              padding: "14px 20px",
                              marginBottom: 20,
                            }}>
                            <i
                              className="far fa-exclamation-circle"
                              style={{ marginRight: 8 }}
                            />
                            {t("productDetails.error")}
                          </div>
                        )}

                        <form ref={formRef} onSubmit={handleSubmit} noValidate>
                          <div className="row">
                            {/* Name */}
                            <div className="form-group col-md-6">
                              <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className={inputClass("name")}
                                placeholder={t("productDetails.name")}
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
                                className={inputClass("email")}
                                placeholder={t("productDetails.email")}
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
                            {/* Phone */}
                            <div className="form-group col-md-6">
                              <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                className={inputClass("phone")}
                                placeholder={t("productDetails.phone")}
                              />
                              <i className="fal fa-phone" />
                              {errors.phone && (
                                <div
                                  className="invalid-feedback"
                                  style={{ display: "block" }}>
                                  {errors.phone}
                                </div>
                              )}
                            </div>
                            {/* Country */}
                            <div className="form-group col-md-6">
                              <input
                                type="text"
                                name="country"
                                value={form.country}
                                onChange={handleChange}
                                className={inputClass("country")}
                                placeholder={t("productDetails.country")}
                              />
                              <i className="fal fa-globe" />
                              {errors.country && (
                                <div
                                  className="invalid-feedback"
                                  style={{ display: "block" }}>
                                  {errors.country}
                                </div>
                              )}
                            </div>
                            {/* Date type */}
                            <div
                              className={`form-group col-md-6 style-border${errors.dateType ? " is-invalid-wrap" : ""}`}>
                              <select
                                name="dateType"
                                value={form.dateType}
                                onChange={handleChange}
                                className={`form-select${errors.dateType ? " is-invalid" : ""}`}>
                                <option value="">
                                  {t("productDetails.dateType")}
                                </option>
                                {(t.raw("products.items") as any[]).map(
                                  (p: any) => (
                                    <option key={p.name} value={p.name}>
                                      {p.name}
                                    </option>
                                  ),
                                )}
                              </select>
                              {errors.dateType && (
                                <div
                                  className="invalid-feedback"
                                  style={{ display: "block" }}>
                                  {errors.dateType}
                                </div>
                              )}
                            </div>
                            {/* Quantity */}
                            <div
                              className={`form-group col-md-6 style-border${errors.quantity ? " is-invalid-wrap" : ""}`}>
                              <select
                                name="quantity"
                                value={form.quantity}
                                onChange={handleChange}
                                className={`form-select${errors.quantity ? " is-invalid" : ""}`}>
                                <option value="">
                                  {t("productDetails.quantity")}
                                </option>
                                <option value="20kg">
                                  {t("productDetails.qty20")}
                                </option>
                                <option value="50kg">
                                  {t("productDetails.qty50")}
                                </option>
                                <option value="100kg+">
                                  {t("productDetails.qty100")}
                                </option>
                              </select>
                              {errors.quantity && (
                                <div
                                  className="invalid-feedback"
                                  style={{ display: "block" }}>
                                  {errors.quantity}
                                </div>
                              )}
                            </div>
                            {/* Message */}
                            <div className="col-12 form-group">
                              <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder={t("productDetails.message")}
                                className="form-control"
                                rows={4}
                              />
                              <i className="fal fa-pencil" />
                            </div>
                            {/* Submit */}
                            <div className="form-btn col-12 justify-content-center d-flex">
                              <button
                                className="th-btn style2 style-radius"
                                type="submit"
                                disabled={submitState === "sending"}>
                                {submitState === "sending" ?
                                  <>
                                    <i
                                      className="far fa-spinner fa-spin"
                                      style={{ marginRight: 8 }}
                                    />
                                    {t("productDetails.sending")}
                                  </>
                                : t("productDetails.send")}
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
                {/* Description tab */}
                {activeTab === "description" && (
                  <div role="tabpanel">
                    <div className="row">
                      <div className="col-md-8">
                        <h4
                          className="box-title mb-20"
                          style={{ fontSize: "1.3rem" }}>
                          About {product.name}
                        </h4>
                        <p className="box-text mb-20">{product.desc}</p>
                        {product.origin && (
                          <p className="box-text mb-10">
                            <strong>Origin:</strong> {product.origin}
                          </p>
                        )}
                        {product.weight && (
                          <p className="box-text mb-10">
                            <strong>Available Weights:</strong> {product.weight}
                          </p>
                        )}
                        <p className="box-text mb-10">
                          <strong>Price:</strong> {product.price}
                        </p>
                        <div
                          style={{
                            marginTop: 20,
                            padding: "16px 20px",
                            background: "#f8f5f0",
                            borderRadius: 10,
                            borderLeft: "4px solid #ead369",
                          }}>
                          <p
                            className="box-text"
                            style={{ margin: 0, fontStyle: "italic" }}>
                            All Tibra dates are 100% natural, carefully
                            handpicked at peak ripeness and packed in premium
                            eco-friendly packaging.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Related Products ── */}
          <div className="row mt-60">
            <div className="col-12">
              <h3 className="box-title mb-40">Related Products</h3>
              <div className="row gy-30">
                {products
                  .filter((_, i) => i !== productId)
                  .slice(0, 4)
                  .map((p: any, i: number) => {
                    const idx = products.findIndex((x) => x.name === p.name);
                    return (
                      <div key={i} className="col-xl-3 col-md-6">
                        <div className="th-product product-grid">
                          <div className="product-img">
                            <img
                              src={`/assets/img/product/date-${(idx % 8) + 1}.png`}
                              alt={p.name}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  `/assets/img/product/date-1.png`;
                              }}
                            />
                            {p.badge && (
                              <span
                                style={{
                                  position: "absolute",
                                  top: 12,
                                  right: 12,
                                  background: "#ead369",
                                  color: "#1a1a1a",
                                  fontSize: ".65rem",
                                  fontWeight: 700,
                                  padding: "3px 10px",
                                  borderRadius: 3,
                                }}>
                                {p.badge}
                              </span>
                            )}
                          </div>
                          <div className="product-content">
                            <p
                              style={{
                                fontSize: ".72rem",
                                color: "#9c704e",
                                marginBottom: 4,
                                fontWeight: 600,
                              }}>
                              {p.origin}
                            </p>
                            <h3 className="product-title">
                              <NavLink href={`/${locale}/products/${idx}`}>
                                {p.name}
                              </NavLink>
                            </h3>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}>
                              <span
                                className="price"
                                style={{ fontWeight: 800 }}>
                                {p.price}
                              </span>
                              <span
                                style={{ fontSize: ".72rem", color: "#666" }}>
                                {p.weight}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer locale={locale} />
    </>
  );
}
