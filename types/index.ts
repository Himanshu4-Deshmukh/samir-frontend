export interface User {
  _id: string;
  username: string;
  email: string;
  count: number;
  points: number;
  isAdmin: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  imageUrl: string;
  content: string;
}