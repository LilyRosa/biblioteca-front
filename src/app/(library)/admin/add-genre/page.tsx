"use client";
import { GenrePanel } from "@/components/genre-panel-admin/GenrePanel";
import { TopMenu } from "@/components/top-menu-admin/TopMenu";
export default function AddGenre() {
  return (
    <div className="min-h-screen bg-pink-50">
      <TopMenu />
      <main className="max-w-5xl mx-auto p-6">
        <GenrePanel />
      </main>
    </div>
  );
}
