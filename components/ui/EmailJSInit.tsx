"use client";

import { useEffect } from "react";

export default function EmailJSInit() {
  useEffect(() => {
    const init = () => {
      const emailjs = (window as any).emailjs;
      if (emailjs && process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
        emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
      }
    };

    // Try immediately
    if ((window as any).emailjs) {
      init();
    } else {
      // Wait for script to load
      const interval = setInterval(() => {
        if ((window as any).emailjs) {
          init();
          clearInterval(interval);
        }
      }, 300);
      setTimeout(() => clearInterval(interval), 10000);
    }
  }, []);

  return null;
}
