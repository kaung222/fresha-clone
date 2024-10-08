import { Author } from "./author";
import { Clinic } from "./clinic";

export type Post = {
  clinic: Clinic
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  title: string;
  content: string;
  images?: string[];
  tags?: string[];
  views: number;
  timeToRead?: number;
  isPublished: boolean;
  publishedAt?: string;
  tags: string[];
  commentCount: number;
  likeCount: number;
  userId: string;
  isLiked?: boolean;
  isSaved: boolean;
};
