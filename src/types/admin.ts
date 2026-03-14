export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  createdAt: number;
}

export interface AdminStats {
  activeUsers: number;
  monthlyTraffic: number;
  totalPosts: number;
}

export interface FormState {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  isSuccess: boolean;
}
