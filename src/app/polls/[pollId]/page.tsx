"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import VoteOptions from "@/components/VoteOptions";
import ReactionButtons from "@/components/ReactionButtons";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import ShareButton from "@/components/ShareButton";
import PollTimer from "@/components/PollTimer";
import usePollData from "@/hooks/usePollData";

export default function PollDetailPage() {
  const params = useParams();
  const pollId = params.pollId as string;

  const { poll, loading, error, refetchPoll } = usePollData(pollId);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <LoadingSpinner message="Loading poll data..." />
      </div>
    );
  }

  if (error || !poll) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card>
          <ErrorMessage message={error || "Failed to load poll data"} />
          <div className="flex justify-center mt-4">
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const isExpired = new Date(poll.expiresAt) < new Date();

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <div className="flex justify-between items-center mb-4">
          <PollTimer expiresAt={poll.expiresAt} />
          <ShareButton pollId={poll._id} />
        </div>

        <h1 className="text-2xl font-bold mb-6">{poll.question}</h1>

        <VoteOptions poll={poll} onVote={refetchPoll} />

        <ReactionButtons poll={poll} onReaction={refetchPoll} />

        <div className="mt-8 pt-4 border-t text-sm text-gray-500">
          <div className="flex justify-between flex-wrap gap-4">
            <span>
              Poll Type:{" "}
              {poll.type === "multiple-choice"
                ? "Multiple Choice"
                : "Single Choice"}
            </span>
            <span>
              {poll.hideResultsUntilEnd && !isExpired
                ? "Results will be visible when poll ends"
                : "Results are visible to everyone"}
            </span>
          </div>
        </div>
      </Card>

      <div className="mt-6 text-center">
        <Link href="/create">
          <Button variant="outline">Create Your Own Poll</Button>
        </Link>
      </div>
    </div>
  );
}
