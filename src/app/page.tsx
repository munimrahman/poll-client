// src/app/page.tsx
import React from "react";
import Link from "next/link";
import Button from "../components/ui/Button";

export default function HomePage() {
  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">
          Create and Share Polls Instantly
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          VanishVote makes it easy to gather opinions and make decisions
          together.
        </p>

        <Link href="/create">
          <Button size="lg" className="font-semibold">
            Create Your First Poll
          </Button>
        </Link>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-lg font-semibold mb-2">Fast and Simple</h3>
            <p className="text-gray-600">
              Create polls in seconds with our intuitive interface.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold mb-2">Privacy Focused</h3>
            <p className="text-gray-600">
              Hide results until the end to prevent bias.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-lg font-semibold mb-2">Real-time Results</h3>
            <p className="text-gray-600">
              Watch votes and reactions come in as they happen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
