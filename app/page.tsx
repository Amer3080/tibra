// Root page — middleware handles the locale redirect
// This is a fallback in case middleware doesn't fire
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/en");
}
