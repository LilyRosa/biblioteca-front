"use client";
import { BookPanel } from "@/components/book-panel-admin/BookPanel";
import { TopMenu } from "@/components/top-menu-admin/TopMenu";
export default function MainFrame() {
  return (
    <div className="min-h-screen bg-pink-50">
      <TopMenu />
      <main className="max-w-5xl mx-auto p-6">
        <BookPanel />
      </main>
    </div>
  );
}
