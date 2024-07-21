import Welcome from "./_components/Welcome";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome Echo!",
};

export default async function App() {
  return (
    <div className="min-h-screen bg-[#FAF8F1]">
      <Welcome />
    </div>
  );
}
