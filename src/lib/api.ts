import axios from "axios";
import {
  Poll,
  CreatePollRequest,
  CreatePollResponse,
  VoteRequest,
  ReactionRequest,
  ApiResponse,
} from "@/types";

// Create axios instance with base URL from environment variable
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Polls API
export const createPoll = async (
  pollData: CreatePollRequest
): Promise<CreatePollResponse> => {
  const response = await api.post<CreatePollResponse>(
    "/polls/create",
    pollData
  );
  return response.data;
};

export const getPoll = async (pollId: string): Promise<Poll> => {
  const response = await api.get<Poll>(`/polls/${pollId}`);
  return response.data;
};

// Votes API
export const castVote = async (voteData: VoteRequest): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>("/votes/vote", voteData);
  return response.data;
};

export const addReaction = async (
  reactionData: ReactionRequest
): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>("/votes/reaction", reactionData);
  return response.data;
};

export const getRecentPolls = async (): Promise<Poll[]> => {
  // This endpoint would need to be added to your backend
  const response = await api.get<Poll[]>("/polls/recent");
  return response.data;
};

export const searchPolls = async (query: string): Promise<Poll[]> => {
  // This endpoint would need to be added to your backend
  const response = await api.get<Poll[]>(
    `/polls/search?q=${encodeURIComponent(query)}`
  );
  return response.data;
};

// Error handling middleware
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";
    console.error("API Error:", message);
    return Promise.reject(error);
  }
);

export default api;
