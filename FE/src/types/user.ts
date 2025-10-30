export interface Watched {
  movie_id: string;
  episode?: number;
  watched_at?: Date;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  avatarId?: string;
  bookmarked_movies?: string[];
  watched_history?: Watched[];
  role: "user" | "admin";
  createdAt?: string;
  updatedAt?: string;
}
