"use client";

import { useEffect } from "react";

export default function RouteAnimationReinit() {
  useEffect(() => {
    // Dismiss preloader on every mount (catches HMR remounts)
    const dismiss = (delay: number) =>
      setTimeout(() => {
        const el = document.getElementById("tibra-preloader");
        if (!el) return;
        el.style.transition = "opacity 0.3s ease";
        el.style.opacity = "0";
        el.style.pointerEvents = "none";
        setTimeout(() => { el.style.display = "none"; }, 320);
      }, delay);

    dismiss(50);
    dismiss(400);
    dismiss(1500);

    // Mobile animation fix — reduce WOW offset on small screens
    const fixMobileAnimations = () => {
      if (typeof window === "undefined") return;
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        // Make WOW elements visible immediately on mobile if JS animations are slow
        const wowEls = document.querySelectorAll<HTMLElement>(".wow");
        wowEls.forEach((el) => {
          if (!el.classList.contains("animated")) {
            el.style.visibility = "visible";
            el.style.opacity = "1";
          }
        });

        // Fix gsap elements that may be stuck invisible
        const gsapEls = document.querySelectorAll<HTMLElement>(
          ".gsap-fade-left, .gsap-fade-right, .gsap-scale-up-fade, .gsap-scale-down-fade"
        );
        gsapEls.forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      }
    };

    // Run after scripts have had time to load
    const t1 = setTimeout(fixMobileAnimations, 800);
    const t2 = setTimeout(fixMobileAnimations, 2000);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return null;
}
