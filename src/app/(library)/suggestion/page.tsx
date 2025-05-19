import { BookPanel } from "@/components/book-panel/BookPanel";
import { TopMenu } from "@/components/top-menu/TopMenu";

export default function Suggestion() {
  return (
    <div className="min-h-screen bg-pink-50">
      <TopMenu />
      <main className="max-w-5xl mx-auto p-6">
        <BookPanel />
      </main>
    </div>
  );
}
