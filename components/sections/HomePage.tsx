"use client";

import { useTranslations } from "next-intl";
import NavLink from "@/components/ui/NavLink";
import { type Locale } from "@/lib/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function HomePage({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const l = (path: string) => `/${locale}/${path}`;
  const testimonials = t.raw("testimonials.items") as any[];
  const historyItems = t.raw("about.history") as any[];
  const blogPosts = t.raw("blog.posts") as any[];

  return (
    <>
      <Header locale={locale} />
      {/* ── Hero ── */}
      <div className="th-hero-wrapper hero-1 bg-smoke" id="hero">
        <div
          className="shape-mockup d-none d-xl-block movingX"
          data-top="0%"
          data-right="5%">
          <img src="/assets/img/icon/hero-1-1.png" alt="img" />
        </div>
        <div
          className="shape-mockup hero-shape-1-2 gsap-scroll-rotate"
          data-top="14%"
          data-left="1%">
          <img src="/assets/img/icon/hero_dates.png" alt="img" />
        </div>
        <div
          className="shape-mockup jump-reverse hero-shape-1-3"
          data-top="13%"
          data-right="2%">
          <img src="/assets/img/icon/dates-fruit.png" alt="img" />
        </div>
        <div className="shape-mockup movingX" data-bottom="0%" data-left="5%">
          <img src="/assets/img/icon/hero-1-4.png" alt="img" />
        </div>
        <div
          className="shape-mockup jump hero-shape-1-5"
          data-bottom="0%"
          data-right="0%">
          <img src="/assets/img/icon/wing_icon.png" alt="img" />
        </div>

        <div className="hero-inner">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-8 col-lg-10">
                <div className="hero-style1">
                  <style>{`
                    .hero-subtitle-top { font-size: clamp(1.4rem, 4vw, 3rem); }
                    .hero-subtitle-bot { font-size: clamp(1.2rem, 3.5vw, 2.8rem);  }
                    .hero-img1 img { max-width: min(420px, 90vw); margin: 0 auto; display: block; }
                    .hero-btns { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; margin-top: 24px; }
                  `}</style>
                  <h3 className="subtitle gsap-scale-down-fade hero-subtitle-top">
                    {t("hero.subtitle")}
                  </h3>
                  <h1
                    className="hero-title text-anime-style-2"
                    style={{ color: "rgb(231,197,8)" }}>
                    {t("hero.title")}
                  </h1>
                  <h3 className="subtitle gsap-scale-up-fade hero-subtitle-bot">
                    {t("hero.titleHighlight")}
                  </h3>
                  <div className="hero-img1 gsap-scale-up-fade">
                    <img
                      src="/assets/img/hero/hero-t.png"
                      alt="Tibra Premium Dates"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Category ── */}
      <section className="space overflow-hidden space-extra-bottom">
        <div className="container">
          <div className="title-area text-center mb-60">
            <span className="sub-title text-anime-style-1">
              {t("products.subtitle")}
            </span>
            <h2 className="sec-title text-anime-style-2">
              {t("products.title")}
              <span className="text-theme" style={{ paddingLeft: "5px" }}>
                {t("products.titleHighlight")}
              </span>
            </h2>
            <img
              className="img-anime-style-1"
              src="/assets/img/icon/title-shape.png"
              alt="img"
            />
          </div>
          <div className="slider-area">
            <div
              className="swiper th-slider"
              id="catSlider1"
              data-slider-options='{"autoplay":true,"loop":true,"breakpoints":{"0":{"slidesPerView":1},"400":{"slidesPerView":"2"},"768":{"slidesPerView":"3"},"992":{"slidesPerView":"4"},"1200":{"slidesPerView":"5"},"1400":{"slidesPerView":"6"}}}'>
              <div className="swiper-wrapper">
                {[
                  {
                    img: "AJWA_date.png",
                    name: "AJWA Dates",
                    count: "25 Items Available",
                  },
                  {
                    img: "BARNI.png",
                    name: "BARNI Dates",
                    count: "22 Items Available",
                  },
                  {
                    img: "KHUDRI.png",
                    name: "KHUDRI Dates",
                    count: "23 Items Available",
                  },
                  {
                    img: "MABROOM.png",
                    name: "MABROOM Dates",
                    count: "22 Items Available",
                  },
                  {
                    img: "medjool.png",
                    name: "Medjool Dates",
                    count: "20 Items Available",
                  },
                  {
                    img: "Mftel.png",
                    name: "Mftel Dates",
                    count: "25 Items Available",
                  },
                  {
                    img: "RUTAB_date.png",
                    name: "RUTAB Dates",
                    count: "22 Items Available",
                  },
                  {
                    img: "SAFAWI.png",
                    name: "SAFAWI Dates",
                    count: "23 Items Available",
                  },
                  {
                    img: "SAGAI.png",
                    name: "SAGAI Dates",
                    count: "22 Items Available",
                  },
                ].map((item, i) => (
                  <div key={i} className="swiper-slide">
                    <NavLink
                      href={`/${locale}/products/${i}`}
                      style={{ textDecoration: "none" }}>
                      <div className="category-card">
                        <img
                          className="cat-i-bottom"
                          src="/assets/img/icon/cat-1-bottom.png"
                          alt="img"
                        />
                        <div className="box-icon">
                          <img
                            src={`/assets/img/category/${item.img}`}
                            alt="Image"
                          />
                        </div>
                        <h3 className="box-title">{item.name}</h3>
                        <p className="box-subtitle">{item.count}</p>
                      </div>
                    </NavLink>
                  </div>
                ))}
              </div>
            </div>
            <button
              data-slider-prev="#catSlider1"
              className="slider-arrow slider-prev">
              <img src="/assets/img/icon/left-arrow.svg" alt="" />
            </button>
            <button
              data-slider-next="#catSlider1"
              className="slider-arrow slider-next">
              <img src="/assets/img/icon/right-arrow.svg" alt="" />
            </button>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <div
        className="overflow-hidden space-bottom overflow-hidden"
        id="about-sec">
        <div
          className="shape-mockup jump-reverse d-none d-xxl-block"
          data-top="10%"
          data-left="43%">
          <img src="/assets/img/shape/about-shape-1.2.png" alt="img" />
        </div>
        <div
          className="shape-mockup jump d-none d-xxl-block"
          data-bottom="15%"
          data-right="1%">
          <img src="/assets/img/shape/about-shape-1.2.png" alt="img" />
        </div>

        <div className="container">
          <div className="row gy-40 gx-80 align-items-center">
            <div className="col-xl-7 ps-xl-5">
              <div className="img-box1 ms-xl-2">
                <div className="img1 gsap-fade-left">
                  <img src="/assets/img/about/about_1.jpg" alt="About" />
                </div>
              </div>
            </div>
            <div className="col-xl-5">
              <div className="title-area mb-1">
                <span className="sub-title text-anime-style-1">
                  {t("about.subtitle")}
                </span>
                <h2 className="sec-title text-anime-style-2">
                  {t("about.title")}
                  <span className="text-theme">
                    {t("about.titleHighlight")}
                  </span>
                </h2>
                <p
                  className="box-text me-xl-5 pe-xl-3 wow fadeinup"
                  data-wow-delay=".3s">
                  {t("about.body1")}
                </p>
                <div
                  className="about-1-owner wow fadeinup"
                  data-wow-delay=".5s">
                  <h4 className="box-title">{t("about.owner")}</h4>
                  <p>{t("about.ownerTitle")}</p>
                </div>
                <NavLink
                  href={l("shop")}
                  className="th-btn btn-mask wow fadeinup"
                  data-wow-delay=".7s">
                  {t("about.cta")}
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Products Section ── */}
      <section className="food-sec-1 space bg-smoke overflow-hidden">
        <div className="container">
          <div className="row gy-40">
            <div className="title-area text-center mb-60">
              <span className="sub-title text-anime-style-1">
                {t("products.breadcrumb")}
              </span>
              <h2 className="sec-title text-anime-style-2">
                {t("products.subtitle")}
                <span className="text-theme" style={{ paddingLeft: "6px" }}>
                  {t("products.titleHighlight")}
                </span>
              </h2>
              <img
                className="img-anime-style-1"
                src="/assets/img/icon/title-shape.png"
                alt="img"
              />
            </div>
          </div>
          <div className="row gy-30">
            {[
              {
                img: "Ajwa dates.png",
                price: "$26.00",
                name: "Ajwa Jumbo dates ",
                delay: ".2s",
                anim: "fadeinleft",
                desc: "Ajwa Jumbo dates are a popular variety known for their soft texture",
              },
              {
                img: "Sugai_1.png",
                price: "$20.00",
                name: "Sugai dates",
                delay: ".4s",
                anim: "fadeinleft",
                desc: "Sugai dates are a type of premium date prized for their quality.",
              },
              {
                img: "Saudi Medjool.png",
                price: "$16.00",
                name: "Saudi Medjool dates",
                delay: ".6s",
                anim: "fadeinright",
                desc: "Medjool dates have a character all their own! ",
              },
              {
                img: "Mabroom.png",
                price: "$36.00",
                name: "Mabroom dates",
                delay: ".8s",
                anim: "fadeinright",
                desc: "Mabroom dates stand out for their shape and flavor.",
              },
              {
                img: "1.png",
                price: "$36.00",
                name: "Mabroom dates",
                delay: ".8s",
                anim: "fadeinright",
                desc: "Mabroom dates stand out for their shape and flavor.",
              },
              {
                img: "2.png",
                price: "$36.00",
                name: "Mabroom dates",
                delay: ".8s",
                anim: "fadeinright",
                desc: "Mabroom dates stand out for their shape and flavor.",
              },
              {
                img: "1.png",
                price: "$36.00",
                name: "Mabroom dates",
                delay: ".8s",
                anim: "fadeinright",
                desc: "Mabroom dates stand out for their shape and flavor.",
              },
              {
                img: "2.png",
                price: "$36.00",
                name: "Mabroom dates",
                delay: ".8s",
                anim: "fadeinright",
                desc: "Mabroom dates stand out for their shape and flavor.",
              },
            ].map((item, i) => (
              <div key={i} className="col-xl-3 col-lg-6 col-md-6">
                <div
                  className={`food-card-1 wow ${item.anim}`}
                  data-wow-delay={item.delay}>
                  <div className="thumb">
                    <div
                      className="food-mask"
                      data-mask-src="/assets/img/bg/menu-1-msk-bg.png"
                    />
                    <img src={`/assets/img/food/${item.img}`} alt="Image" />
                  </div>
                  <div className="content">
                    <h4 className="price">{item.price}</h4>
                    <h4 className="box-title">
                      <NavLink href={`/${locale}/products/${i}`}>
                        {item.name}
                      </NavLink>
                    </h4>
                    <p className="box-text">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── History ── */}
      <div className="history-sec1 bg-theme2 overflow-hidden" id="history-sec">
        <img
          className="round-shape-bottom"
          src="/assets/img/shape/shape-bottom.png"
          alt="img"
        />
        <div className="container">
          <div className="row gy-4 justify-content-center">
            <div className="col-lg-6">
              <div className="history-img">
                <img src="/assets/img/history/history.jpg" alt="img" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="history-content-wrap ps-xl-5">
                <div className="title-area mb-40">
                  <span className="sub-title text-anime-style-1">
                    {t("about.subtitle")}
                  </span>
                  <h2 className="sec-title text-anime-style-2 text-white">
                    {t("about.title")}
                  </h2>
                  <img
                    className="img-anime-style-1"
                    src="/assets/img/icon/title-shape2.png"
                    alt="img"
                  />
                </div>
                {historyItems.map((item, i) => (
                  <div
                    key={i}
                    className="history-box-1 wow fadeinup"
                    data-wow-delay={item.delay}>
                    <div className="content">
                      <h4 className="year">{item.year}</h4>
                      <h3 className="box-title">{item.title}</h3>

                      <p className="box-text pe-xxl-5 me-xl-5">{item.text}</p>
                    </div>
                    <div className="thumb global-img">
                      <img
                        src={`/assets/img/history/history-g-1-${i + 1}.jpg`}
                        alt="img"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Menu Card ── */}
      {/* <div className="menu-sec1 space-top overflow-hidden" id="menu-sec">
        <div className="container">
          <div className="title-area text-center mb-40">
            <span className="sub-title text-anime-style-1">Menu Card</span>
            <h2 className="sec-title text-anime-style-2">
              Our Fast Foods <span className="text-theme">Menu Card</span>
            </h2>
            <img
              className="img-anime-style-1"
              src="/assets/img/icon/title-shape.png"
              alt="img"
            />
          </div>
          <div className="row gy-4 justify-content-center">
            <div className="col-lg-3">
              <div className="menu-img-1-1 gsap-scroll-float-down2">
                <img src="/assets/img/menu/menu-1-1.jpg" alt="img" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="menu-1-content-wrap ps-xl-3 pe-xl-5">
                <ul
                  className="nav nav-tabs wow fadeinup"
                  id="myTab"
                  role="tablist">
                  {[
                    "Event Creating",
                    "Meal Plans",
                    "Food Delivery",
                    "Diet Plans",
                  ].map((tab, i) => (
                    <li key={i} className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${i === 0 ? "active" : ""}`}
                        id={`tab-${i}`}
                        data-bs-toggle="tab"
                        data-bs-target={`#tab-content-${i}`}
                        type="button"
                        role="tab">
                        {tab}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="tab-content" id="myTabContent">
                  {[0, 1, 2, 3].map((tabIdx) => (
                    <div
                      key={tabIdx}
                      className={`tab-pane fade ${tabIdx === 0 ? "show active" : ""}`}
                      id={`tab-content-${tabIdx}`}
                      role="tabpanel">
                      {[
                        {
                          img: "menu-1-item-1-1.jpg",
                          name: "Grilled Salmon with Dil Sauce",
                          price: 40,
                          delay: ".2s",
                        },
                        {
                          img: "menu-1-item-1-2.jpg",
                          name: "Roast Beef with Vegetable",
                          price: 60,
                          delay: ".3s",
                        },
                        {
                          img: "menu-1-item-1-3.jpg",
                          name: "Marrakesh Vegetarian Curry",
                          price: 30,
                          delay: ".4s",
                        },
                        {
                          img: "menu-1-item-1-4.jpg",
                          name: "Spicy Vegan Potato Curry",
                          price: 50,
                          delay: ".5s",
                        },
                        {
                          img: "menu-1-item-1-5.jpg",
                          name: "Apple Pie with Cream",
                          price: 80,
                          delay: ".6s",
                        },
                        {
                          img: "menu-1-item-1-6.jpg",
                          name: "French Onion Soup",
                          price: 28,
                          delay: ".7s",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="menu-item-1 wow fadeinup"
                          data-wow-delay={item.delay}>
                          <div
                            className="thumb global-img"
                            data-mask-src="/assets/img/bg/menu-1-msk-bg.jpg">
                            <img
                              src={`/assets/img/menu/${item.img}`}
                              alt="img"
                            />
                          </div>
                          <div className="content">
                            <div className="left">
                              <h3 className="box-title">
                                <NavLink href={l("shop-details")}>
                                  {item.name}
                                </NavLink>
                              </h3>
                              <p className="box-text">
                                Candied Jerusalem artichokes, truffle
                              </p>
                            </div>
                            <div className="right">
                              <h4 className="price">
                                <span>$</span> {item.price}
                              </h4>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="menu-img-1-2 gsap-scroll-float-up">
                <img src="/assets/img/menu/menu-1-2.jpg" alt="img" />
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* ── Gallery ── */}
      <div className="gallery-sec-1 space bg-smoke overflow-hidden">
        <div className="container">
          <div className="title-area secTitle-gsap-anim-1 text-center mb-60">
            <span className="sub-title text-anime-style-1">
              {t("gallery.subtitle")}
            </span>
            <h2 className="sec-title text-anime-style-2">
              {t("gallery.title")}
              <span className="text-theme" style={{ paddingLeft: "6px" }}>
                {t("gallery.titleHighlight")}
              </span>
            </h2>
            <img
              className="img-anime-style-1"
              src="/assets/img/icon/title-shape.png"
              alt="img"
            />
          </div>
          <div className="slider-area">
            <div
              className="slider-area-wrap"
              data-mask-src="/assets/img/bg/gallery-1-mask.png">
              <div
                className="swiper th-slider has-shadow gallery-1-slider"
                id="gallerySlider1"
                data-slider-options='{"breakpoints":{"0":{"slidesPerView":1},"576":{"slidesPerView":"1"},"768":{"slidesPerView":"1"},"992":{"slidesPerView":"2"},"1200":{"slidesPerView":"3"}},"loop":true,"autoHeight":"true"}'>
                <div className="swiper-wrapper">
                  {[1, 2, 3, 5, 7, 6].map((n, i) => (
                    <div key={i} className="swiper-slide">
                      <div className="gallery-thumb-1">
                        <img
                          src={`/assets/img/gallery/gallery-1-${n}.webp`}
                          alt="Gallery Image"
                        />
                        <a
                          href={`/assets/img/gallery/gallery-1-${n}.webp`}
                          className="gallery-btn popup-image">
                          <img src="/assets/img/icon/plus-icon.svg" alt="img" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button
              data-slider-prev="#gallerySlider1"
              className="slider-arrow slider-prev">
              <img src="/assets/img/icon/left-arrow.svg" alt="" />
            </button>
            <button
              data-slider-next="#gallerySlider1"
              className="slider-arrow slider-next">
              <img src="/assets/img/icon/right-arrow.svg" alt="" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Countdown Offer ── */}
      <section className="coming-soon-sec-1 bg-theme3 overflow-hidden">
        <img
          className="round-shape-top"
          src="/assets/img/shape/shape-top-smoke.png"
          alt="img"
        />
        <div className="container">
          <div className="row gy-40 align-items-center">
            <div className="col-xl-4 col-lg-4">
              <div className="coming-left">
                <img src="/assets/img/coming/coming-left-dates.png" alt="img" />
              </div>
            </div>
            <div className="col-xl-4 col-lg-4">
              <div className="coming-soon">
                <h5 className="coming-top-title text-anime-style-2">
                  {t("comingSoon.word_one")}
                  <span>{t("comingSoon.per")}</span>
                  {t("comingSoon.word_two")}
                </h5>
                <h2 className="coming-middle-title text-anime-style-1">
                  <span>{t("comingSoon.title-one")}</span>
                  {t("comingSoon.title-two")}
                </h2>
                <h2 className="coming-title text-anime-style-1">
                  {t("comingSoon.coming_title")}
                </h2>
                <div className="upcoming-counter-wrap">
                  <p className="box-text wow fadeinleft" data-wow-delay=".3s">
                    {t("comingSoon.offer")}
                  </p>
                  <ul
                    className="upcoming-counter counter-list"
                    data-offer-date="07/04/2026">
                    {["Days", "Hours", "Minutes", "Seconds"].map((unit, i) => (
                      <li
                        key={i}
                        className="wow fadeinup"
                        data-wow-delay={`.${i + 4}s`}>
                        <div
                          className={`${unit.toLowerCase().replace("s", "")} count-number`}>
                          10
                        </div>
                        <span className="count-name">{unit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4">
              <div className="coming-right wow fadeinright">
                <img src="/assets/img/coming/coming_right.png" alt="img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team / Chefs ── */}
      <section className="team-area-1 space-top">
        <div className="container z-index-common">
          <div className="title-area text-center mb-60">
            <span className="sub-title text-anime-style-1">
              {t("Team.titleHighlight")}
            </span>
            <h2 className="sec-title text-anime-style-2">
              {t("Team.subtitle")}
              <span className="text-theme">{t("Team.subtitle_team")}</span>
            </h2>
            <img
              className="img-anime-style-1"
              src="/assets/img/icon/title-shape.png"
              alt="img"
            />
          </div>
          <div className="row gy-40 team-1-nth">
            {[
              {
                img: "team-1.png",
                name: "Alina Morish",
                delay: ".2s",
                anim: "fadeinleft",
              },
              {
                img: "team-2.png",
                name: "Michel Clark",
                delay: ".4s",
                anim: "fadeinleft",
              },
              {
                img: "team-1.png",
                name: "Esa Elizabed",
                delay: ".6s",
                anim: "fadeinright",
              },
              {
                img: "team-2.png",
                name: "William Latham",
                delay: ".8s",
                anim: "fadeinright",
              },
            ].map((chef, i) => (
              <div key={i} className="col-xl-3 col-lg-6 col-md-6">
                <div
                  className={`th-team team-card wow ${chef.anim}`}
                  data-wow-delay={chef.delay}>
                  <div className="img-wrap">
                    <div className="team-img">
                      <img src={`/assets/img/team/${chef.img}`} alt="Team" />
                      <img
                        className="team-1-bg-shape"
                        src="/assets/img/bg/team-1-bg-shape.png"
                        alt=""
                      />
                    </div>
                    <div className="team-social-hover">
                      <div className="th-social">
                        <a target="_blank" href="https://twitter.com/">
                          <i className="fab fa-twitter" />
                        </a>
                        <a target="_blank" href="https://facebook.com/">
                          <i className="fab fa-facebook-f" />
                        </a>
                        <a target="_blank" href="https://instagram.com/">
                          <i className="fab fa-instagram" />
                        </a>
                        <a target="_blank" href="https://youtube.com/">
                          <i className="fab fa-youtube" />
                        </a>
                        <a target="_blank" href="https://whatsapp.com/">
                          <i className="fab fa-whatsapp" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="team-card-content">
                    <h3 className="box-title">
                      <NavLink href={l("team-details")}>{chef.name}</NavLink>
                    </h3>
                    <span className="team-desig">Expert CEO</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Opening Hours ── */}
      <section className="opening-sec-1 space overflow-hidden">
        <div className="container">
          <div
            className="opening-container-wrap"
            data-mask-src="/assets/img/bg/opening-bg-mask.png">
            <div className="row gy-40 align-items-center">
              <div className="col-xl-7">
                <div
                  className="opening-1-thumb"
                  data-mask-src="/assets/img/bg/opening-1-mask.png"
                  style={{ height: "589px" }}>
                  <div className="opening-1-video">
                    <video autoPlay loop muted className="play-btn popup-video">
                      <source
                        src="/assets/img/opening/dates.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </div>
                </div>
              </div>

              <div className="col-xl-5">
                <div className="opening-right">
                  <div className="title-area text-center mb-60">
                    <span className="sub-title text-anime-style-1">
                      Get IN Touch
                    </span>
                    <h2 className="sec-title text-anime-style-2 text-white">
                      We'd Love to Hear from You
                    </h2>
                    <img
                      className="img-anime-style-1"
                      src="/assets/img/icon/title-shape2.png"
                      alt="img"
                    />
                  </div>
                  <div className="title-a" style={{ textAlign: "center" }}>
                    <p className="box-text pe-xxl-5 ps-xxl-5 text-anime-style-3">
                      213 W Tomichi Ave, Gunnison, CO 81230, United States
                    </p>
                    <div className="line" />
                    <div className="opening wow fadeinup" data-wow-delay=".3s">
                      <p>Monday - Saturday: 6:00pm – 10:00pm</p>
                      <p>Sunday: is the holiday</p>
                    </div>
                    <div
                      className="th-social wow fadeinup"
                      data-wow-delay=".5s"
                      style={{ justifyContent: "center", marginTop: "20px" }}>
                      <a href="https://www.facebook.com/">
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a href="https://www.twitter.com/">
                        <i className="fab fa-twitter" />
                      </a>
                      <a href="https://www.linkedin.com/">
                        <i className="fab fa-linkedin-in" />
                      </a>
                      <a href="https://www.whatsapp.com/">
                        <i className="fab fa-whatsapp" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="bottom text-center mt-40 wow fadeinup"
                    data-wow-delay=".2s">
                    <NavLink
                      href={l("contact")}
                      className="th-btn btn-mask style5">
                      Contact Us
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section
        className="testi-area-1 space-bottom overflow-hidden"
        id="testi-sec">
        <div
          className="shape-mockup d-none d-xxl-block jump-reverse"
          style={{ top: "2%", left: "0%" }}>
          <img src="/assets/img/icon/hero_dates.png" alt="img" />
        </div>
        <div
          className="shape-mockup d-none d-xxl-block jump"
          style={{ top: "10%", right: "0%" }}>
          <img src="/assets/img/icon/progress-2-1.png" alt="img" />
        </div>
        <div
          className="shape-mockup d-none d-xxl-block jump"
          style={{ bottom: "2%", left: "0%" }}>
          <img src="/assets/img/icon/dates-fruit.png" alt="img" />
        </div>
        <div className="container">
          <div className="title-area text-center mb-60">
            <span className="sub-title text-anime-style-1">
              {t("testimonials.subtitle")}
            </span>
            <h2 className="sec-title text-anime-style-2">
              {t("testimonials.title")}
              <span className="text-theme">
                {t("testimonials.titleHighlight")}
              </span>
            </h2>
            <img
              className="img-anime-style-1"
              src="/assets/img/icon/title-shape.png"
              alt="img"
            />
          </div>
          <div className="row gy-40 gx-30">
            {testimonials.slice(0, 2).map((item: any, i: number) => (
              <div key={i} className="col-xl-6">
                <div
                  className={`testi-1-item wow ${i % 2 === 0 ? "fadeinleft" : "fadeinright"}`}
                  data-wow-delay=".3s">
                  <div className="client-thumb">
                    <img
                      src={`/assets/img/testimonial/team-1-1-${i + 1}.png`}
                      alt={item.name}
                    />
                  </div>
                  <div className="content">
                    <img
                      className="testi-1-quote"
                      src="/assets/img/icon/testi-1-quote.png"
                      alt="quote"
                    />
                    <p className="box-text">{item.text}</p>
                  </div>
                  <div className="bottom">
                    <h4 className="box-title">{item.name}</h4>
                    <p>{item.role}</p>
                    <div className="th-social">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <i
                          key={s}
                          className="fa-solid fa-star"
                          style={{ color: "#ead369" }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog ── */}
      <section className="space bg-smoke overflow-hidden" id="blog-sec">
        <div
          className="shape-mockup d-none d-xxl-block jump-reverse"
          style={{ top: "3%", left: "2%" }}>
          <img src="/assets/img/icon/blog-icon-1.png" alt="img" />
        </div>
        <div
          className="shape-mockup d-none d-xxl-block jump"
          style={{ top: "3%", right: "2%" }}>
          <img src="/assets/img/icon/blog-icon-2.png" alt="img" />
        </div>
        <div className="container">
          <div className="title-area text-center mb-50">
            <span className="sub-title text-anime-style-1">
              {t("blog.subtitle")}
            </span>
            <h2 className="sec-title text-anime-style-2">
              {t("blog.title")}
              <span className="text-theme">{t("blog.titleHighlight")}</span>
            </h2>
            <img
              className="img-anime-style-1"
              src="/assets/img/icon/title-shape.png"
              alt="shape"
            />
          </div>
          <div className="row gy-30">
            {blogPosts.slice(0, 3).map((post: any, i: number) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div
                  className="blog-card wow fadeinup"
                  data-wow-delay={`.${i * 2 + 2}s`}>
                  <div className="blog-img">
                    <NavLink href={`/${locale}/blog/${i % blogPosts.length}`}>
                      <img
                        src={`/assets/img/blog/blog-1-${i + 1}.jpg`}
                        alt={post.title}
                      />
                    </NavLink>
                  </div>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <NavLink className="author" href={l("blog")}>
                        <i className="fal fa-user" />
                        {t("blog.by")} {post.author}
                      </NavLink>
                      <NavLink href={l("blog")}>
                        <i className="fal fa-calendar" />
                        {post.date}
                      </NavLink>
                    </div>
                    <h3 className="box-title">
                      <NavLink href={`/${locale}/blog/${i % blogPosts.length}`}>
                        {post.title}
                      </NavLink>
                    </h3>
                    <p
                      className="box-text"
                      style={{ fontSize: ".82rem", marginBottom: 16 }}>
                      {post.excerpt}
                    </p>
                    <NavLink
                      href={`/${locale}/blog/${i % blogPosts.length}`}
                      className="th-btn btn-mask">
                      {t("blog.readMore")}
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Newsletter ── */}
      <section className="cta-area-1 bg-theme4 overflow-hidden">
        <div
          className="shape-mockup footer-bg-shape1-1 jump d-none d-xl-block"
          data-left="0"
          data-top="5%">
          <img src="/assets/img/icon/progress-2-1.png" alt="img" />
        </div>
        <img
          className="round-shape-top"
          src="/assets/img/shape/shape-top-smoke.png"
          alt="img"
        />
        <div className="cta-bg-1-1-wrap">
          <div className="cta-bg-1-1">
            <img src="/assets/img/bg/cta-bg-1-1.png" alt="img" />
          </div>
        </div>
        <div className="cta-1-shape-trangle" />
        <div className="cta-round-shape" />
        <div className="container z-index-common">
          <div className="row gy-30">
            <div className="col-xl-6 col-lg-6">
              <div className="cta-wrap1">
                <div className="title-area mb-0">
                  <h2 className="sec-title text-anime-style-1 text-white">
                    {t("site.tagline")} —{" "}
                    <span className="text-theme">
                      {t("hero.titleHighlight")}
                    </span>
                  </h2>
                  <p
                    className="mt-20 mb-20 text-white"
                    style={{ opacity: 0.8 }}>
                    {t("site.description")}
                  </p>
                  <NavLink
                    href={l("contact")}
                    className="th-btn btn-mask style4 mt-0">
                    {t("nav.contact")} →
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 align-self-end">
              <div className="cta-thumb1-1 text-center text-lg-end tilt-active wow fadeiright">
                <img src="/assets/img/cta/cta-img.png" alt="img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer locale={locale} />
    </>
  );
}
