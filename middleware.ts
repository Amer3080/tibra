import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./lib/i18n";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export const config = {
  /*
   * Match all request paths EXCEPT:
   * - api routes
   * - _next/static (static files)
   * - _next/image (image optimisation)
   * - favicon.ico
   * - public/assets folder
   * - files with extensions (images, fonts, etc.)
   */
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|assets|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)).*)",
  ],
};
