// src/components/VoteOptions.tsx
import React, { useState } from "react";
import { castVote } from "@/lib/api";
import { Poll } from "@/types";
import Button from "./ui/Button";

interface VoteOptionsProps {
  poll: Poll;
  onVote: () => void;
}

export default function VoteOptions({ poll, onVote }: VoteOptionsProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState("");

  const isExpired = new Date(poll.expiresAt) < new Date();
  const totalVotes = poll.options.reduce(
    (sum, option) => sum + option.votes,
    0
  );

  const handleVote = async () => {
    if (selectedOption === null) return;

    setIsVoting(true);
    setError("");

    try {
      await castVote({
        pollId: poll._id,
        optionIndex: selectedOption,
      });

      onVote();
    } catch (err) {
      setError("Failed to cast vote. Please try again.");
      console.error(err);
    } finally {
      setIsVoting(false);
    }
  };

  const renderResults = () => {
    return poll.options.map((option, index) => {
      const percentage =
        totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;

      return (
        <div key={index} className="mb-3">
          <div className="flex justify-between mb-1">
            <span>{option.text}</span>
            <span className="font-medium">{percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-500 mt-1">{option.votes} votes</div>
        </div>
      );
    });
  };

  const renderVotingOptions = () => {
    return (
      <>
        {poll.options.map((option, index) => (
          <div key={index} className="mb-2">
            <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type={poll.type === "multiple-choice" ? "checkbox" : "radio"}
                name="poll-option"
                checked={selectedOption === index}
                onChange={() => setSelectedOption(index)}
                className="mr-3"
              />
              <span>{option.text}</span>
            </label>
          </div>
        ))}

        <Button
          onClick={handleVote}
          disabled={isVoting || selectedOption === null}
          className="mt-4"
        >
          {isVoting ? "Submitting..." : "Submit Vote"}
        </Button>

        {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}
      </>
    );
  };

  // Determine what to show
  const showResults = isExpired || !poll.hideResultsUntilEnd;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">
        {showResults ? "Results" : "Cast Your Vote"}
      </h3>

      {showResults ? renderResults() : renderVotingOptions()}

      {showResults && (
        <div className="mt-4 text-sm text-gray-500">
          Total votes: {totalVotes}
        </div>
      )}
    </div>
  );
}
