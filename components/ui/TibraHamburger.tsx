"use client";

/**
 * TibraHamburger
 * Creative animated hamburger → X toggle.
 * Triggers the existing Barab .th-menu-wrapper mobile menu.
 */
import { useState, useCallback } from "react";

export default function TibraHamburger() {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen((prev) => {
      const next = !prev;
      // Sync with the existing jQuery mobile-menu system
      if (typeof window !== "undefined") {
        const wrapper = document.querySelector(".th-menu-wrapper");
        if (wrapper) {
          wrapper.classList.toggle("th-body-visible", next);
        }
        document.body.classList.toggle("th-body-visible", next);
      }
      return next;
    });
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Menu"
      className="tibra-hamburger"
      data-open={open ? "true" : "false"}
    >
      <span className="tibra-ham-bar tibra-ham-bar--top" />
      <span className="tibra-ham-bar tibra-ham-bar--mid" />
      <span className="tibra-ham-bar tibra-ham-bar--bot" />
    </button>
  );
}
