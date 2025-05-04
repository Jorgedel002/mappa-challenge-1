export interface PollOption {
  id: string;
  text: string;
  count: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  createdAt: Date;
}

export interface PollResponse {
  pollId: string;
  selectedOptionId: string;
}
