"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import NavLink from "@/components/ui/NavLink";
import { type Locale } from "@/lib/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";

interface Comment {
  name: string;
  email: string;
  text: string;
  date: string;
}

const BLOG_TAGS: Record<number, string[]> = {
  0: ["Dates", "Premium", "Education"],
  1: ["Ajwa", "Heritage", "Health"],
  2: ["Gifting", "Ramadan", "Eid"],
  3: ["Health", "Nutrition", "Wellness"],
  4: ["Behind the Scenes", "Sourcing", "Quality"],
  5: ["Medjool", "Ajwa", "Comparison"],
};

const BLOG_CONTENT: Record<number, string[]> = {
  0: [
    "The world of premium dates is as diverse as it is delicious. From the iconic Medjool to the rare Rutab, each variety carries its own unique heritage, flavor profile, and nutritional character.",
    "At Tibra, we source 9 premium varieties from their native regions across the Arabian Peninsula and North Africa. Understanding the differences between them helps you choose the perfect dates for your table, your health, and your gifts.",
    "Ajwa dates from Madinah are perhaps the most revered — small, dark, and deeply rich in flavor, with centuries of Islamic tradition behind them. Medjool, the so-called 'King of Dates', impresses with its size, caramel-like sweetness and soft, melt-in-the-mouth texture.",
  ],
  1: [
    "Ajwa dates hold a unique and revered place in both Islamic tradition and modern nutritional science. Grown exclusively in the volcanic black soils of Madinah Al-Munawwarah, they are distinguished by their small size, dark almost-black color, and intensely rich flavor.",
    "From a nutritional standpoint, Ajwa dates are exceptionally rich in polyphenols, selenium, and various antioxidants — compounds linked to cardiovascular health and immune support. Studies have highlighted their potential as a natural food with remarkable protective properties.",
    "At Tibra, we source our Ajwa directly from verified farms in Madinah, ensuring every date meets our strict standards of size, moisture, and ripeness before reaching your hands.",
  ],
  2: [
    "Whether you are preparing for Ramadan, celebrating Eid, attending a wedding, or sourcing corporate gifts, a premium dates gift box is always an exceptional choice — thoughtful, culturally meaningful, and universally loved.",
    "The key to choosing the perfect gift box is matching the occasion and the recipient. For intimate family gifting, a curated selection of 3–4 varieties in a beautiful wooden box creates a luxurious experience. For corporate events, branded packaging with custom messaging elevates the gift further.",
    "Tibra offers premium gift packaging across all of our varieties, with options for custom branding available for bulk B2B orders. Our packaging is designed to impress at first glance and protect the dates throughout transit.",
  ],
  3: [
    "Nutritionists around the world increasingly recommend dates as part of a balanced daily diet — and for excellent reasons. A serving of 3–5 dates provides a powerful combination of natural energy, dietary fiber, and essential minerals.",
    "Dates are rich in potassium, which supports healthy blood pressure and heart function. They provide significant magnesium, linked to improved sleep and reduced inflammation. Their high fiber content promotes healthy digestion and sustained energy release — making them the ideal natural alternative to processed snacks.",
    "At Tibra, all our dates are 100% natural, free from preservatives and additives. They represent nature's most balanced energy food — nutritious, delicious, and deeply rooted in centuries of human tradition.",
  ],
  4: [
    "Every Tibra date begins its journey long before it reaches your hands. Our team travels directly to the source — premium farms across Saudi Arabia, Jordan, Libya and beyond — to personally select the finest dates of each season.",
    "The selection process is rigorous. We assess each variety for size uniformity, moisture content, natural sweetness, and freedom from blemishes. Only dates that meet every criterion make it into a Tibra box.",
    "Once selected, dates are packed in our premium eco-friendly packaging and shipped with care — temperature-controlled where necessary — to preserve that perfect freshness from farm to your door. This commitment to quality at every step is what sets Tibra apart.",
  ],
  5: [
    "Medjool and Ajwa are both considered among the world's finest dates, yet they are remarkably different in almost every characteristic — origin, appearance, taste, texture, and tradition.",
    "Medjool dates are large — often described as the 'King of Dates' — with a golden-brown color, a soft caramel-like flesh, and a natural sweetness that is rich yet not overwhelming. They are grown primarily in Jordan and Palestine, and are beloved worldwide for their impressive size and versatility.",
    "Ajwa dates, by contrast, are small and dark — almost black — with a drier, denser texture and a more complex, subtly spiced flavor. Their significance extends beyond taste: they are among the most revered dates in Islamic tradition, grown only in the blessed soils of Madinah.",
  ],
};

