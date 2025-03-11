// src/components/ReactionButtons.tsx
import React, { useState } from "react";
import { addReaction } from "@/lib/api";
import { Poll } from "@/types";

interface ReactionButtonsProps {
  poll: Poll;
  onReaction: () => void;
}

export default function ReactionButtons({
  poll,
  onReaction,
}: ReactionButtonsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReaction = async (type: "fire" | "like") => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await addReaction({
        pollId: poll._id,
        reactionType: type,
      });

      onReaction();
    } catch (err) {
      console.error("Failed to add reaction:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex space-x-2 mt-6">
      <button
        onClick={() => handleReaction("fire")}
        disabled={isSubmitting}
        className="flex items-center px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <span role="img" aria-label="Fire" className="mr-2">
          🔥
        </span>
        <span>{poll.reactions.fire}</span>
      </button>

      <button
        onClick={() => handleReaction("like")}
        disabled={isSubmitting}
        className="flex items-center px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <span role="img" aria-label="Like" className="mr-2">
          👍
        </span>
        <span>{poll.reactions.like}</span>
      </button>
    </div>
  );
}
