"use client";

import { useTranslations } from "next-intl";
import NavLink from "@/components/ui/NavLink";
import { type Locale } from "@/lib/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function ShopDetailsPage({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const l = (p: string) => `/${locale}/${p}`;
  return (
    <>
      <Header locale={locale} />
      <Breadcrumb
        title={t("shopDetails.breadcrumb")}
        homeLabel={t("shopDetails.home")}
        homeHref={`/${locale}`}
        current={t("shopDetails.breadcrumb")}
      />
      <section className="space">
        <div className="container">
          <div className="row gy-40">
            <div className="col-lg-6">
              <div className="product-img-tab">
                <div className="product-big-img">
                  <img
                    src="/assets/img/product/product_1_1.png"
                    alt="Product"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="product-details-content">
                <h2 className="box-title">Lorem, ipsum dolor.</h2>
                <div className="product-rating">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <i key={s} className="fa-solid fa-star" />
                  ))}
                  <span className="count">(24 Reviews)</span>
                </div>

                <p className="box-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                  consequuntur consequatur cumque expedita impedit dolorem
                  provident porro eligendi error reprehenderit! Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Soluta ex sunt
                  quisquam quia provident facere tempora voluptates. Quis, neque
                  iure!
                </p>
                <div
                  className="price-wrap"
                  style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                  <span className="price">
                    {" "}
                    <strong>$39.85</strong>
                  </span>
                </div>
                <div
                  className="product-meta"
                  style={{
                    paddingTop: "20px",
                    marginTop: "10px",
                    borderTop: "1px gray solid",
                  }}>
                  <p>
                    <strong>Category:</strong> Lorem, ipsum dolor.
                  </p>
                  <p>
                    <strong>Tags:</strong> Lorem, ipsum dolor.
                  </p>
                  <p>
                    <strong>Availability:</strong> In Stock
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="row mt-60">
            <div className="col-12">
              <ul
                className="nav product-tab-style1"
                id="productTab"
                role="tablist">
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link th-btn btn-mask style4"
                    data-bs-toggle="tab"
                    href="#reviews"
                    role="tab">
                    Order
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link th-btn btn-mask style4 active"
                    data-bs-toggle="tab"
                    href="#description"
                    role="tab">
                    Product Description
                  </a>
                </li>
              </ul>
              <div className="tab-content mt-30" id="productTabContent">
                <div
                  className="tab-pane fade show active"
                  id="reviews"
                  role="tabpanel">
                  <div className="row gy-30 justify-content-center">
                    <div className="contact-form-v2 contact-page-form col-md-10">
                      <h2 className="title mt-n3 fw-semibold mb-30 text-center">
                        Make Your Order Now!
                      </h2>
                      <form
                        action="/api/contact"
                        method="POST"
                        className="contact-form ajax-contact">
                        <div className="row">
                          <div className="form-group col-md-6">
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              id="name"
                              placeholder="Your Name"
                            />
                            <i className="fal fa-user" />
                          </div>
                          <div className="form-group col-md-6">
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              id="email"
                              placeholder="Your Email"
                            />
                            <i className="fal fa-envelope" />
                          </div>
                          <div className="form-group col-md-6">
                            <input
                              type="phone"
                              className="form-control"
                              name="phone"
                              id="phone"
                              placeholder="Your Phone Number"
                            />
                            <i className="fal fa-phone" />
                          </div>
                          <div className="form-group col-md-6">
                            <input
                              type="country"
                              className="form-control"
                              name="country"
                              id="country"
                              placeholder="Your Country"
                            />
                            <i className="fal fa-globe" />
                          </div>
                          <div className="form-group col-md-6 style-border">
                            <select
                              name="subject"
                              id="subject"
                              className="form-select">
                              <option value="Select Type Of Dates">
                                Select Type Of Dates
                              </option>
                              <option value="Ajwa">Ajwa</option>
                              <option value="Medjool">Medjool</option>
                              <option value="Mftel">Mftel</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div className="form-group col-md-6 style-border">
                            <select
                              name="subject"
                              id="subject"
                              className="form-select">
                              <option value="Quantity">Quantity</option>
                              <option value="20 Kg">20 Kg</option>
                              <option value="50 Kg">50 Kg</option>
                              <option value="more than 100 Kg">
                                {" "}
                                more than 100 Kg
                              </option>
                            </select>
                          </div>
                          <div className="col-12 form-group">
                            <textarea
                              placeholder="Write Message...."
                              className="form-control"
                            />
                            <i className="fal fa-pencil" />
                          </div>
                          <div className="form-btn col-12 justify-content-center d-flex">
                            <button
                              className="th-btn style2 style-radius"
                              type="submit">
                              SEND ORDER
                            </button>
                          </div>
                        </div>
                        <p className="form-messages mb-0 mt-3" />
                      </form>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade "
                  id="description"
                  role="tabpanel">
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Animi cupiditate facilis voluptate blanditiis voluptatum
                    numquam dolores sunt libero saepe aspernatur fuga dolorum,
                    ipsum eveniet quidem assumenda, officia, fugiat corporis
                    eos?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer locale={locale} />
    </>
  );
}
