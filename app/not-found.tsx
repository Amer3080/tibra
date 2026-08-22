import { redirect } from "next/navigation";

// Global not-found: redirect to /en error page
export default function NotFound() {
  redirect("/en/error");
}
