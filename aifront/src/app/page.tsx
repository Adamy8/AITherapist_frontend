import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function Home() {
  return (
    <div>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h1 className="text-5xl font-bold mb-8">Welcome to The Notebook</h1>
        <p className="text-xl mb-8">Your personal AI self-reflection journal analyst!</p>
        <Link href="/login">
        <Button className="bg-white text-blue-500 hover:bg-gray-200">
          Start Journaling!
        </Button>
        </Link>
      </div>

    </div>
  );
}
