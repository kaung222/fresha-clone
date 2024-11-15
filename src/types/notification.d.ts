export interface Notification {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    title: string;
    userId: number;
    thumbnail: string;
    body: string;
    link: string;
    isRead: boolean;
}
