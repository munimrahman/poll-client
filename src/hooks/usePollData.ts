// src/hooks/usePollData.ts
import { useState, useEffect, useCallback } from "react";
import { getPoll } from "@/lib/api";
import { Poll } from "@/types";

/**
 * Custom hook to fetch and manage poll data with auto-refresh
 */
export default function usePollData(pollId: string) {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPoll = useCallback(async () => {
    try {
      const data = await getPoll(pollId);
      setPoll(data);
      setError("");
    } catch (err) {
      setError("Failed to load poll data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [pollId]);

  useEffect(() => {
    fetchPoll();

    // Set up polling for real-time updates
    const isExpired = poll && new Date(poll.expiresAt) < new Date();
    // If poll is expired, no need for frequent updates
    const interval = setInterval(fetchPoll, isExpired ? 60000 : 5000);

    return () => clearInterval(interval);
  }, [fetchPoll, poll]);

  return { poll, loading, error, refetchPoll: fetchPoll };
}