export default function BlogDetailsPage({
  locale,
  postId = 0,
}: {
  locale: Locale;
  postId?: number;
}) {
  const t = useTranslations();
  const l = (p: string) => `/${locale}/${p}`;
  const posts = t.raw("blog.posts") as any[];
  const post = posts[postId] ?? posts[0];

  /* ── comments ── */
  const [comments, setComments] = useState<Comment[]>([
    { name: "Mohamed Al-Rashid", email: "", text: "Excellent article! Very informative and well-written. I learned a lot about premium dates.", date: "March 20, 2025" },
    { name: "Sarah Johnson", email: "", text: "Love this content from Tibra. The quality of both the dates and the articles is outstanding.", date: "March 22, 2025" },
  ]);
  const [commentForm, setCommentForm] = useState({ name: "", email: "", text: "" });
  const [commentErrors, setCommentErrors] = useState<{ name?: string; email?: string; text?: string }>({});
  const [commentSuccess, setCommentSuccess] = useState(false);

  /* ── search ── */
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[] | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) { setSearchResults(null); return; }
    const q = searchQuery.toLowerCase();
    const results = posts.filter(
      (p: any) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q)
    );
    setSearchResults(results);
  };

  /* ── comment validation ── */
  const validateComment = () => {
    const e: typeof commentErrors = {};
    if (!commentForm.name.trim()) e.name = "Name is required";
    if (!commentForm.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(commentForm.email)) e.email = "Invalid email";
    if (!commentForm.text.trim()) e.text = "Comment is required";
    else if (commentForm.text.trim().length < 10) e.text = "Comment must be at least 10 characters";
    setCommentErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateComment()) return;
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    setComments((prev) => [...prev, { name: commentForm.name, email: commentForm.email, text: commentForm.text, date: dateStr }]);
    setCommentForm({ name: "", email: "", text: "" });
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 4000);
  };

  const bodyParagraphs = BLOG_CONTENT[postId] ?? BLOG_CONTENT[0];
  const tags = BLOG_TAGS[postId] ?? BLOG_TAGS[0];

  return (
    <>
      <Header locale={locale} />
      <Breadcrumb
        title={t("blogDetails.breadcrumb")}
        homeLabel={t("blogDetails.home")}
        homeHref={`/${locale}`}
        current={post.title}
      />
      <section className="space">
        <div className="container">
          <div className="row gy-40">
            {/* ── Main content ── */}
            <div className="col-lg-8">
              <div className="blog-details-content">
                <div className="blog-img" style={{ borderRadius: 12, overflow: "hidden" }}>
                  <img
                    src={`/assets/img/blog/blog_1_${(postId % 3) + 1}.jpg`}
                    alt={post.title}
                    style={{ width: "100%", objectFit: "cover" }}
                    onError={(e) => { (e.target as HTMLImageElement).src = "/assets/img/blog/blog_1_1.jpg"; }}
                  />
                </div>
                <div className="blog-meta mt-30 mb-20">
                  <NavLink className="author" href={l("blog")}>
                    <i className="fal fa-user" /> {t("blog.by")} {post.author}
                  </NavLink>
                  <NavLink href={l("blog")}>
                    <i className="fal fa-calendar" /> {post.date}
                  </NavLink>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: ".78rem", color: "#9c704e", fontWeight: 600 }}>
                    <i className="fal fa-tag" /> {post.tag}
                  </span>
                </div>

                <h2 className="box-title mb-20" style={{ lineHeight: 1.3 }}>{post.title}</h2>

                <p className="box-text mt-20" style={{ fontStyle: "italic", borderLeft: "3px solid #ead369", paddingLeft: 16 }}>
                  {post.excerpt}
                </p>

                {bodyParagraphs.map((p, i) => (
                  <p key={i} className="box-text mt-20">{p}</p>
                ))}

                <blockquote className="mt-30 mb-30">
                  <p>{bodyParagraphs[0]?.substring(0, 120)}...</p>
                </blockquote>

                <div className="blog-tags mt-40" style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <strong>Tags:</strong>
                  {tags.map((tag, i) => (
                    <NavLink key={i} href={l("blog")} className="tag-item"
                      style={{ display: "inline-block", padding: "4px 12px", background: "#f0ebe3", borderRadius: 4, fontSize: ".75rem", fontWeight: 600, color: "#1a1a1a", textDecoration: "none" }}>
                      {tag}
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* ── Comments ── */}
              <div className="comments-section mt-60">
                <h3 className="widget_title mb-30">{comments.length} Comments</h3>
                {comments.map((c, i) => (
                  <div key={i} className="comment-item mb-30" style={{ padding: "20px", background: "#f8f5f0", borderRadius: 10, borderLeft: "3px solid #ead369" }}>
                    <div className="d-flex gap-3">
                      <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#214137", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ color: "#ead369", fontWeight: 700, fontSize: "1.1rem" }}>
                          {c.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h5 className="box-title mb-1" style={{ fontSize: "1rem" }}>{c.name}</h5>
                        <small style={{ color: "#888", fontSize: ".75rem" }}>{c.date}</small>
                        <p className="box-text mt-2 mb-0">{c.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Comment form ── */}
              <div className="comment-form mt-40">
                <h3 className="widget_title mb-30">Leave a Comment</h3>
                {commentSuccess && (
                  <div style={{ background: "#d4edda", color: "#155724", padding: "12px 18px", borderRadius: 8, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                    <i className="far fa-check-circle" /> Your comment has been posted successfully!
                  </div>
                )}
                <form onSubmit={handleCommentSubmit} noValidate>
                  <div className="row gy-20">
                    <div className="form-group col-md-6">
                      <input
                        type="text"
                        className={`form-control${commentErrors.name ? " is-invalid" : ""}`}
                        placeholder="Your Name *"
                        value={commentForm.name}
                        onChange={(e) => { setCommentForm((p) => ({ ...p, name: e.target.value })); setCommentErrors((p) => ({ ...p, name: undefined })); }}
                      />
                      {commentErrors.name && <div className="invalid-feedback" style={{ display: "block" }}>{commentErrors.name}</div>}
                    </div>
                    <div className="form-group col-md-6">
                      <input
                        type="email"
                        className={`form-control${commentErrors.email ? " is-invalid" : ""}`}
                        placeholder="Your Email *"
                        value={commentForm.email}
                        onChange={(e) => { setCommentForm((p) => ({ ...p, email: e.target.value })); setCommentErrors((p) => ({ ...p, email: undefined })); }}
                      />
                      {commentErrors.email && <div className="invalid-feedback" style={{ display: "block" }}>{commentErrors.email}</div>}
                    </div>
                    <div className="form-group col-12">
                      <textarea
                        className={`form-control${commentErrors.text ? " is-invalid" : ""}`}
                        rows={5}
                        placeholder="Write your comment... *"
                        value={commentForm.text}
                        onChange={(e) => { setCommentForm((p) => ({ ...p, text: e.target.value })); setCommentErrors((p) => ({ ...p, text: undefined })); }}
                      />
                      {commentErrors.text && <div className="invalid-feedback" style={{ display: "block" }}>{commentErrors.text}</div>}
                    </div>
                    <div className="col-12">
                      <button type="submit" className="th-btn btn-mask">POST COMMENT</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="col-lg-4">
              <div className="sidebar">
                {/* Search */}
                <div className="widget widget_search mb-40">
                  <form onSubmit={handleSearch}>
                    <div className="search-form" style={{ position: "relative" }}>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); if (!e.target.value) setSearchResults(null); }}
                        style={{ paddingRight: 48 }}
                      />
                      <button type="submit" style={{ position: "absolute", right: 0, top: 0, bottom: 0, background: "#214137", border: "none", padding: "0 16px", borderRadius: "0 6px 6px 0", color: "#ead369", cursor: "pointer" }}>
                        <i className="fal fa-search" />
                      </button>
                    </div>
                  </form>
                  {searchResults !== null && (
                    <div style={{ marginTop: 12 }}>
                      {searchResults.length === 0 ? (
                        <p style={{ fontSize: ".82rem", color: "#888", padding: "8px 0" }}>No results found for "{searchQuery}"</p>
                      ) : (
                        <div>
                          <p style={{ fontSize: ".72rem", fontWeight: 700, color: "#9c704e", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 }}>
                            {searchResults.length} result{searchResults.length > 1 ? "s" : ""} found
                          </p>
                          {searchResults.map((p: any, i: number) => {
                            const idx = posts.findIndex((x: any) => x.title === p.title);
                            return (
                              <NavLink key={i} href={`/${locale}/blog/${idx}`} style={{ display: "block", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,.06)", textDecoration: "none" }}>
                                <span style={{ fontSize: ".82rem", fontWeight: 600, color: "#1a1a1a" }}>{p.title}</span>
                                <span style={{ display: "block", fontSize: ".72rem", color: "#888", marginTop: 2 }}>{p.date}</span>
                              </NavLink>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Recent posts */}
                <div className="widget mb-40">
                  <h3 className="widget_title">Recent Posts</h3>
                  {posts.slice(0, 4).map((p: any, i: number) => (
                    <div key={i} className="d-flex gap-3 mb-3" style={{ alignItems: "center" }}>
                      <img
                        src={`/assets/img/blog/blog_1_${(i % 3) + 1}.jpg`}
                        alt={p.title}
                        style={{ width: 65, height: 55, objectFit: "cover", borderRadius: 6, flexShrink: 0 }}
                        onError={(e) => { (e.target as HTMLImageElement).src = "/assets/img/blog/blog_1_1.jpg"; }}
                      />
                      <div>
                        <NavLink href={`/${locale}/blog/${i}`} className="box-title d-block"
                          style={{ fontSize: ".8rem", lineHeight: 1.3, fontWeight: 600, color: "#1a1a1a", textDecoration: "none" }}>
                          {p.title.length > 55 ? p.title.substring(0, 55) + "..." : p.title}
                        </NavLink>
                        <small style={{ color: "#888", fontSize: ".72rem" }}>{p.date}</small>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Categories */}
                <div className="widget mb-40">
                  <h3 className="widget_title">Categories</h3>
                  <ul className="menu" style={{ listStyle: "none", padding: 0 }}>
                    {[
                      { label: "Education", count: 2 },
                      { label: "Heritage", count: 1 },
                      { label: "Gifting", count: 1 },
                      { label: "Health", count: 1 },
                      { label: "Behind the Scenes", count: 1 },
                    ].map((c, i) => (
                      <li key={i} style={{ borderBottom: "1px solid rgba(0,0,0,.06)", padding: "8px 0", display: "flex", justifyContent: "space-between" }}>
                        <NavLink href={l("blog")} style={{ fontSize: ".85rem", color: "#444", textDecoration: "none" }}>{c.label}</NavLink>
                        <span style={{ fontSize: ".75rem", color: "#9c704e", fontWeight: 700 }}>({c.count})</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags widget */}
                <div className="widget">
                  <h3 className="widget_title mb-20">Popular Tags</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["Ajwa", "Medjool", "Dates", "Health", "Premium", "Gifting", "Ramadan", "Eid"].map((tag) => (
                      <NavLink key={tag} href={l("blog")}
                        style={{ display: "inline-block", padding: "5px 12px", background: "#f0ebe3", borderRadius: 4, fontSize: ".75rem", fontWeight: 600, color: "#1a1a1a", textDecoration: "none" }}>
                        {tag}
                      </NavLink>
                    ))}
                  </div>
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
