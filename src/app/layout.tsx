import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "VanishVote",
  description: "Create and share polls instantly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <header className="bg-white shadow sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Link href="/" className="font-bold text-xl text-blue-600">
                  VanishVote
                </Link>
                <nav className="hidden md:flex ml-8 space-x-4">
                  <Link
                    href="/polls"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                  >
                    Browse Polls
                  </Link>
                </nav>
              </div>
              <div className="flex items-center">
                <Link
                  href="/create"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Create Poll
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {children}
        </main>

        <footer className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} VanishVote. All rights reserved.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Link
                  href="/create"
                  className="text-gray-500 hover:text-gray-700"
                >
                  Create Poll
                </Link>
                <Link
                  href="/polls"
                  className="text-gray-500 hover:text-gray-700"
                >
                  Browse Polls
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
