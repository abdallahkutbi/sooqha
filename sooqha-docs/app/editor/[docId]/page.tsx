"use client";

import dynamic from "next/dynamic";
const SimpleEditor = dynamic(
  () => import("@/components/tiptap-templates/simple/simple-editor").then(mod => mod.SimpleEditor),
  { ssr: false }
);

export default function EditorPage() {
  return (
    <div className="h-screen">
      <SimpleEditor />
    </div>
  );
}