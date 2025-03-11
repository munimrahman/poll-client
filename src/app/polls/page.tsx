"use client";

import React, { useState, useEffect } from "react";
import { getRecentPolls, searchPolls } from "@/lib/api";
import { Poll } from "@/types";
import Card from "@/components/ui/Card";
import PollCard from "@/components/PollCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function RecentPollsPage() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const data = await getRecentPolls();
        setPolls(data);
        setError("");
      } catch (err) {
        setError("Failed to load recent polls");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);

    try {
      const results = await searchPolls(searchQuery);
      setPolls(results);
      setError("");
    } catch (err) {
      setError("Search failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Recent Polls</h1>

      <Card className="mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search polls..."
            className="flex-1 px-4 py-2 border rounded-md"
          />
          <Button type="submit">Search</Button>
        </form>
      </Card>

      <ErrorMessage message={error} />

      {loading ? (
        <LoadingSpinner message="Loading polls..." />
      ) : polls.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 mb-4">No polls found</p>
          <Link href="/create">
            <Button className="font-semibold">Create a Poll</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {polls.polls.map((poll) => (
            <PollCard key={poll._id} poll={poll} />
          ))}
        </div>
      )}
    </div>
  );
}
