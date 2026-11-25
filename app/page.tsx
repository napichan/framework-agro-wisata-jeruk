import { redirect } from "next/navigation";

export default function Home() {
  // Landing page promosi ada di /landing; root langsung ke login admin.
  redirect("/admin/login");
}
