export interface PollOption {
  text: string;
  votes: number;
}

export interface Poll {
  _id: string;
  question: string;
  options: PollOption[];
  type: "multiple-choice" | "single-choice";
  hideResultsUntilEnd: boolean;
  expiresAt: string;
  reactions: {
    fire: number;
    like: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePollRequest {
  question: string;
  options: { text: string }[];
  type: "multiple-choice" | "single-choice";
  hideResultsUntilEnd: boolean;
  duration: number; // in hours
}

export interface CreatePollResponse {
  success: boolean;
  pollId: string;
}

export interface VoteRequest {
  pollId: string;
  optionIndex: number;
}

export interface ReactionRequest {
  pollId: string;
  reactionType: "fire" | "like";
}

export interface ApiResponse {
  success: boolean;
  message: string;
}
