"use client";

/**
 * NavLink — Tibra
 * ───────────────
 * Uses window.location.href instead of Next.js <Link> to force a
 * full page reload on every navigation.
 *
 * WHY: The Barab template's main.js permanently removes data-top,
 * data-bg-src, data-mask-src, etc. after first use. On Next.js
 * client-side navigation these attributes are gone, breaking layout
 * and animations. A full reload guarantees main.js re-runs fresh.
 */

import { useCallback } from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  target?: string;
}

export default function NavLink({
  href,
  children,
  className,
  style,
  title,
  target,
}: NavLinkProps) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Allow default browser behaviour for external links, anchors,
      // new-tab clicks, and modifier keys
      if (
        target === "_blank" ||
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey
      ) {
        return; // let browser handle it
      }

      e.preventDefault();

      // Show preloader before navigating
      const pre = document.getElementById("tibra-preloader");
      if (pre) {
        pre.style.display = "";
        pre.style.opacity = "1";
        pre.style.pointerEvents = "";
        pre.style.transition = "";
      }

      // Small delay so preloader is visible, then hard navigate
      setTimeout(() => {
        window.location.href = href;
      }, 50);
    },
    [href, target]
  );

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      style={style}
      title={title}
      target={target}
    >
      {children}
    </a>
  );
}
