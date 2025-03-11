// src/components/PollCard.tsx
import React from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Poll } from "@/types";
import Card from "./ui/Card";

interface PollCardProps {
  poll: Poll;
}

export default function PollCard({ poll }: PollCardProps) {
  const isExpired = new Date(poll.expiresAt) < new Date();
  const timeLeft = !isExpired
    ? formatDistanceToNow(new Date(poll.expiresAt), { addSuffix: true })
    : "Expired";

  return (
    <Link href={`/polls/${poll._id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <h3 className="text-xl font-semibold mb-2">{poll.question}</h3>
        <div className="text-sm text-gray-500 mb-4">
          {poll.options.length} options • Ends {timeLeft}
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <span role="img" aria-label="Fire" className="mr-1">
                🔥
              </span>
              {poll.reactions.fire}
            </span>
            <span className="flex items-center">
              <span role="img" aria-label="Like" className="mr-1">
                👍
              </span>
              {poll.reactions.like}
            </span>
          </div>
          <div className="text-blue-600 font-medium">Vote now</div>
        </div>
      </Card>
    </Link>
  );
}
