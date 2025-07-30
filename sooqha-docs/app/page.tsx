import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to a default editor page or a new document
  redirect("/editor/new");
}
