export interface Stream {
  id: string;
  url: string;
  title: string;
  thumbnail: string;
  duration: string;
  type: "Youtube" | "Spotify";
  addedBy: string;
  votes: number;
  userVote: "up" | "down" | null;
  addedAt: Date;
  haveUpvoted: boolean;
  extractedId: string;
}
