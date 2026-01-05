export interface Stream {
  id: string;
  url: string;
  title: string;
  thumbnail: string;
  duration: string;
  platform: "youtube" | "spotify";
  addedBy: string;
  votes: number;
  userVote: "up" | "down" | null;
  addedAt: Date;
}
