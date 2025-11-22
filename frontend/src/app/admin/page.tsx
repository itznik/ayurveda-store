import { redirect } from "next/navigation";

export default function AdminRoot() {
  // When someone visits /admin, send them to /admin/dashboard
  redirect("/admin/dashboard");
}
