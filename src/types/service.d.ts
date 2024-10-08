export type Service = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  price: number;
  thumbnailUrl: string;
  duration: number; //in minutes
  isPublished: boolean;
};
