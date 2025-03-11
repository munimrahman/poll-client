"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createPoll } from "@/lib/api";
import Button from "./ui/Button";
import Card from "./ui/Card";

export default function PollForm() {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [pollType, setPollType] = useState<"single-choice" | "multiple-choice">(
    "single-choice"
  );
  const [hideResults, setHideResults] = useState(false);
  const [duration, setDuration] = useState(24);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    if (options.length <= 2) return;
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!question.trim()) {
      setError("Please enter a poll question");
      return;
    }

    if (options.some((opt) => !opt.trim())) {
      setError("All options must have text");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await createPoll({
        question,
        options: options.map((text) => ({ text })),
        type: pollType,
        hideResultsUntilEnd: hideResults,
        duration,
      });

      router.push(`/polls/${response.pollId}`);
    } catch (err) {
      setError("Failed to create poll. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create a New Poll</h2>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="question" className="block font-medium mb-1">
            Question
          </label>
          <input
            id="question"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="What do you want to ask?"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Options</label>
          {options.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-2"
                placeholder={`Option ${index + 1}`}
                required
              />
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="ml-2 text-red-500"
                  aria-label="Remove option"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addOption}
            className="text-blue-600 text-sm font-medium"
          >
            + Add Option
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-medium mb-1">Poll Type</label>
            <select
              value={pollType}
              onChange={(e) =>
                setPollType(
                  e.target.value as "single-choice" | "multiple-choice"
                )
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="single-choice">Single Choice</option>
              <option value="multiple-choice">Multiple Choice</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Duration (hours)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="1"
              max="168"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={hideResults}
              onChange={(e) => setHideResults(e.target.checked)}
              className="mr-2"
            />
            Hide results until poll ends
          </label>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Poll"}
        </Button>
      </form>
    </Card>
  );
}
